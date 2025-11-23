const express = require("express");
const { getContacts } = require("../dataStore");

const router = express.Router();

router.get("/", (_req, res) => {
  const contacts = getContacts();
  res.json(contacts);
});

module.exports = router;
