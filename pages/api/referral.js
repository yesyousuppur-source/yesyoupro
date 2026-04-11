export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  const { action, referrerEmail, newUserEmail, newUserName, refCode } = req.body;

  // ── REGISTER REFERRAL ─────────────────────────────────────────────────────
  if (action === "register") {
    if (!referrerEmail || !newUserEmail) return res.status(400).json({ error: "Missing fields" });
    if (referrerEmail === newUserEmail) return res.status(400).json({ error: "self_referral" });

    try {
      // Check duplicate
      const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&new_user_email=eq.${encodeURIComponent(newUserEmail)}&select=id`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const existing = await checkRes.json();
      if (existing?.length > 0) return res.status(200).json({ success: true, message: "Already counted" });

      // Insert new referral
      await fetch(`${SUPABASE_URL}/rest/v1/referrals`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ referrer_email: referrerEmail, new_user_email: newUserEmail, new_user_name: newUserName, ref_code: refCode })
      });

      // Get total count for referrer
      const countRes = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&select=id`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const allRefs = await countRes.json();
      const count = allRefs?.length || 0;

      console.log(`Referral saved: ${referrerEmail} now has ${count} referrals`);
      return res.status(200).json({ success: true, count });
    } catch (e) {
      console.error("Supabase error:", e);
      return res.status(500).json({ error: "DB error" });
    }
  }

  // ── GET REFERRAL COUNT ────────────────────────────────────────────────────
  if (action === "get_count") {
    if (!referrerEmail) return res.status(400).json({ error: "Missing email" });
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/referrals?referrer_email=eq.${encodeURIComponent(referrerEmail)}&select=new_user_email,new_user_name,created_at`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await r.json();
      return res.status(200).json({ success: true, count: data?.length || 0, referrals: data || [] });
    } catch (e) {
      return res.status(500).json({ error: "DB error" });
    }
  }

  return res.status(400).json({ error: "Unknown action" });
}
