'use client'
import { useState } from 'react';
import { createProduct } from '../../../apis/product'; 
import Text from '../../../components/text';


const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(''); // รอรับค่าหมวดหมู่จาก input เป็น string
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบว่าข้อมูลครบถ้วน
    if (!name || !price || !quantity || !description || !categories) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const categoriesArray = categories.split(',').map((cat) => parseInt(cat.trim()));
      const response = await createProduct(name, price, quantity, description, categoriesArray);
    
      setMessage(response.message);
    } catch (error) {
      setMessage('Error creating product');
      console.error(error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-[#FCFAEE]'>
        <div className='bg-[#5C8374] p-5 flex justify-center flex-col items-center'>
        <Text >
      <h1>Create New Product</h1>
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
          <label>Categories (comma separated IDs):</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Product</button>
      </form>

      {message && <p>{message}</p>}
    </Text>
    </div>
    </div>
  );
};

export default CreateProductPage;
