'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../../apis/product';
import { getReviewsById } from '../.././../apis/review';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/app/components/starRating';
import RelatedProductSlide from "../components/RelatedProductSlide"


type Product = {
  id: number,
  name: string;
  price: number;
  finalPrice: number;
  discount: number;
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
    }
  }, [id]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prevKey => prevKey + 1); // เปลี่ยนค่า refreshKey เพื่อ trigger useEffect
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col items-center justify-center  text-white p-8 '>
      {product ? (
        <div className='flex flex-col items-center justify-center w-4/6'>
          <div className='flex flex-col md:flex-row items-start justify-between w-full max-w-6xl'> {/* เปลี่ยน w-4/6 เป็น w-full */}
            {/* Left: Image Gallery */}
            <div className='flex flex-col gap-4'>
              {product.Image && product.Image.length > 0 ? (
                product.Image.map((img, index) => (
                  <div key={index} className={`border border-gray-700 ${index === 0 ? 'w-full' : 'w-24 h-24'} rounded-md`}>
                    <Image
                      src={img.imageUrl}
                      alt={img.name}
                      layout="responsive"
                      width={300}
                      height={400}
                      className="object-cover rounded-md"
                    />
                  </div>
                ))
              ) : (
                <p>No image available</p>
              )}
            </div>
            {/* Right: Product Details */}
            <div className='flex flex-col ml-8'>
              <div className="text-4xl font-bold uppercase tracking-wider mb-6">{product.name}</div>
              <div>
                {product.discount !== 0 && product.discount !== null && (<div className='flex flex-row '> <div className="text-3xl text-gray-400 mb-2 line-through">
                  ฿ {product.price}</div>
                  <div className='ml-2 text-red-400'>-{product.discount * 100}%</div>
                </div>)}
              </div>
              <div className="text-4xl font-semibold mb-6">
                ฿ {product.finalPrice}</div>
              <div className='text-xl'>Left : {product.quantity}</div>
              <div className='flex items-center gap-4 mb-6'>
                <span className='text-xl'>Quantity:</span>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg">-</button>
                <span className='text-xl'>{product.quantity}</span>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg">+</button>

              </div>
              <div>
                {product.ProductCategory && product.ProductCategory.map((productCategory) => (
                  <CategoryItem key={productCategory.categoryId} name={productCategory.category.name} />
                ))}
              </div>
              <div className=''>
                <button className="bg-[#1C1C1C] text-white py-4 px-8 mb-6 rounded-lg text-xl hover:bg-gray-700 w-full">
                  ADD TO CART
                </button>
                <Link href={`/product/${id}/edit`} className='mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-green-400'>
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className='my-2 bg-[#1C1C1C] text-white min-w-full p-5'>
            <div className="text-2xl">Description</div>
            <div>{product.description}</div>
          </div>
          <div className='my-2 bg-[#1C1C1C] text-white min-w-full p-3 '>
            <div>
              <div className="text-2xl">Reviews(pending)</div>
              <div className='p-3 '>
                {reviews.map((review: Review) => (
                  <div key={review.id} className='p-3 my-2 bg-white border'>
                    <div className='font-semibold'>{review.user.username}</div>
                    <div className='flex flex-row'>
                      <StarRating rating={review.rating} />
                    </div>
                    <div className='text-slate-800'>{review.comments}</div>
                  </div>
                ))}
              </div>

            </div>
            {/* Reviews */}
          </div>
          <div className='my-2 bg-[#1C1C1C] min-w-full p-5'>
            <div className="text-2xl">
              <div className='my-2 pb-2'>Related Product</div>
<div className='flex justify-between items-center '>
<RelatedProductSlide
 category={product.ProductCategory.map(cat => cat.categoryId)}
 name={product.name}
 productId={product.id}
/>
</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
