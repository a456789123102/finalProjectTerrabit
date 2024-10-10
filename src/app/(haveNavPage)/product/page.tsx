'use client';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../apis/product';
import ProductCard from './components/productCard';
import CategorySelect from './components/categoryCard'; // Assuming correct import path
import Text from '@/app/components/text';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(''); // ใช้ string แทน array สำหรับหมวดหมู่เดียว

  const fetchProductList = async () => {
    try {
      const productData = await fetchProducts(search, category ? [parseInt(category)] : []); // ส่ง array ที่มีหมวดหมู่เดียว
      setProducts(productData);
      console.log(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [category, search]); 

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchProductList();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">All of our proud product</h1>
     <Text className=' p-1 mb-4 '>
     <form  onSubmit={handleSearch} className="flex space-x-4 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products"
          className="border border-gray-300 p-2 rounded w-full"
        />
      <div className='min-w-32 min-h-12'>
      <CategorySelect setCategory={setCategory} /> 
      </div>
        <button type="submit" className="bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#387478] hover:text-amber-400">
          Search
        </button>
      </form>
     </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
