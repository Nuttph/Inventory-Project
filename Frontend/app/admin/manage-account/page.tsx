"use client";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { User } from "lucide-react";
import { UserInfoProps } from "@/app/interfaces/payload";

const ManageAccout = () => {
  const [user, setUser] = useState<UserInfoProps>();
  useEffect(() => {
    const cookie: string | undefined = Cookie.get("userinfo");
    if (cookie) {
      const nameOfCooke = cookie && JSON.parse(atob(cookie));
      setUser(nameOfCooke);
    }
  }, []);

  if(!user){
    return "Loading..."
  }

  return (
    <div className="flex w-full h-full min-h-screen items-center justify-center">
      <div className="flex flex-col items-center bg-white shadow-2xl px-4 py-8 rounded-md w-[400px] h-[600px]">
          <div className="bg-gray-200 rounded-full p-3"><User size={200}/></div>
          <div className="flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="w-[100px]">Name :</div>
            <div>{user.name}</div>
          </div>
          <div className="flex flex-row">
            <div className="w-[100px]">Username :</div>
            <div>{user.username}</div>
          </div>
          <div className="flex flex-row">
            <div className="w-[100px]">Role :</div>
            <div>{user.role}</div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ManageAccout;
