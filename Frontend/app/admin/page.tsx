"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Rider = () => {
  const route = useRouter();
  useEffect(()=>{
    route.push('/admin/home')
  },[route])
  return null;
};
    
export default Rider;
