
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions:
        "Namamu Gojo Satoru AI. Kamu asisten yang ramah, santai, cerdas, dan menjawab dalam bahasa pengguna.",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({
      error: "AI belum bisa menjawab. Periksa konfigurasi API di Render."
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Gojo Satoru AI berjalan di port " + port);
});
