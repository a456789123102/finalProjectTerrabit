'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../../apis/product';
import {getReviewsById} from '../.././../apis/review';
import Image from 'next/image';
import Link from 'next/link';


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
interface Review {
  id: number;
  rating: number;
  user: {
    username: string;
  };
  comments: string;
}
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [reviews, serReviews] = useState([]);


  const CategoryItem = ({ name }: { name: string }) => {
    return <div>{name}</div>;
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(Number(id));
          console.log('Product Data:', productData);  // พิมพ์ข้อมูลที่ได้รับมาจาก API
          setProduct(productData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, refreshKey]);

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const reviewData = await getReviewsById(Number(id));
          console.log('Review Data:', reviewData);  
          serReviews(reviewData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchReviews();
  }},[id]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prevKey => prevKey + 1); // เปลี่ยนค่า refreshKey เพื่อ trigger useEffect
  };

  if (loading) return <p>Loading...</p>;

  return (
<div className='h-screen flex flex-col items-center justify-center '>
  {product ? (
    <div className='flex flex-col items-center justify-center w-4/6'>
      <div className='p-4 gap-3 bg-[#e2f1f1] flex flex-row w-full'> {/* เปลี่ยน w-4/6 เป็น w-full */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
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
        <div className='flex flex-col justify-evenly'>
          <div>{product.name}</div>
          <div>Price : {product.price}</div>
          <div>Quantity : {product.quantity}</div>
          <div>
            {product.ProductCategory && product.ProductCategory.map((productCategory) => (
              <CategoryItem key={productCategory.categoryId} name={productCategory.category.name} />
            ))}
          </div>
          <div className=''>
            <button onClick={handleRefresh} className="mt-4 px-4 py-2 mr-4 bg-green-500 text-white rounded hover:bg-fuchsia-400">
              Refresh
            </button>
            <Link href={`/product/${id}/edit`} className='mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-green-400'>
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className='my-1 bg-[#E2F1E7] min-w-full p-5'>
        <div className="text-2xl">Description</div>
        <div>{product.description}</div>
      </div>
      <div className='my-1 bg-[#E2F1E7] min-w-full p-3 '>
        <div>
        <div className="text-2xl">Reviews(pending)</div>
<div className='p-3 '>
  {reviews.map((review:Review) => (
    <div key={review.id} className='p-3 my-2 bg-[#8779c7]'>
      <div>{review.user.username}</div>
      <div>{review.rating}</div>
      <div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-yellow-500">
    <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
  </svg>
</div>

      <div>{review.comments}</div>
    </div>
  ))}
</div>

        </div>
        {/* Reviews */}
      </div>
      <div className='my-1 bg-[#E2F1E7] min-w-full p-3'>
        <div className="text-2xl">Related Products (pending)</div>
      </div>
    </div>
  ) : (
    <p>Product not found</p>
  )}
</div>
  );
};

export default ProductDetail;
