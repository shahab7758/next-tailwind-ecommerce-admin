/* eslint-disable */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { env } from "node:process";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = new multiparty.Form();
  const bucketName: string = "next-ecommerce-admin";
  const { fields, files } = await new Promise<any>((resolve, reject) => {
    form.parse(req, (err: any, fields: any, files: string | any[]) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const accessKeyId: string | undefined = process.env.S3_ACCESS_KEY;
  const secretAccessKey: string | undefined = process.env.S3_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("S3 access key or secret access key is missing");
  }

  const client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    const contentType = mime.lookup(file.path);

    if (typeof contentType !== "string") {
      throw new Error(
        `Could not determine the content type for file: ${file.path}`
      );
    }
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: contentType,
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
