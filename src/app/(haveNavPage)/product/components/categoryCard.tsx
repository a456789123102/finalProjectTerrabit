'use client';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllcategory } from '@/app/apis/category';

const CategorySelect = ({ setCategory, isMulti = false }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllcategory();
        const formattedCategories = categoryData.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (selectedOption) => {
    if (isMulti) {
      const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
      setCategory(selectedValues);
      console.log(selectedValues);
    } else {
      setCategory(selectedOption ? selectedOption.value : '');
    }
    
  };

  return (
    <>
      <Select
        classNamePrefix="select"
        options={categories}
        isMulti={isMulti} // กำหนดว่าจะใช้ multiselect หรือ single select
        isDisabled={false}
        isClearable={true}
        isSearchable={true}
        onChange={handleChange} 
        placeholder="Select Category"
        isLoading={isLoading}
      />
    </>
  );
};

export default CategorySelect;
