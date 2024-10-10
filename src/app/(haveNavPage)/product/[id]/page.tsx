'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { getProductById } from '../../../apis/product';
import Image from 'next/image';

type Product = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  ProductCategory: Category[]; 
  Image: ProductImage[];  
};

type Category = {
  categoryId: number;
  name: string;
};

type ProductImage = {
  id: number;
  name: string;
  imageUrl: string;
};

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Component สำหรับแสดงหมวดหมู่สินค้า
  const CategoryItem = ({ name }: { name: string }) => {
    return <div>{name}</div>;
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(Number(id));
          setProduct(productData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {product ? (
        <div className='bg-[#E2F1E7] p-4 gap-3'>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.quantity}</div>
          <div>{product.description}</div>
          <div>
            {product.ProductCategory && product.ProductCategory.map((productCategory) => (
              <CategoryItem key={productCategory.categoryId} name={productCategory.name} />
            ))}
          </div>
          <div className="image-gallery grid grid-cols-3 gap-4">
            {product.Image && product.Image.length > 0 ? (
              product.Image.map((img, index) => (
                <Image
                  key={index}
                  src={img.imageUrl}
                  alt={img.name}
                  width={200}
                  height={200}
                  className="object-cover rounded-lg border border-gray-300"
                />
              ))
            ) : (
              <p>No image available</p>
            )}
          </div>

        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
