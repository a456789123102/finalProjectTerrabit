'use client'
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../apis/product';
import ProductCard from './components/productCard'; // นำเข้าคอมโพเนนต์ที่สร้างไว้

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchProductList = async () => {
    try {
      const productData = await fetchProducts(search, category ? parseInt(category) : undefined);
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchProductList();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <form onSubmit={handleSearch} className="flex space-x-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // เรียกใช้ ProductCard ที่แยกออกมา
        ))}
      </div>
    </div>
  );
};

export default ProductList;
