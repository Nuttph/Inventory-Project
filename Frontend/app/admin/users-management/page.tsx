"use client"
import LoadingUser from "@/app/components/LoadingUser";
import { User } from "@/app/interfaces/payload";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
const [loading,setLoading] = useState<boolean>(true);
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // แปลงวันที่เป็นรูปแบบที่อ่านง่าย
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0]; // แสดงแค่วันที่
  };

  const handleDelete = (id: number) => {
    console.log(`Delete user with id: ${id}`);
    // เพิ่มการลบข้อมูลที่นี่
  };

  const toggleStatus = async(id: number,active:number) => {
    try{
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/status/${id}`,
        {
          active:active
        }
      )
      console.log(res)
    }catch(err){
      console.log(err)
    }finally{
      fetchUser()
    }

    // เพิ่มการเปลี่ยนแปลงสถานะที่นี่
  };

  if (!users || loading) {
    return <div className="w-full min-h-screen flex items-center justify-center"><LoadingUser/></div>;
  }

  return (
    
    <div className="m-4">
       <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}>
        <Link href="/admin/users-management/register-user" className="px-4 py-2 rounded bg-pink-300 drop-shadow-lg mb-4 w-[300px] float-end text-center">Register</Link>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="w-[300px] py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 text-center">{String(item.id).padStart(4,"0")}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.username}</td>
              <td className="px-4 py-2">{item.role}</td>
              <td className="px-4 py-2 text-center">{formatDate(item.created_at)}</td>
              <td className={`px-4 text-center py-2 ${item.active == 1 ? "text-green-500":"text-red-500"}`}>
                  {item.active === 1 ? "Active" : "Inactive"}
              </td>
              <td className="w-[300px] py-2 flex flex-row items-center justify-around">
              <button
                  className={`w-[100px] px-4 py-1 rounded ${
                    item.active === 0 ? "bg-green-400 hover:bg-green-700" : "bg-red-400 hover:bg-red-700"
                  } text-white duration-300`}
                  onClick={() => toggleStatus(item.id,item.active == 1 ? 0:1)}
                >
                  {item.active === 0 ? "Active" : "Inactive"}
                </button>
                <button
                  className="px-4 py-1 bg-red-600 hover:bg-red-900 duration-300 text-white rounded"
                  onClick={() => {handleDelete(item.id)}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </motion.div>
    </div>
  );
};

export default AdminPage;
