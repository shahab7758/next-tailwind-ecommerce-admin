import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Props = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: [];
};

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}: Props) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState<any>(existingImages || []);
  const [goToProducts, setGoToProducts] = useState<boolean>(false);
  const router = useRouter();
  const saveProduct = async (e: any) => {
    e.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push("/products");
  }
  const uploadImages = async (e: any) => {
    const files: [] = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res: any = await axios.post("/api/upload", data);
      setImages((oldImages: any) => {
        return [...oldImages, res?.data?.links];
      });
      console.log("object", res?.data);
    }
  };
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex gap-2 flex-wrap">
        {!!images?.length &&
          images.map((link: string) => (
            <div key={link} className="h-24">
              <img src={link} alt="Product" className="rounded-lg" />
            </div>
          ))}
        <label className="w-24 h-24 cursor-pointer flex text-center items-center justify-center gap-1 text-sm text-gray-500 bg-gray-200 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!images?.length && <p>No photos in this product </p>}
      </div>
      <label> Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
