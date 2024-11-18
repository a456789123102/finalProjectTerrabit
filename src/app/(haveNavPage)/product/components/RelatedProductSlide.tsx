import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../apis/product';
import ProductCard from './productCard';

function RelatedProductSlide({ category, name, productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProductList = async () => {
    try {
      const products = await fetchProducts(null, category);

      const sameCategoryProducts = products
        .filter((product) => product.id !== productId)
        .map((product) => ({
          ...product,
          distance: calculateLevenshteinDistance(name, product.name),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4);

      setRelatedProducts(sameCategoryProducts);
      console.log({ message: 'Successfully fetched related products' }, sameCategoryProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  useEffect(() => {
    if (category && name) {
      fetchProductList();
    }
  }, [category, name]);

  function calculateLevenshteinDistance(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return matrix[a.length][b.length];
  }

  return (
    <div className="flex flex-row h-full">
      {relatedProducts.map((product) => (
        <div key={product.id} className="mx-2 w-1/4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default RelatedProductSlide;
