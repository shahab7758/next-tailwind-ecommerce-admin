"use client";

import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function EditProduct({}: Props) {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState<{}>();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response?.data);
    });
  }, [id]);
  return (
    <>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </>
  );
}
