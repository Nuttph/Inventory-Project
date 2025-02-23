"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const EditProductRe = () => {
    const route = useRouter();
  useEffect(()=>{
    route.push('/admin')
  },[route]) //เพิ่งแก้ routeไป ถ้า erorr ก็นี่แหละมั้ง
  return null
}
export default EditProductRe