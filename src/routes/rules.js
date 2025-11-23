const express = require("express");
const { getRules, saveRules } = require("../dataStore");

const router = express.Router();

router.get("/", (_req, res) => {
  const rules = getRules();
  res.json(rules);
});

router.post("/", (req, res) => {
  const rules = getRules();
  const body = req.body || {};
  const newRule = {
    id: Date.now(),
    nome: body.nome || "Regra sem nome",
    gatilhos: body.gatilhos || [],
    resposta_texto: body.resposta_texto || "",
    link_checkout: body.link_checkout || "",
    perguntar_nome: !!body.perguntar_nome,
    perguntar_telefone: !!body.perguntar_telefone,
    ativa: body.ativa !== false,
  };
  rules.push(newRule);
  saveRules(rules);
  res.status(201).json(newRule);
});

router.put("/:id", (req, res) => {
  const rules = getRules();
  const id = parseInt(req.params.id, 10);
  const idx = rules.findIndex(r => r.id === id);
  if (idx === -1) return res.sendStatus(404);
  const body = req.body || {};
  rules[idx] = { ...rules[idx], ...body, id };
  saveRules(rules);
  res.json(rules[idx]);
});

router.delete("/:id", (req, res) => {
  const rules = getRules();
  const id = parseInt(req.params.id, 10);
  const filtered = rules.filter(r => r.id !== id);
  saveRules(filtered);
  res.sendStatus(204);
});

module.exports = router;
