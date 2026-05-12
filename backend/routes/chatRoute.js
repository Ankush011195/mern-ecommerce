import express from "express";
import Groq from "groq-sdk";

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are GadgetBot, a helpful AI assistant 
for GadgetStore — an Indian e-commerce store selling laptops, 
mobiles, gaming accessories, and wearables.
You help with product recommendations, return policy (7 days), 
shipping info (free above ₹999), and payment issues.
Be friendly and keep answers short and to the point.`;

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message" });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free & fast
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
    });
    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;