import express from "express";
const router = express.Router();

// mensagens fake apenas para teste
const mensagensFake = [
  { from: "Cliente 1", text: "Olá! Tudo certo aí?" },
  { from: "Cliente 2", text: "Mensagem automática de teste." }
];

// GET /api/messages
router.get("/", (req, res) => {
  res.json(mensagensFake);
});

export default router;
