"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterUser = () => {
  const router = useRouter();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [cPassword,setCPassword] = useState("");
  const handleRegister = async()=>{
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`,{
        username:username,
        password:password,
        password_confirmation:cPassword
      })
      console.log(res)
      router.push('/admin/users-management')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='w-full flex items-center justify-center h-full min-h-screen'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleRegister()
      }} action="" className='flex flex-col gap-4 items-center'>
        <label className='font-bold text-[30px]'>Register</label>
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username' name="" id="" className='border-2 rounded-xl px-4 w-[410px] h-[50px]'/>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' name="" id="" className='border-2 rounded-xl px-4 w-[410px] h-[50px]'/>
        <input type="password" value={cPassword} onChange={(e)=>{setCPassword(e.target.value)}} placeholder='confirm password' name="" id="" className='border-2 rounded-xl px-4 w-[410px] h-[50px]'/>
        <button className='bg-blue-300 py-2 rounded-xl w-full'>Register</button>
      </form>
    </div>
  )
}

export default RegisterUser