import express from "express";
import { readJson, writeJson } from "../services/jsonStore.js";

const router = express.Router();
const FILE = "rules.json";

// GET /api/rules
router.get("/", async (_req, res) => {
  try {
    const rules = await readJson(FILE, []);
    res.json(rules);
  } catch (err) {
    console.error("Erro ao listar regras", err);
    res.status(500).json({ error: "Erro ao listar regras" });
  }
});

// POST /api/rules
router.post("/", async (req, res) => {
  const { name, match, reply } = req.body || {};

  if (!name || !match || !reply) {
    return res.status(400).json({ error: "name, match e reply são obrigatórios" });
  }

  try {
    const rules = await readJson(FILE, []);
    const rule = {
      id: Date.now(),
      name,
      match,
      reply,
      active: true,
      createdAt: new Date().toISOString(),
    };
    rules.push(rule);
    await writeJson(FILE, rules);
    res.status(201).json(rule);
  } catch (err) {
    console.error("Erro ao salvar regra", err);
    res.status(500).json({ error: "Erro ao salvar regra" });
  }
});

export default router;
