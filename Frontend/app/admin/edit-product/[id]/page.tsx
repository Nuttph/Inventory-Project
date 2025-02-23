"use client";
import { Product } from "@/app/interfaces/product";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditProductParam = () => {
  const param = useParams();
  const [productDetail, setProductDetail] = useState<Product>();
  

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
    if (param.id) {
      fetchDetailProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!param || !productDetail) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <div>{productDetail.productName}</div>
    </div>
  );
};

export default EditProductParam;
