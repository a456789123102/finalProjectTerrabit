'use client';
import { useState } from 'react';
import CategorySelect from '../components/categoryCard';

interface ProductFormProps {
  onSubmit: (productData: any) => Promise<void>;
}

const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<number[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !quantity || !description || categories.length === 0) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const productData = { name, price, quantity, description, categories };
      
      // ส่งข้อมูลสินค้า
      const response = await onSubmit(productData);

      // แสดงผล response ที่ได้รับ
      setMessage(`Product created: ${response.product.name} with ID: ${response.product.id}`);
    } catch (error) {
      setMessage('Error saving product');
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label>Categories</label>
        <CategorySelect setCategory={setCategories} isMulti={true} />
      </div>

      <button type="submit">Create Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ProductForm;
