"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,Home, Package, PlusCircle, User, Users, LogOut, ChevronRight, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Sidebar = () => {
  
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', section: 'Home',path:"home" },
    { icon: Package, label: 'Inventory', section: '.life Inventory System' ,path:"show-products"},
    { icon: PlusCircle, label: 'Add Product', section: '.life Inventory System' ,path:"add-product"},
    { icon: Users, label: 'Admin', section: 'User Management' ,path:"users-management"},
    { icon: LayoutDashboard, label: 'Dashboard', section: 'Dashboard' ,path:"dashboard"},
  ];

  const sections = [...new Set(menuItems.map(item => item.section))];

  const handleLogout = async()=>{
    const token = Cookie.get('token')
    if (!token) {
      console.error("No token found");
      return;
    }
    console.log(token)
    try{
      await axios.post('http://127.0.0.1:8000/api/logout',{},{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      }).then(r=>console.log(r))
    }catch(err){
      console.log(err)
    }finally{
      Cookie.remove('token');
      Cookie.remove('userinfo');
      router.push('/');
    }
  }


  const [username,setUsername] = useState("Loading..");
  const [role,setRole] = useState("Loading..");

  useEffect(() => {
    const userInfo = Cookie.get('userinfo');
    if(userInfo){
      const nameOfCooke = JSON.parse(atob(userInfo));
      setUsername(nameOfCooke.username)
      setRole(nameOfCooke.role)
    }
  }, []);

  const goingto = (path:string) =>{
    if(path == "users-management" && role !== "Admin"){
      toast.warning("You do not have permission")
    }else{
      router.push(`/admin/${path}`)
    }
  }

  return (
    <div className="fixed h-screen z-[100]">
      <ToastContainer className="z-[50]"/>
      <div onClick={()=>{
        setIsExpanded(false);
      }} className={`${isExpanded && "absolute w-screen h-screen bg-black opacity-10 z-[-1]"}`}></div>
      {/* Sidebar with Animation */}
      <motion.div
        initial={{ width: 80 }}
        animate={{ width: isExpanded ? 256 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col bg-gray-900 text-gray-400 p-4 h-full"
      >
        {/* Top Section */}
        <div className={`${isExpanded ? "flex-row justify-between items-center":"flex-col "} flex gap-2 mb-6`}>
          <div className="p-2 rounded-lg bg-gray-800 w-fit">
            <span className="text-sm">.life</span>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-800 cursor-pointer rounded-lg transition-transform"
          >
            <ArrowLeft size={20} className={`${isExpanded ? "" : "rotate-180"} duration-700`} />
          </button>
        </div>

        {/* Menu Items */}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {isExpanded && <div className="text-xs text-gray-500 mb-2">{section}</div>}
            {menuItems.filter(item => item.section === section).map((item, index) => (
              <button onClick={()=>{goingto(item.path)}} key={index} className="flex items-center w-full p-2 hover:bg-gray-800 rounded-lg mb-1 relative group">
                <item.icon size={20} className="mr-3" />
                {isExpanded && <span className="text-sm">{item.label}</span>}
                <span className='absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block text-sm text-white bg-gray-700 border border-gray-300 rounded px-2 py-1 whitespace-nowrap'>{item.label}</span>
              </button>
            ))}
          </div>
        ))}

        {/* Bottom Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-between p-[6px] bg-gray-800/50 rounded-lg">
            <div className="flex items-center">
              <Link href={'manage-account'} className="p-2 rounded-lg bg-gray-800">
                <User size={20} />
              </Link>
              {isExpanded && <span className="ml-3 text-sm">{username}</span>}
            </div>
            {isExpanded && (
              <Link href="/admin/manage-account" className="p-2 hover:bg-gray-800 rounded-lg">
                <ChevronRight size={20} />
              </Link>
            )}
          </div>
          <button onClick={()=>{
              handleLogout()
          }} className="flex items-center justify-center w-full p-3 mt-4 hover:bg-gray-800 rounded-lg bg-red-900/20 text-red-500">
            <LogOut size={20} className={`${isExpanded && "mr-2"} duration-300 transition-all`} />
            {isExpanded && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
