import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  discount: number;
  quantity: number;
  ProductCategory: { categoryId: number; category: { name: string } }[];
  Image: { imageUrl: string }[];
};

const CategoryItem = ({ name, categoryId, onClick }: { name: string; categoryId: number; onClick: (id: number) => void }) => {
  return (
    <div
      className="px-2 py-1 ml-2 bg-blue-300 hover:bg-blue-400 flex justify-center rounded-md text-xs cursor-pointer"
      onClick={() => onClick(categoryId)}
    >
      {name}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const productImage =
    product.Image && product.Image.length > 0
      ? product.Image[0].imageUrl
      : 'https://lovedrinks.com/cdn-cgi/imagedelivery/lPz29URYX3W9lk2JWbxsjA/lovedrinks.com/2023/08/No-Image-Placeholder.svg_.png/w=9999';

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleCatClick = (categoryId: number) => {
    router.push(`/product/category/${categoryId}`);
  };

  return (
    <div className="border p-4  hover:bg-[#ECDFCC] flex flex-col gap-2 bg-white h-full ">
      <div className="text-[17px] font-semibold mb-2 text-black py-2 h-14 flex items-center justify-center">{product.name}</div>

      <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-lg">
        <Image
          className="object-cover w-full h-full cursor-pointer"
          src={productImage}
          alt="Cover Image"
          width={300}
          height={250}
          onClick={handleProductClick}
        />
      </div>
      
      <div>
        <div className="flex flex-row items-center min-h-14">
          <div className="text-lg font-semibold text-black">Price: {product.finalPrice} THB</div>
          {product.discount !== 0 && product.discount !== null && (
            <div className="text-red-700 mb-1 text-xs ml-2 bg-red-300 p-1 rounded-sm">
              -{product.discount * 100}%
            </div>
          )}
        </div>
        <div className="text-sm text-gray-700 mb-1">Quantity: {product.quantity}</div>
        <div className="flex flex-wrap gap-2 max-w-[220px]">
          {product.ProductCategory &&
            product.ProductCategory.map((productCategory) => (
              <CategoryItem
                key={productCategory.categoryId}
                name={productCategory.category.name}
                categoryId={productCategory.categoryId}
                onClick={handleCatClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
