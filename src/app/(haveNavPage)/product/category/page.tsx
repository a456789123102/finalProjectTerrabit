"use client"
import {useEffect, useState} from 'react'
import React from 'react'
import {getAllcategory} from '@/app/apis/category'
import { useRouter } from 'next/navigation'
const Category = () =>{
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const fetchCategories = async() =>{
    try {
      const categoryData = await getAllcategory();
      console.log("Fetched categories:", categoryData);
      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching products:',error);
    }
  }

  useEffect(() => {
    fetchCategories(); 
  }, []);
const handleClick = (id) => {
  router.push(`/product/category/${id}`)
 
}

  return (
    <div className='flex flex-col items-center justify-center  text-white p-8'>
    <div className='min-h-screen min-w-full flex items-start justify-center max-w-4/6'>
<div className='w-10/12 bg-slate-200 mt-6'>
<div className='flex flex-row p-5'>
  {categories.map((category, index) => (
    <div className='p-2 bg-fuchsia-300 mx-2 rounded-md cursor-pointer hover:bg-fuchsia-700' key={index} onClick={() => handleClick(category.id)}>
      {category.name}</div>
  ))}
</div>
</div>
    </div>
    </div>
  )
}

export default Category
