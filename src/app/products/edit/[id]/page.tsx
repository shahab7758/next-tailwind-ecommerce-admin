"use client";

import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function EditProduct({}: Props) {
  const params: any = useParams();
  const { id } = params;
  const [productInfo, setProductInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response?.data);
    });
  }, [id]);

  const { _id, title, description, price, images } = productInfo;

  return (
    <>
      <h1>Edit product</h1>
      {productInfo && (
        <ProductForm
          _id={_id}
          title={title}
          description={description}
          price={price}
          images={images}
        />
      )}
    </>
  );
}
