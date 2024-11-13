'use client';

import React, { useEffect, useState } from 'react';
import CategorySelect from '../components/categoryCard';
import { getProductById } from '@/app/apis/product';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  onSubmit: (productData: any) => Promise<void>;
  productId?: number;
  mode: 'create' | 'edit';
}

const ProductForm = ({ onSubmit, productId, mode }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>(''); // Discount in percentage
  const [quantity, setQuantity] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const router = useRouter();

  const fetchProductData = async () => {
    if (mode === 'edit' && productId) {
      setIsLoading(true);
      try {
        const product = await getProductById(productId);
        console.log("Fetched product:", product);

        setName(product.name || '');
        setPrice(product.price || '');
        setDiscount((product.discount || '')*100);
        setQuantity(product.quantity || '');
        setDescription(product.description || '');

        if (product.ProductCategory && Array.isArray(product.ProductCategory)) {
          const categoryIds = product.ProductCategory.map((cat: any) => cat.categoryId);
          setCategories(categoryIds);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setMessage('Error fetching product data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      setMessage('Please wait while the data is loading...');
      return;
    }

    if (!name || price === '' || quantity === '' || !description || !categories.length) {
      setMessage('Please fill in all fields');
      return;
  }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
      e.target.style.height = "auto"; // รีเซ็ตความสูงก่อน
      e.target.style.height = `${e.target.scrollHeight}px`; // ตั้งค่าความสูงตามเนื้อหา
    };

    try {
      const productData = { 
        name, 
        price: Number(price), 
        discount: Number(discount) /100, // Convert to decimal
        quantity: Number(quantity), 
        description, 
        categories 
      };
      const response = await onSubmit(productData);

      setMessage(
        mode === 'create'
          ? `Product created: ${response.product.name} with ID: ${response.product.id}`
          : `Product updated: ${response.product.name}`
      );

      if (mode === 'edit') {
        await fetchProductData();
      }
      router.push('/product');
    } catch (error) {
      setMessage('Error saving product');
    }
  };

  const handleCategoryChange = (newCategories: number[]) => {
    setCategories(newCategories);
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 mx-auto bg-white rounded-lg shadow-md w-full ">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
        {mode === 'create' ? 'Create New Product' : 'Edit Product'}
      </h2>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Product Name:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Price:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Discount (%):</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(e.target.value ? Number(e.target.value) : '')}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Quantity:</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Description:</label>
        <textarea
  className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y min-h-60"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4} // จำนวนแถวเริ่มต้น
  required
></textarea>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-600">Categories:</label>
        <CategorySelect setCategory={handleCategoryChange} isMulti={true} selectedCategories={categories} />
      </div>

      <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        {mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>

      {message && <p className="text-center mt-4 font-medium text-blue-600">{message}</p>}
    </form>
  );
};

export default ProductForm;
