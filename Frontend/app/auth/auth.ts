"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';

export const UseAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const token = Cookie.get('token');
    if (!token) {
      router.push("/");
    }
  }, [router]);
};
