import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "..", "data");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readJson(fileName, defaultValue = []) {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      return defaultValue;
    }
    console.error("Erro ao ler", filePath, err);
    throw err;
  }
}

export async function writeJson(fileName, data) {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
