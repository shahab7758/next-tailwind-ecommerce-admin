import Layout from "@/components/HOC/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

export default function DeleteProduct({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState<any>();
  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response?.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };

  return (
    <Layout>
      <h1 className="text-center">
        {`Do you really want to delete "${productInfo?.title}"`}?
      </h1>
      <div className="flex justify-center gap-2">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}