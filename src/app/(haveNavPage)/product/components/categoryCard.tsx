import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllcategory } from '@/app/apis/category';

const CategorySelect = ({ setCategory, isMulti, selectedCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultSelectedOptions, setDefaultSelectedOptions] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllcategory();
        const formattedCategories = categoryData.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(formattedCategories);
        console.log(`Fetched categories:`, formattedCategories);
        console.log(`Categories:`, categories);
        // Set default selected options based on selectedCategories
        const defaultOptions = formattedCategories.filter(category => selectedCategories.includes(category.value));
        setDefaultSelectedOptions(defaultOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Update default selected options when selectedCategories or categories change
  useEffect(() => {
    const defaultOptions = categories.filter(category => selectedCategories.includes(category.value));
    setDefaultSelectedOptions(defaultOptions);
    console.log(`defaultOptions:`, defaultOptions);
  }, [categories, selectedCategories]);

  const handleChange = (selectedOption) => {
    if (isMulti) {
      const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
      setCategory(selectedValues);
      console.log(`Selected values:`, selectedValues);
    } else {
      setCategory(selectedOption ? selectedOption.value : '');
    }
  };
  console.log(`Selected Categories:`, selectedCategories);
  return (
    <div className='text-sm'>
      <Select
        classNamePrefix="select"
        options={categories}
        isMulti={isMulti}
        isDisabled={false}
        isClearable={true}
        isSearchable={true}
        onChange={handleChange}
        placeholder="Select Category"
        isLoading={isLoading}
        defaultValue={selectedCategories.map(id => ({ value: id, label: categories.find(cat => cat.value === id)?.label }))} // สร้าง defaultValue ใหม่
      />
    </div>
  );
};

export default CategorySelect;
