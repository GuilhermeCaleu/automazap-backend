import express from "express";
import { readJson, writeJson } from "../services/jsonStore.js";

const router = express.Router();
const FILE = "contacts.json";

// GET /api/contacts
router.get("/", async (_req, res) => {
  try {
    const contacts = await readJson(FILE, []);
    res.json(contacts);
  } catch (err) {
    console.error("Erro ao listar contatos", err);
    res.status(500).json({ error: "Erro ao listar contatos" });
  }
});

// POST /api/contacts
router.post("/", async (req, res) => {
  const { name, phone, tags = [] } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: "name e phone são obrigatórios" });
  }

  try {
    const contacts = await readJson(FILE, []);
    const contact = {
      id: Date.now(),
      name,
      phone,
      tags,
      createdAt: new Date().toISOString(),
    };
    contacts.push(contact);
    await writeJson(FILE, contacts);
    res.status(201).json(contact);
  } catch (err) {
    console.error("Erro ao salvar contato", err);
    res.status(500).json({ error: "Erro ao salvar contato" });
  }
});

export default router;
