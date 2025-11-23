import express from "express";

const router = express.Router();

// Apenas um webhook de teste para não quebrar nada no Render ainda.
// Depois você pode ligar isso com o WhatsApp real.
router.post("/", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.json({ ok: true });
});

export default router;
