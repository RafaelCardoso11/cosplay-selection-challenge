import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const configsName = "config.json";
      const configsPath = path.join(process.cwd(), "files", configsName);

      const configs = await fs.readFile(configsPath, 'utf-8');
      res.status(200).json(configs);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}
