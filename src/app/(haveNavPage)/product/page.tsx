"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProducts } from '../../apis/product';
import ProductCard from './components/productCard';
import CategorySelect from './components/categoryCard';
import Text from '@/app/components/text';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const ProductList = () => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [tempSearch, setTempSearch] = useState('');

  const [category, setCategory] = useState<number | number[]>([]);
  const [tempCategory, setTempCategory] = useState<number | number[]>([]);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    totalPages: 1,
    totalProducts: 0,
  });

  const searchParamsString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const newCategory = searchParams.get("category");
    const newSearch = searchParams.get("search");

    if (newCategory) {
      setCategory(parseInt(newCategory) || []);
      setTempCategory(parseInt(newCategory) || []);
    }

    if (newSearch !== search) {
      setSearch(newSearch || "");
      setTempSearch(newSearch || "");
    }
  }, [searchParams, searchParamsString, search]);

  const fetchProductList = useCallback(async () => {
    setLoading(true);
    try {
      const productData = await fetchProducts(
        search,
        Array.isArray(category) ? category : [category],
        pagination.page.toString(),
        pagination.pageSize.toString()
      );
      setProducts(productData.products);
      setPagination(productData.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList, search, category, pagination.page, pagination.pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(tempSearch);
    setCategory(tempCategory);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleCategoryChange = (selectedCategory: number | number[]) => {
    setTempCategory(selectedCategory);
  };

  return (
    <div className='min-h-screen w-full py-7'>
      <div className="container mx-auto p-4 min-h-screen bg-gray-50">
        <div>
          <div className="text-2xl font-bold mb-4">We have {pagination.totalProducts} products</div>
          {search && (
            <div className='flex flex-row gap-1'>
              <div>from searching:</div>
              <div className='text-gray-700'>{search}</div>
            </div>
          )}
        </div>

        <Text className="p-1 mb-4">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <input
              type="text"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              placeholder="Find products"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <div className="min-w-32 min-h-12">
            <CategorySelect
  setCategory={handleCategoryChange}
  selectedCategories={tempCategory} 
  isMulti={false}
/>

            </div>
            <button
              type="submit"
              className="bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#387478] hover:text-amber-400"
            >
              Search
            </button>
          </form>
        </Text>
      </div>
    </div>
  );
};

export default ProductList;
