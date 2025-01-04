'use client';

import React, { useEffect, useState } from 'react';
import CategorySelect from '../../../../(haveNavPage)/product/components/categoryCard';
import { getProductById } from '@/app/apis/product';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imageDetail1, setImageDetail1] = useState<File | null>(null);
  const [imageDetail2, setImageDetail2] = useState<File | null>(null);

  const [existingCoverImage, setExistingCoverImage] = useState<string | null>(null);
  const [existingImageDetail1, setExistingImageDetail1] = useState<string | null>(null);
  const [existingImageDetail2, setExistingImageDetail2] = useState<string | null>(null);

  const fetchProductData = async () => {
    if (mode === 'edit' && productId) {
      setIsLoading(true);
      try {
        const product = await getProductById(productId);

        setName(product.name || '');
        setPrice(product.price || '');
        setDiscount((product.discount || '') * 100);
        setQuantity(product.quantity || '');
        setDescription(product.description || '');

        const coverImage = product.Image.find((img: any) => img.name === 'CoverImage');
        const ImageDetail1 = product.Image.find((img: any) => img.name === 'ImageDetail1');
        const ImageDetail2 = product.Image.find((img: any) => img.name === 'ImageDetail2');

        setExistingCoverImage(coverImage?.imageUrl || null);
        setExistingImageDetail1(ImageDetail1?.imageUrl || null);
        setExistingImageDetail2(ImageDetail2?.imageUrl || null);
  

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

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', String(price));
      formData.append('discount', String(Number(discount) / 100));
      formData.append('quantity', String(quantity));
      formData.append('description', description);
      formData.append('categories', JSON.stringify(categories));

      if (coverImage) formData.append('CoverImage', coverImage);
      if (imageDetail1) formData.append('ImageDetail1', imageDetail1);
      if (imageDetail2) formData.append('ImageDetail2', imageDetail2);

      const response = await onSubmit(formData);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full ">
      <div className="w-full flex flex-row">
        <div className="w-1/2 border">
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
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-600">Categories:</label>
            <CategorySelect setCategory={handleCategoryChange} isMulti={true} selectedCategories={categories} />
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="font-medium text-gray-600 mb-2">Images:</h3>

          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Cover Image:</label>
            {existingCoverImage && (
              <div className="mb-2">
                <Image src={existingCoverImage} alt="Cover" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
            <input type="file" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Image Detail 1:</label>
            {existingImageDetail1 && (
              <div className="mb-2">
                <Image src={existingImageDetail1} alt="Detail 1" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
            <input type="file" onChange={(e) => setImageDetail1(e.target.files?.[0] || null)} />
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Image Detail 2:</label>
            {existingImageDetail2 && (
              <div className="mb-2">
                <Image src={existingImageDetail2} alt="Detail 2" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
            <input type="file" onChange={(e) => setImageDetail2(e.target.files?.[0] || null)} />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        {mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>
      {message && <p className="text-center mt-4 font-medium text-blue-600">{message}</p>}
    </form>
  );
};

export default ProductForm;
