"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { fetchProducts } from "@/app/apis/product";

function RelatedProductSlide({ category }) {
  const [product, setProduct] = useState([]);

  const fetchProductList = async () => {
    try {
      const productData = await fetchProducts(category); // ส่ง array ของ category ไปที่ fetchProducts
      setProduct(productData);
      console.log(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (category) { // ตรวจสอบแค่ category มีค่า ไม่จำเป็นต้องใช้ length
      fetchProductList();
    }
  }, [category]);

  return (
    <div className="related-product-slide">
      {product.map((e) => (
        <div key={e.id}>{e.name}</div>
      ))}
    </div>
  );
}

export default RelatedProductSlide;
