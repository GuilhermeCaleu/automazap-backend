const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");

function readJson(fileName, defaultValue) {
  const filePath = path.join(dataDir, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erro ao ler", fileName, err);
    return defaultValue;
  }
}

function writeJson(fileName, data) {
  const filePath = path.join(dataDir, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Erro ao escrever", fileName, err);
  }
}

function getRules() {
  return readJson("rules.json", []);
}

function saveRules(rules) {
  writeJson("rules.json", rules);
}

function getContacts() {
  return readJson("contacts.json", []);
}

function saveContacts(contacts) {
  writeJson("contacts.json", contacts);
}

module.exports = {
  getRules,
  saveRules,
  getContacts,
  saveContacts,
};
