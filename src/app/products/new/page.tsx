"use client";
import Layout from "@/components/HOC/Layout";
import ProductForm from "@/components/ProductForm";

type Props = {};

export default function NewProduct({}: Props) {
  return (
    <>
      <h1>New Product</h1>
      <ProductForm />
    </>
  );
}
