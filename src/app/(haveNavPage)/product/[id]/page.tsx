'use client'
import { useUserStore } from "@/store/zustand";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../../apis/product';
import { getReviewsById } from '../.././../apis/review';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/app/components/starRating';
import RelatedProductSlide from "../components/RelatedProductSlide"
import { createCart } from "@/app/apis/carts"
import { useRouter } from 'next/navigation';
import ImageSwiper from "../components/imageSwiper";


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
  category:{
    name: string;
  }
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
    userName: string;
  comments: string;
}

const ProductDetail = () => {
  const { username } = useUserStore();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [AddQuantity, setAddQuantity] = useState(1);
  const router = useRouter();

  const CategoryItem = ({ name, id }: { name: string; id: number }) => {
    return <Link href={`/product/category/${id}`} className='p-2 mx-2 bg-lime-950 justify-center hover:text-amber-300 hover:underline'>{name}</Link>;
  };
  const handleIncreaseClick = () => {
    if (product && AddQuantity < product.quantity) {
      setAddQuantity(AddQuantity + 1);
    }
  };
  const handleDecreaseClick = () => {
    if (AddQuantity > 1) {
      setAddQuantity(AddQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!username) {
      alert("You must be logged in to add to cart");
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    if (!product || !product.finalPrice || AddQuantity <= 0) {
      alert("Product details are incomplete or quantity is invalid");
      return;
    }
    try {
      await createCart(product.id, AddQuantity, product.finalPrice * AddQuantity);
      router.push(`/cart/myCart`)
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again later.");
    }
  }

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
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const reviewData = await getReviewsById(Number(id));
          console.log('Review Data:', reviewData);
          setReviews(reviewData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchReviews();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col items-center justify-center  text-white p-8 '>
      {product ? (
        <div className='flex flex-col items-center justify-center w-4/6'>
          <div className='flex flex-col md:flex-row items-start justify-between w-full'>
            <div className='flex flex-col gap-4 w-1/2 border'>
              {product.Image && product.Image.length > 0 ?
                <ImageSwiper images={product.Image} />
                : (
                  <p>No image available</p>
                )}
            </div>
            {/* Right: Product Details */}
            <div className='flex flex-col ml-8 w-1/2 pr-8'>
              <div className="text-4xl font-bold uppercase tracking-wider mb-6">{product.name}</div>
              <div>
                {product.discount !== 0 && product.discount !== null && (<div className='flex flex-row '> <div className="text-3xl text-gray-400 mb-2 line-through">
                  ฿ {product.price}</div>
                  <div className='ml-2 text-red-400'>-{product.discount}%</div>
                </div>)}
              </div>
              <div className="text-4xl font-semibold mb-6">
                ฿ {product.finalPrice}</div>
              <div className='text-xl'>Left : {product.quantity}</div>
              <div className='flex items-center gap-4 mb-6'>
                <span className='text-xl'>Quantity:</span>
                <div className='bg-white text-black text-[0.8rem]'>
                  <button className="px-4 py-2 border" onClick={handleDecreaseClick}>-</button>
                  <span className='text-xl px-4 py-2'>{AddQuantity}</span>
                  <button className="px-4 py-2  border" onClick={handleIncreaseClick}>+</button>
                </div>

              </div>
              <div className='pb-5'>
                {product.ProductCategory && product.ProductCategory.map((productCategory) => (
                  <CategoryItem key={productCategory.categoryId} name={productCategory.category.name} id={productCategory.categoryId} />
                ))}
              </div>
              <div>
                <button
                  className=" relative bg-[#141313] text-white py-4 px-8 text-xl w-full hover:text-yellow-100 before:content-[''] before:absolute before:top-0 before:right-[-20px] before:w-8 before:h-full before:bg-[#141313] before:skew-x-[-20deg]"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className='mt-4 my-2 bg-[#1C1C1C] text-white w-full p-5'>
            <div className="text-2xl">Description</div>
            <div>{product.description}</div>
          </div>
          <div className='my-2 bg-[#1C1C1C] text-white min-w-full p-3 '>
            <div>
              <div className="text-2xl">Reviews(pending)</div>
              <div className='p-3'>
                {reviews.map((review: Review) => (
                  <div key={review.id} className='p-3 my-2 bg-white border'>
                    <div className='font-semibold'>{review.userName}</div>
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
          <div className='my-2 bg-[#1C1C1C] w-full p-5'>
            <div className="text-2xl">
              <div className='my-2 pb-2'>Related Product</div>
              <div className='flex justify-between items-center '>
                <RelatedProductSlide
                  categories={product?.ProductCategory.map((cat) => cat.categoryId)}
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
