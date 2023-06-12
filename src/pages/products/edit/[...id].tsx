import Layout from "@/components/HOC/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

export default function EditProduct({}: Props) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<{}>();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response?.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
