const express = require("express");
const router = express.Router();

// Webhook fake apenas para teste
router.post("/", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.json({ ok: true });
});

module.exports = router;
