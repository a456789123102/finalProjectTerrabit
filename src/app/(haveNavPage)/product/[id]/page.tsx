'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../../apis/product';
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);


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

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prevKey => prevKey + 1); // เปลี่ยนค่า refreshKey เพื่อ trigger useEffect
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='h-screen flex flex-col items-center justify-center '>
      {product ? (
        <div className='flex flex-col items-center justify-center  '>
          <div className=' p-4 gap-3 bg-[#E2F1E7] flex flex-row'>

            <div className="grid grid-cols-2 grid-rows-2 gap-2">
              {product.Image && product.Image.length > 0 ? (
                product.Image.map((img, index) => (
                  <Image
                    key={index}
                    src={img.imageUrl}  // ใช้ imageUrl ที่อยู่ในฟิลด์ Image
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
              <div>Price :   {product.price}</div>
              <div>quantity :   {product.quantity}</div>

              <div>
                {product.ProductCategory && product.ProductCategory.map((productCategory) => (
                  <CategoryItem key={productCategory.categoryId} name={productCategory.name} />
                ))}
              </div>
              <div className=''>
                <button onClick={handleRefresh} className="mt-4 px-4 py-2 mr-4 bg-green-500 text-white rounded hover:bg-fuchsia-400">Refresh</button>
                <Link href={`/product/${id}/edit`} className='mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-green-400'> Edit</Link>
              </div>

            </div>

          </div>
          <div className='my-3 bg-[#E2F1E7] min-w-full p-3 text-red-700'>
            <div className="text-2xl">description</div>
            <div>{product.description}</div>
          </div>

          <div className='my-3 bg-[#E2F1E7] min-w-full p-3 text-red-700'>
            <div className="text-2xl">Reviews(pending)</div>
            <div className="bg-[#cddfd3] mt-2">
              <div>Ratings: 4/5</div>
              <div>Comments: Wow this produst is Awsome</div>
            </div>
            <div className="bg-[#cddfd3] mt-2">
              <div>User: a**as</div>
              <div>Ratings: 4/5</div>
              <div>Comments: Wow this produst is Awsome2</div>
            </div>
            <div className="bg-[#cddfd3] mt-2">
              <div>User: a**as</div>
              <div>Ratings: 4/5</div>
              <div>Comments: Wow this produst is Awsome3</div>
            </div>

          </div>

          <div className='my-3 bg-[#E2F1E7] min-w-full p-3'>
            <div className="text-2xl">Related product(pending)</div>
            <div>เอาเกมใน cat เดียวกันมาแสดง</div>
          </div>


        </div>


      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
