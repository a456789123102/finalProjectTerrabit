import React, { useEffect, useState } from 'react';
import { fetchRelatedProducts } from '../../../apis/product';
import ProductCard from './productCard';

function RelatedProductSlide({ categories, name, productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // สำหรับแสดงสถานะการโหลด

  const fetchProductList = async () => {
    try {
      setLoading(true); // เริ่มการโหลด
      console.log("categories:", categories);
console.log("name:", name);
console.log("productId:", productId);
      const products = await fetchRelatedProducts(categories, name, productId);
      setRelatedProducts(products.relatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false); // จบการโหลด
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [categories, name, productId]); // ดึงข้อมูลเมื่อ props เปลี่ยน

  return (
    <div className="relative w-full overflow-hidden"> {/* ✅ จำกัดการแสดงผล */}
      <div className="flex flex-row h-full overflow-x-auto scrollbar-hide whitespace-nowrap"> {/* ✅ เลื่อนซ้าย-ขวาได้ */}
        {loading ? (
          <div className="text-center w-full">Loading related products...</div>
        ) : relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((product) => (  // ✅ ลดจำนวนที่แสดง
            <div key={product.id} className="mx-2 w-1/4 min-w-[250px]">
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
