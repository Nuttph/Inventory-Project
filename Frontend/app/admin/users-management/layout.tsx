"use client"
import { ReactNode, useEffect } from 'react'
import Cookie from "js-cookie";
import { useRouter } from 'next/navigation';
const Layout = ({children}:{children:ReactNode}) => {
    const route = useRouter();
    useEffect(() => {
        const cookie: string | undefined = Cookie.get("userinfo");
        if (cookie) {
          const infoCookie = cookie && JSON.parse(atob(cookie));
          if(infoCookie.role !== "Admin"){
              route.push('/admin')
          }
        }else{
            route.push('/admin')
        }
      }, [route]);
  return (children)
}

export default Layout