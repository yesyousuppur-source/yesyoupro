export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { email, name, message, plan } = req.body;
  console.log("Question from:", email, "| Message:", message);
  return res.status(200).json({ success: true });
}
