"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { UseAuth } from "../auth/auth";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isClient, setClient] = useState(false);

  UseAuth();
  // const bg = "bg-[#D9D9D9]";
  useEffect(() => {
    setClient(true);
  }, []);
  if (!isClient || typeof window == undefined) {
    return null;  
  }
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <div className="w-full flex-col justify-between flex ml-[80px] px-1 sm:px-5 pb-5">
        {children}
        <div className="w-full text-center">This website is used for educational purposes.</div>
        </div>
    </div>
  );
};

export default Layout;
