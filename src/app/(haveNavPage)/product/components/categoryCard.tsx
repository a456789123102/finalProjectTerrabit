import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllcategory } from '@/app/apis/category';

const CategorySelect = ({ setCategory, isMulti, selectedCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (selectedOption) => {
    const selectedValues = isMulti
      ? selectedOption ? selectedOption.map(option => option.value) : []
      : selectedOption ? selectedOption.value : '';
    setCategory(selectedValues);
  };

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
        defaultValue={selectedCategories.map(id => ({ value: id, label: categories.find(cat => cat.value === id)?.label }))}
      />
    </div>
  );
};

export default CategorySelect;
