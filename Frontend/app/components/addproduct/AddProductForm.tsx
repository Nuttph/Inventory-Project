"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/app/interfaces/category";
import { ToastContainer, toast } from 'react-toastify';

const AddProductForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      previewImage(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      previewImage(selectedFile);
    }
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (
      product.productName.trim() === "" ||
      product.price <= 0 ||
      product.warranty <= 0 ||
      product.quantity <= 0 ||
      product.category.trim() === "" ||
      product.manufacturer.trim() === "" ||
      product.countryOfManufacture.trim() === "" ||
      product.totalSale <= 0 ||
      product.detail.trim() === "" ||
      product.discount <= 0 ||
      product.cost <= 0 ||
      !file
    ) {
      toast.error("Please fill out all required fields.")
      if(!file){
      toast.warning("Please select a file to upload.")
      }
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await fetch(".././../api/upload", {
        method: "POST",
        body: formData,
      });
      console.log(res)
      const data = await res.json();
      if (res.ok) {
        handleCreateProduct(data.file)
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };


  const handleCreateProduct = async(image:string) =>{
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stock`,{
        productName: product.productName,
        price: product.price,
        warranty: product.warranty,
        quantity: product.quantity,
        category: product.category,
        manufacturer: product.manufacturer,
        countryOfManufacture: product.countryOfManufacture,
        totalSale: product.totalSale,
        image: image,
        detail: product.detail,
        discount: product.discount,
        cost: product.cost,
        active: 1,
      })
      console.log(res);
      window.location.reload();
    }catch(err){
      console.log("Handle Create "+err);
    }
  }

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    warranty: 0,
    quantity: 0,
    category: "",
    manufacturer: "",
    countryOfManufacture: "",
    totalSale: 0,
    image: "",
    detail: "",
    discount: 0,
    cost: 0,
    active: 1,
  });

  const loopInput = [
    {
      title: "Manufacturer",
      name: "manufacturer",
      type: "string",
    },
    {
      title: "Country Of Manufacture",
      name: "countryOfManufacture",
      type: "string",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Warranty",
      name: "warranty",
      type: "number",
    },
    {
      title: "Quantity",
      name: "quantity",
      type: "number",
    },
    {
      title: "Discount",
      name: "discount",
      type: "number",
    },
    {
      title: "Cost",
      name: "cost",
      type: "number",
    },
    {
      title: "Total sold",
      name: "totalSale",
      type: "number",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: String(value),
    }));
  };

  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );
      // console.log(res)
      setAllCategory(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row w-full">
      <ToastContainer className="z-[50]"/>
      <form
        className="w-full p-2 flex flex-col md:flex-row gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(product);
        }}
      >
        <div className="flex-1 flex flex-col gap-2">
          <div>Product Name</div>
          <input
            name="productName"
            type="text"
            value={product.productName}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Product Name"
            className="w-full px-4 py-2 rounded-xl outline-none"
          />
          <div>Category</div>
          <select
            name="category"
            value={product.category}
            onChange={(e) => {
              handleChange(e);
            }}
            className="w-full px-4 py-2 rounded-xl outline-none"
          >
            <option value="">Select Category</option>
            {allCategory.map((item, index) => (
              <option key={index} value={item.category_name}>
                {item.category_name}
              </option>
            ))}
          </select>
          {loopInput.map((item, index) => (
            <div key={index}>
              <div>{item.title}</div>
              <input
                key={index}
                name={item.name}
                type={item.type}
                onFocus={(e) => e.target.select()}
                value={product[item.name as keyof typeof product]}
                onChange={handleChange}
                placeholder={item.name}
                className="w-full px-4 py-2 rounded-xl outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>Product Image</div>
          <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
            <div
              className={`w-full min-h-[300px] p-6 text-center border-2 border-dashed rounded-2xl flex items-center justify-center transition-all ${
                dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-100"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full max-h-60 object-contain rounded-lg shadow-md"
                />
              ) : (
                <div>
                  <p className="text-gray-600">Drag & Drop your image here</p>
                  <p className="text-sm text-gray-500">
                    or click to select an image
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageUpload"
              />
            </div>
            <label
              htmlFor="imageUpload"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
            >
              Select Image
            </label>
          </div>
          <div>Detail</div>
          <textarea
            name="detail"
            className="h-[200px] p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.detail}
            onChange={handleChange}
          />
          <div className="flex w-full justify-end mt-5">
          <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold rounded-xl w-[200px]">
            {uploading ? "...":"Create Product"}
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
