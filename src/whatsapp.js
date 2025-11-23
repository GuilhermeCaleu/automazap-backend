const axios = require("axios");

async function sendWhatsAppText(to, text) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.error("Token ou Phone ID do WhatsApp não configurados.");
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  try {
    const res = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Erro ao enviar mensagem para o WhatsApp:", err.response?.data || err.message);
  }
}

module.exports = { sendWhatsAppText };
