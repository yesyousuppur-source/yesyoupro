export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, name, message, plan } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  // EmailJS se email bhejta hai yesyousuppur@gmail.com pe
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: "yesyousuppur@gmail.com",
            from_name: name || "YesYouPro User",
            from_email: email || "unknown",
            message: message,
            plan: plan || "free",
            subject: "YesYouPro Query from " + (email || "User"),
          },
        }),
      });
      if (response.ok) return res.status(200).json({ success: true });
    } catch (err) {
      console.error("EmailJS error:", err);
    }
  }

  // Fallback - log karo agar EmailJS setup nahi hai
  console.log("=== NEW QUESTION ===");
  console.log("To: yesyousuppur@gmail.com");
  console.log("From:", name, "(", email, ")");
  console.log("Plan:", plan);
  console.log("Message:", message);
  console.log("===================");

  return res.status(200).json({ success: true });
}
