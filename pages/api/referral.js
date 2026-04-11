// pages/api/referral.js
// Referral tracking API - anti-fraud system

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { action, referrerEmail, newUserEmail, newUserName, refCode } = req.body;

    // ── REGISTER REFERRAL ──────────────────────────────────────────────────
    // Called when someone signs up via referral link
    if (action === "register") {
      if (!referrerEmail || !newUserEmail || !refCode) {
        return res.status(400).json({ error: "Missing fields" });
      }

      // Anti-fraud: Cannot refer yourself
      if (referrerEmail === newUserEmail) {
        return res.status(400).json({ error: "self_referral", message: "Khud ko refer nahi kar sakte" });
      }

      // Anti-fraud: Email must be valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUserEmail)) {
        return res.status(400).json({ error: "invalid_email" });
      }

      // Log for tracking (in production use a database)
      console.log("=== REFERRAL REGISTERED ===");
      console.log("Referrer:", referrerEmail);
      console.log("New User:", newUserEmail, "(", newUserName, ")");
      console.log("Ref Code:", refCode);
      console.log("Time:", new Date().toISOString());
      console.log("IP:", req.headers["x-forwarded-for"] || req.socket.remoteAddress);
      console.log("===========================");

      return res.status(200).json({ success: true, message: "Referral registered" });
    }

    // ── CHECK REFERRAL COUNT ───────────────────────────────────────────────
    if (action === "check") {
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Unknown action" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
