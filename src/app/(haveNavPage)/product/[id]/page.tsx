'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ใช้ useParams แทน useRouter
import { getProductById } from '../../../apis/product'; 

const ProductDetail = () => {
  const { id } = useParams(); // ดึง id จาก URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(Number(id));
          setProduct(productData);
          console.log(productData)
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
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
