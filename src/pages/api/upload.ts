// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: string | any[]) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("object", files.file.length);
  res.status(200).json("OK");
}

export const config = {
  api: { bodyParser: false },
};
