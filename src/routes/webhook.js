const express = require("express");
const { sendWhatsAppText } = require("../whatsapp");
const { getRules, saveContacts, getContacts } = require("../dataStore");

const router = express.Router();

// Verificação do webhook (GET)
router.get("/", (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN_WEBHOOK || "automazap";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === verifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Recebe mensagens do WhatsApp (POST)
router.post("/", async (req, res) => {
  const body = req.body;

  if (body.object) {
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (messages && messages.length > 0) {
      const msg = messages[0];
      const from = msg.from;
      const text = (msg.text?.body || "").trim();

      // Carrega contatos
      const contacts = getContacts();
      let contato = contacts.find(c => c.numero === from);
      if (!contato) {
        contato = {
          id: Date.now(),
          numero: from,
          nome: null,
          telefone: from,
          estado: "normal",
          criadoEm: new Date().toISOString(),
        };
        contacts.push(contato);
      }

      // Se está aguardando nome
      if (contato.estado === "aguardando_nome") {
        contato.nome = text;
        contato.estado = "aguardando_telefone";
        saveContacts(contacts);
        await sendWhatsAppText(from, "Perfeito! Agora me envie seu telefone com DDD 📱");
        return res.sendStatus(200);
      }

      // Se está aguardando telefone
      if (contato.estado === "aguardando_telefone") {
        contato.telefone = text;
        contato.estado = "normal";
        saveContacts(contacts);
        await sendWhatsAppText(from, "Obrigado! Seus dados foram salvos ✅");
        await sendWhatsAppText(from, "Posso te ajudar com mais alguma coisa?");
        return res.sendStatus(200);
      }

      // Processa regras
      const rules = getRules().filter(r => r.ativa !== false);

      const textLower = text.toLowerCase();
      let matchedRule = null;
      for (const rule of rules) {
        const triggers = rule.gatilhos || [];
        if (triggers.some(t => textLower.includes(t.toLowerCase()))) {
          matchedRule = rule;
          break;
        }
      }

      if (matchedRule) {
        if (matchedRule.resposta_texto) {
          await sendWhatsAppText(from, matchedRule.resposta_texto);
        }
        if (matchedRule.link_checkout) {
          await sendWhatsAppText(from, matchedRule.link_checkout);
        }
        if (matchedRule.perguntar_nome) {
          contato.estado = "aguardando_nome";
          saveContacts(contacts);
          await sendWhatsAppText(from, "Pra continuar, me diz seu nome 👇");
          return res.sendStatus(200);
        }
        if (matchedRule.perguntar_telefone && !matchedRule.perguntar_nome) {
          contato.estado = "aguardando_telefone";
          saveContacts(contacts);
          await sendWhatsAppText(from, "Me envia seu telefone com DDD 👇");
          return res.sendStatus(200);
        }
      } else {
        await sendWhatsAppText(from, "Não entendi 😅 Digite *menu* ou *ebook* para ver opções.");
      }

      saveContacts(contacts);
    }

    return res.sendStatus(200);
  }

  return res.sendStatus(404);
});

module.exports = router;
