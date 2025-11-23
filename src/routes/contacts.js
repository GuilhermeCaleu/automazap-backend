const express = require("express");
const router = express.Router();

// contatos fake
const contatosFake = [
  { name: "João", number: "5511999999999" },
  { name: "Maria", number: "5511888888888" }
];

router.get("/", (req, res) => {
  res.json(contatosFake);
});

module.exports = router;
