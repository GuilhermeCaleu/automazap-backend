const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const webhookRoutes = require("./routes/webhook");
const rulesRoutes = require("./routes/rules");
const contactsRoutes = require("./routes/contacts");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "automazap-backend" });
});

app.use("/webhook", webhookRoutes);
app.use("/api/rules", rulesRoutes);
app.use("/api/contacts", contactsRoutes);

app.listen(PORT, () => {
  console.log("AutomaZap backend rodando na porta", PORT);
});
