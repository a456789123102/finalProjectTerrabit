'use client';

import React, { useEffect, useState } from 'react';
import CategorySelect from '../components/categoryCard';
import { getProductById } from '@/app/apis/product';

interface ProductFormProps {
  onSubmit: (productData: any) => Promise<void>;
  productId?: number;
  mode: 'create' | 'edit';
}

const ProductForm = ({ onSubmit, productId, mode }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(mode === 'edit');

  const fetchProductData = async () => {
    if (mode === 'edit' && productId) {
      setIsLoading(true);
      try {
        const product = await getProductById(productId);
        console.log("Fetched product:", product);

        setName(product.name || '');
        setPrice(product.price || '');
        setQuantity(product.quantity || '');
        setDescription(product.description || '');

        if (product.ProductCategory && Array.isArray(product.ProductCategory)) {
          const categoryIds = product.ProductCategory.map((cat: any) => cat.categoryId);
          console.log(`Category IDs fetched: ${categoryIds}`);
          setCategories(categoryIds);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setMessage('Error fetching product data');
        console.error('Error fetching product data:', error);
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

    if (!name || price === '' || quantity === '' || !description || !Array.isArray(categories) || categories.length === 0) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const productData = { 
        name, 
        price: Number(price), 
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

    } catch (error) {
      setMessage('Error saving product');
      console.error('Error creating/updating product:', error);
    }
  };

  const handleCategoryChange = (newCategories: number[]) => {
    setCategories(newCategories);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-72 p-2'>
      <div className='flex flex-col item-center'>
        <div>Product Name:</div>
        <input
          className='px-2 rounded py-1'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='flex flex-col item-center'>
        <div>Price:</div>
        <input
          className='px-2 rounded py-1'
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
          required
        />
      </div>

      <div className='flex flex-col item-center'>
        <div>Quantity:</div>
        <input
          className='px-2 rounded py-1'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
          required
        />
      </div>

      <div className='flex flex-col item-center'>
        <div>Description:</div>
        <textarea
          className='text-sm p-1 text-[13px] rounded'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <div>Categories Select</div>
        <CategorySelect 
          setCategory={handleCategoryChange} 
          isMulti={true} 
          selectedCategories={categories} 
        />
      </div>

      <button type='submit' className='bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#387478] hover:text-amber-400'>
        {mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProductForm;
