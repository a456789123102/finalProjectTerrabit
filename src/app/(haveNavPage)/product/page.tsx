'use client';
import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../apis/product';
import ProductCard from './components/productCard';
import CategorySelect from './components/categoryCard'; 
import Text from '@/app/components/text';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');


  const fetchProductList = useCallback(async () => {
    setLoading(true);
    try {
      const productData = await fetchProducts(search, category ? [parseInt(category)] : []);
      setProducts(productData);
      console.log(productData)
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProductList();
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Our products</h1>
      <Text className='p-1 mb-4'>
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <div className='min-w-32 min-h-12'>
            <CategorySelect 
              setCategory={handleCategoryChange} 
              selectedCategory={category}
              isMulti={false}
            /> 
          </div>
          <button type="submit" className="bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#387478] hover:text-amber-400">
            ค้นหา
          </button>
        </form>
      </Text>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;