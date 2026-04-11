export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
  };

  const { action, referrerEmail, newUserEmail, newUserName, refCode, userEmail } = req.body;

  // ── SAVE USER REF CODE (called on every login/signup) ────────────────────
  if (action === "save_ref_code") {
    if (!userEmail || !refCode) return res.status(400).json({ error: "Missing fields" });
    try {
      // Check if already exists
      const chk = await fetch(`${SUPABASE_URL}/rest/v1/ref_codes?user_email=eq.${encodeURIComponent(userEmail)}&select=id`, { headers });
      const existing = await chk.json();
      if (!existing?.length) {
        await fetch(`${SUPABASE_URL}/rest/v1/ref_codes`, {
          method: "POST", headers,
          body: JSON.stringify({ user_email: userEmail, ref_code: refCode })
        });
      }
      return res.status(200).json({ success: true });
    } catch (e) { return res.status(500).json({ error: "DB error" }); }
  }

  // ── FIND REFERRER BY CODE ─────────────────────────────────────────────────
  if (action === "find_referrer") {
    if (!refCode) return res.status(400).json({ error: "Missing refCode" });
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/ref_codes?ref_code=eq.${encodeURIComponent(refCode)}&select=user_email`, { headers });
      const data = await r.json();
      const referrerEmail = data?.[0]?.user_email || null;
      return res.status(200).json({ referrerEmail });
    } catch (e) { return res.status(500).json({ referrerEmail: null }); }
  }

  // ── REGISTER REFERRAL ─────────────────────────────────────────────────────
  if (action === "register") {
    if (!referrerEmail || !newUserEmail) return res.status(400).json({ error: "Missing fields" });
    if (referrerEmail === newUserEmail) return res.status(400).json({ error: "self_referral" });

    try {
      // Anti-fraud: check duplicate
      const chk = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&new_user_email=eq.${encodeURIComponent(newUserEmail)}&select=id`, { headers });
      const existing = await chk.json();
      if (existing?.length > 0) return res.status(200).json({ success: true, message: "Already counted" });

      // Insert
      await fetch(`${SUPABASE_URL}/rest/v1/referrals`, {
        method: "POST", headers,
        body: JSON.stringify({ referrer_email: referrerEmail, new_user_email: newUserEmail, new_user_name: newUserName, ref_code: refCode })
      });

      // Get total count
      const cntRes = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&select=id`, { headers });
      const allRefs = await cntRes.json();
      const count = allRefs?.length || 0;

      console.log(`Referral: ${referrerEmail} → ${count} total`);
      return res.status(200).json({ success: true, count });
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).json({ error: "DB error" });
    }
  }

  // ── GET COUNT ─────────────────────────────────────────────────────────────
  if (action === "get_count") {
    if (!referrerEmail) return res.status(400).json({ error: "Missing email" });
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&select=new_user_email,new_user_name,created_at&order=created_at.desc`, { headers });
      const data = await r.json();
      return res.status(200).json({ success: true, count: data?.length || 0, referrals: data || [] });
    } catch (e) { return res.status(500).json({ error: "DB error" }); }
  }

  return res.status(400).json({ error: "Unknown action" });
}
