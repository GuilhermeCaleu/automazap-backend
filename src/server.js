import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import webhookRoutes from "./routes/webhook.js";
import rulesRoutes from "./routes/rules.js";
import contactsRoutes from "./routes/contacts.js";
import messagesRoutes from "./routes/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "automazap-backend-pro-demo" });
});

app.use("/webhook", webhookRoutes);
app.use("/api/rules", rulesRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(PORT, () => {
  console.log("AutomaZap backend rodando na porta", PORT);
});
