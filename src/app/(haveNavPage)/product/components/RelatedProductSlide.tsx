import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../../apis/product'


function RelatedProductSlide({ category, name, productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const fetchProductList = async () => {
    try {
      const products = await fetchProducts(null, category);
      const sameCategoryProducts = products.filter((product) => product.id !== productId);
      setRelatedProducts(sameCategoryProducts);
console.log({massage:'success to fetch related Product'},sameCategoryProducts);
    } catch (error) {
      console.error('Error fetching Related products:', error);
    }
  }
 useEffect(() => {
    if (category && name) {
      fetchProductList();
    }
  }, [category, name]);

  return (
    <div>
      <h2>Related Products</h2>
      {relatedProducts.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export default RelatedProductSlide;
