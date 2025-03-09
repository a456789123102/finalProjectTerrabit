import React, { useCallback, useEffect, useState } from 'react';
import { fetchRelatedProducts } from '../../../apis/product';
import ProductCard from './productCard';

interface RelatedProductSlideProps {
  categories: number[]; 
  name: string;
  productId: number;
}

const RelatedProductSlide: React.FC<RelatedProductSlideProps> = ({ categories, name, productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // สำหรับแสดงสถานะการโหลด

  const fetchProductList = useCallback(async () => {
    try {
      setLoading(true); 
      const products = await fetchRelatedProducts(categories, name, productId);
      setRelatedProducts(products.relatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false); 
    }
  }, [categories, name, productId]); 

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]); 

  return (
    <div className="relative w-full overflow-hidden"> 
      <div className="flex flex-row h-full overflow-x-auto scrollbar-hide whitespace-nowrap"> 
        {loading ? (
          <div className="text-center w-full">Loading related products...</div>
        ) : relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((product) => ( 
            <div key={(product as { id: number }).id} className="mx-2 w-1/4 min-w-[250px]">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center w-full">No related products found.</div>
        )}
      </div>
    </div>
  );
  
}

export default RelatedProductSlide;
