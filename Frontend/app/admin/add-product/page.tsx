"use client"
import AddProductForm from '@/app/components/addproduct/AddProductForm'
import HeadTitle from '@/app/components/HeadTitle'
import React, { useState } from 'react'
import axios from 'axios'
const AddProduct = () => {
  const [openCreate,setOpenCreate] = useState(false)
  const [categoryName,setCategoryName] = useState<string>("");

const addProductAPI = async() =>{
  try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`,{
      category_name:categoryName
    })
    console.log(res.data);
    window.location.reload();
  }catch(err){
    console.log(err);
  }
}

  return (
    <div className='flex flex-col'>
      <HeadTitle title={"Add Product"}/>
      <div className='bg-gray-200 w-full min-h-screen flex flex-col rounded-md pb-10 sha4ow-x2'>
        <div className='flex items-center justify-end p-2 pt-5'>
          {
            openCreate ?
            <div className='flex flex-row gap-4'>
              <form className='flex flex-row gap-4' onSubmit={(e)=>{
                e.preventDefault();
                setCategoryName(categoryName.trim());
                if(categoryName!== ""){
                  addProductAPI();
                }
}}>
                <input type="text" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}} className='outline-none px-4 py-1 rounded-md' placeholder='new category'/>
                <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 duration-300 rounded-md w-[100px] text-white font-medium'>Add</button>
              </form>
                <button className='px-4 py-2 bg-red-500 hover:bg-red-600 duration-300 rounded-md w-[100px] text-white font-medium' onClick={()=>{setOpenCreate(false)}}>Close</button>
                </div>
            :
              <button className='px-4 py-2 bg-purple-500 hover:bg-purple-600 duration-300 rounded-md text-white font-medium' onClick={()=>setOpenCreate(true)}>Create Category</button>
          }
        </div>
          <AddProductForm />
      </div>
    </div>
  )
}

export default AddProduct