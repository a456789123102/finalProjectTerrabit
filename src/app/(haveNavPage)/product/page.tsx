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
  const [pagination, setPagination] = useState({
    page: 1, 
    pageSize: 5, 
    totalPages: 1, 
    totalProducts: 0,
  });

  const fetchProductList = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Sending pagination:", {
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      const productData = await fetchProducts(
        search,
        category? [parseInt(category)] : [],
        pagination.page.toString(), // แปลงเป็น string
        pagination.pageSize.toString() // แปลงเป็น string
      );
      setProducts(productData.products);
      setPagination(productData.pagination);
      console.log(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 })); // รีเซ็ตหน้ากลับไปหน้า 1 เมื่อทำการค้นหา
    fetchProductList();
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setPagination((prev) => ({ ...prev, page: 1 })); // รีเซ็ตหน้ากลับไปหน้า 1 เมื่อเปลี่ยน category
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Our products</h1>
      <Text className="p-1 mb-4">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <div className="min-w-32 min-h-12">
            <CategorySelect 
              setCategory={handleCategoryChange} 
              selectedCategory={category}
              isMulti={false}
            /> 
          </div>
          <button 
            type="submit" 
            className="bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#387478] hover:text-amber-400"
          >
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-row gap-4">
          <button 
            onClick={handlePrevPage} 
            disabled={pagination.page === 1} 
            className="bg-[#1B4242] p-2 shadow-md text-amber-300 cursor-pointer"
          >
            Previous
          </button>
          <span className="">
            Page {pagination.page} / {pagination.totalPages}
          </span>
          <button 
            onClick={handleNextPage} 
            disabled={pagination.page === pagination.totalPages} 
            className="bg-[#1B4242] p-2 shadow-md text-amber-300 cursor-pointer"
          >
            Next
          </button>
        </div>
        <p className=" mt-4">{pagination.totalProducts} products found.</p>
      </div>
    </div>
  );
};

export default ProductList;
