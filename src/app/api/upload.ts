/* eslint-disable */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new multiparty.Form();
  const bucketName: string = "next-ecommerce-admin";
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: string | any[]) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: "AKIASKLUSWGE4O4ERFHY",
      secretAccessKey: "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",
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }

  res.status(200).json({ links });
}

export const config = {
  api: { bodyParser: false },
};
