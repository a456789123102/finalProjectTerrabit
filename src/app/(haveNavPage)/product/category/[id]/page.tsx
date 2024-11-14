"use client"
import { useEffect, useState } from 'react'
import Text from '@/app/components/text'
import { fetchProductFromCatId } from '@/app/apis/product';
import { useParams } from 'next/navigation';
import ProductCard from '../../components/productCard';
const CategoryProductPage = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductFromCatId(id); 
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    useEffect(() => {
        if (id) { // ตรวจสอบว่า id ถูกต้องหรือไม่
            fetchProduct(); // เรียกฟังก์ชัน fetch เมื่อ id เปลี่ยนแปลง
        }
    }, [id]); 
    
    return (
      <div className='flex flex-col justify-center items-center text-white p-8 '>
        <div className='min-h-screen min-w-full flex items-start  max-w-4/6 flex-col'>
            <Text className="text-2xl font-bold mb-4">All of Our FPS</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
        </div>
    )
}

export default CategoryProductPage