import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const fileName = "config.json";
      const filePath = path.join(process.cwd(), "files", fileName);

      const fileStream = fs.createReadStream(filePath);
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: "Erro ao baixar o arquivo." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}