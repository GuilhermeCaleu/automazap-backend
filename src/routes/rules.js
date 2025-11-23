const express = require("express");
const router = express.Router();

// regras de teste
const regrasFake = [
  { id: 1, regra: "Responder automaticamente 'Oi' quando alguém mandar 'Olá'" }
];

router.get("/", (req, res) => {
  res.json(regrasFake);
});

module.exports = router;
