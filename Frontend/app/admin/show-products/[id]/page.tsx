"use client";
import LoadingDog from "@/app/components/LoadingDog";
import { Product } from "@/app/interfaces/product";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [productDetail, setProductDetail] = useState<Product>();
  const param = useParams();
  const fetchDetailProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stock/${param.id}`
      );
      setProductDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(param.id){
      fetchDetailProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  if (!productDetail || !param) {
    return <div className="min-h-screen flex items-center justify-center">
    <LoadingDog />
  </div>;
  }
  const price = new Intl.NumberFormat().format(Number(productDetail?.price ?? 0));
const discount = new Intl.NumberFormat().format(Number(productDetail?.discount ?? 0));
const finalPrice = new Intl.NumberFormat().format(
  Number((productDetail?.price ?? 0) - (productDetail?.discount ?? 0))
);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center">Product Detail</h1>
        <div className="bg-white p-[40px] rounded-lg flex flex-row gap-4">
          <div className="w-[300px] h-[300px] border-black">
            <Image
              src={`/uploads/${productDetail.image}`}
              alt={productDetail.image}
              width={300}
              height={300}
              className="w-[300px] h-full object-contain"
            />
          </div>
          <div className="flex flex-col max-w-[450px]">
            <div className="text-[30px] font-[500]">
              {productDetail.productName}
            </div>
            <div className="text-[20px]">
              Category: {productDetail.category}
            </div>
            <div className="text-[20px]">
              Manufacturer: {productDetail.manufacturer} -{" "}
              {productDetail.countryOfManufacture}
            </div>

            <div className="w-full h-[1.5px] bg-black my-2"></div>

            {/* Price Section */}
            <div className="text-[20px] flex flex-row items-center">
              <div className="text-[15px] mr-2">Price:</div>
              {productDetail.discount > 0 ? (
                <div className="flex flex-row gap-4 items-center">
                  <del className="text-gray-500">฿{price}</del>
                  <span className="text-green-500 font-bold">฿{finalPrice}</span>
                </div>
              ) : (
                <span className="text-green-500 font-bold">฿{price}</span>
              )}
            </div>

            {/* Discount */}
            {productDetail.discount > 0 && (
              <div className="text-[20px] text-red-500 flex items-center">
                <div className="text-[15px] mr-2">Discount:</div> ฿{discount}
              </div>
            )}

            {/* Quantity, Sales, Warranty */}
            <div className="flex flex-row justify-between gap-4">
            <div className="text-[20px] flex flex-row items-center ">
              <div className="text-[15px] mr-2">In Stock:</div> <span className="text-yellow-500 font-medium">{productDetail.quantity} unit{productDetail.quantity >1 && "s"}</span>
            </div>
            <div className="text-[20px] flex flex-row items-center ">
              <div className="text-[15px] mr-2">Sold:</div><span className="text-pink-400 font-medium">{productDetail.totalSale} unit{productDetail.totalSale >1 && "s"}</span>
            </div>
            </div>
            <div className="text-[20px] flex flex-row items-center">
              <div className="text-[15px] mr-2">Warranty:</div> <span className="text-blue-600 font-medium">{productDetail.warranty} Month
              {productDetail.warranty > 1 && "s"}</span>
            </div>
            
            <div className="w-full h-[1.5px] bg-black my-2"></div>

            <div className="text-[20px] flex flex-col">
              <div className="text-[15px] mr-2">Description:</div> <span className="text-black">{productDetail.detail}</span>
            </div>
            <Link href={`/admin/edit-product/${productDetail.id}`} className="text-center w-full mt-10 bg-yellow-400 px-10 text-[17px] py-1 rounded-lg">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
