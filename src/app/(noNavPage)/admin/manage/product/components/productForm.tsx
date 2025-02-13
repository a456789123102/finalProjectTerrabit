'use client';

import React, { useEffect, useState } from 'react';
import CategorySelect from '../../../../(haveNavPage)/product/components/categoryCard';
import { getProductById } from '@/app/apis/product';
import Image from 'next/image';
import { uploadProductImage,deleteImage } from '@/app/apis/productImage';
import Swal from "sweetalert2";

interface ProductFormProps {
  onSubmit: (productData: any) => Promise<void>;
  productId?: number;
  mode: 'create' | 'edit';
}

const ProductForm = ({ onSubmit, productId, mode }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>(''); 
  const [quantity, setQuantity] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(mode === 'edit');

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imageDetail1, setImageDetail1] = useState<File | null>(null);
  const [imageDetail2, setImageDetail2] = useState<File | null>(null);

  const [existingCoverImage, setExistingCoverImage] = useState<string | null>(null);
  const [existingImageDetail1, setExistingImageDetail1] = useState<string | null>(null);
  const [existingImageDetail2, setExistingImageDetail2] = useState<string | null>(null);

  const [existingCoverImageId, setExistingCoverImageId] = useState<number | null>(null);
const [existingImageDetail1Id, setExistingImageDetail1Id] = useState<number | null>(null);
const [existingImageDetail2Id, setExistingImageDetail2Id] = useState<number | null>(null);

  const fetchProductData = async () => {
    if (mode === 'edit' ) {
      if (productId === undefined) {
        console.error("Invalid product ID:", productId);
        return; // หยุดการทำงานถ้า productId ไม่ถูกต้อง
      }
      setIsLoading(true);
      try {
        console.log("Fetching data for product ID:", productId);
    
        const product = await getProductById(productId);

        setName(product.name || '');
        setPrice(product.price || '');
        setDiscount(product.discount *100 || 0);
        setQuantity(product.quantity || '');
        setDescription(product.description || '');

        const coverImage = product.Image.find((img: any) => img.name === 'CoverImage');
        const imageDetail1 = product.Image.find((img: any) => img.name === 'DetailImage1');
        const imageDetail2 = product.Image.find((img: any) => img.name === 'DetailImage2');


        setExistingCoverImage(coverImage?.imageUrl || null);
        setExistingImageDetail1(imageDetail1?.imageUrl || null);
        setExistingImageDetail2(imageDetail2?.imageUrl || null);

        setExistingCoverImageId(coverImage?.id || null);
        setExistingImageDetail1Id(imageDetail1?.id || null);
        setExistingImageDetail2Id(imageDetail2?.id || null);
  

        const categoryIds = product.ProductCategory?.map((cat: any) => cat.categoryId) || [];
        setCategories(categoryIds);
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      discount: discount || 0,
      quantity,
      description,
      categories,
    };

    try {
      await onSubmit(productData);
      setMessage(mode === 'create' ? 'Product created successfully' : 'Product updated successfully');
    } catch (error) {
      console.error('Error submitting product:', error);
      setMessage('Error submitting product');
    }
  };
  const handleCategoryChange = (newCategories: number[]) => {
    setCategories(newCategories);
  };

  const handleUploadImage = async (
    file: File,
    label: string, // ชื่อ label ที่ backend คาดหวัง
    productId: number,
    setExistingImage: (url: string | null) => void,
    setFile: (file: File | null) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append(label, file); 
  
      const response = await uploadProductImage(productId, formData);
      console.log("FormData entries:", Array.from(formData.entries()));
      if (!response) {
        throw new Error("Failed to upload image");
      }
fetchProductData()
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };



  const handleDeleteImage = async (imageId: number,label:string) => {
    try {
      // แสดง SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${label} (Id: ${imageId})`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      // ถ้าผู้ใช้กดปุ่ม "Yes, delete it!"
      if (result.isConfirmed) {
        const res = await deleteImage(imageId);
  
        if (res) {
          Swal.fire("Deleted!", "Your image has been deleted.", "success");
          fetchProductData(); // รีเฟรชข้อมูล
          return res;
        }
      }
    } catch (error) {
      console.error("Error deleting image:", error);
  
      // แสดง SweetAlert ในกรณีเกิดข้อผิดพลาด
      Swal.fire("Error!", "Failed to delete the image. Please try again.", "error");
    }
  };
  


  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md min-w-full">
      <div className="min-w-full flex flex-row">
        {/* Left Section: Form Inputs */}
        <div className={`border ${mode === 'create' ? 'w-full' : 'w-1/2'}`}>
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </h2>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Product Name:</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Price:</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || '')}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Discount (%):</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value) || '')}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Quantity:</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || '')}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Description:</label>
            <textarea
              className="px-4 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-medium text-gray-600">Categories:</label>
            <CategorySelect setCategory={handleCategoryChange} isMulti={true} selectedCategories={categories} />
          </div>
          <div className='w-full justify-center flex'>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-4 py-2  hover:bg-blue-700 transition duration-300 w-1/2"
            >
              {mode === 'create' ? 'Create Product' : 'Update Product'}
            </button>
          </div>
        </div>

        {/* Right Section: Images */}
        {mode === 'edit' && <div className="w-1/2 p-6">
          <h3 className="text-lg font-semibold mb-4">Images</h3>
          {[
            {
              label: 'CoverImage',
              existingImage: existingCoverImage,
              setExistingImage: setExistingCoverImage,
              existingImageId: existingCoverImageId,
              file: coverImage,
              setFile: setCoverImage,
            },
            {
              label: 'DetailImage1',
              existingImage: existingImageDetail1,
              setExistingImage: setExistingImageDetail1,
              existingImageId: existingImageDetail1Id,
              file: imageDetail1,
              setFile: setImageDetail1,
            },
            {
              label: 'DetailImage2',
              existingImage: existingImageDetail2,
              setExistingImage: setExistingImageDetail2,
              existingImageId:existingImageDetail2Id,
              file: imageDetail2,
              setFile: setImageDetail2,
            },
          ].map(({ label, existingImage, setExistingImage, existingImageId, file, setFile }, index) => (
            <div key={index} className="flex flex-col mb-4">
              <label className="font-medium text-gray-600">{label}:</label>
              {existingImage ? (
                <>
                  <div className="mb-2">
                    <Image src={existingImage} alt={label} width={128} height={128} />
                  </div>
                  <button
                    type="button"
                    onClick={()=> handleDeleteImage(existingImageId!,label)}
                    className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setFile(selectedFile);
                    }}
                  />
                  {file && (
                    <button
                      type="button"
                      onClick={() =>
                        handleUploadImage(file, label, productId!, setExistingImage, setFile)
                      }
                      className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition duration-300 mt-2"
                    >
                      Upload
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>}
      </div>
      {message && <p className="text-center mt-4 font-medium text-blue-600">{message}</p>}
    </form>
  );
};

export default ProductForm;
