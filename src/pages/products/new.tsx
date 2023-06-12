import Layout from "@/components/HOC/Layout";

import ProductForm from "@/components/ProductForm";
type Props = {};

export default function NewProduct({}: Props) {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
