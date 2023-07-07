// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@/BackendAPI/models/product";
import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../../lib/mongoose";
type Data = {
  //   name: {};
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.status(200).json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.status(200).json(await Product.find());
    }
  }
  if (method === "POST") {
    const { title, description, price, images } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.status(200).json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, _id } = req.body;
    await Product.updateOne(
      {
        _id,
      },
      {
        title,
        description,
        price,
        images,
      }
    );
    res.status(200).json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({
        _id: req.query.id,
      });
      res.status(200).json(true);
    }
  }
}
