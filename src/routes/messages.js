import express from "express";
import { readJson, writeJson } from "../services/jsonStore.js";

const router = express.Router();
const FILE = "messages.json";

// GET /api/messages - lista todas as mensagens
router.get("/", async (_req, res) => {
  try {
    const messages = await readJson(FILE, []);
    res.json(messages);
  } catch (err) {
    console.error("Erro ao listar mensagens", err);
    res.status(500).json({ error: "Erro ao listar mensagens" });
  }
});

// POST /api/messages - adiciona uma nova mensagem fake
router.post("/", async (req, res) => {
  const { from, text } = req.body || {};

  if (!from || !text) {
    return res.status(400).json({ error: "Campos 'from' e 'text' são obrigatórios." });
  }

  try {
    const messages = await readJson(FILE, []);
    const message = {
      id: Date.now(),
      from,
      text,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    await writeJson(FILE, messages);
    res.status(201).json(message);
  } catch (err) {
    console.error("Erro ao salvar mensagem", err);
    res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
});

export default router;
