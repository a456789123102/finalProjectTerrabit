import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllcategory } from '@/app/apis/category';

const CategorySelect = ({ setCategory, isMulti, selectedCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultOptions, setDefaultOptions] = useState([]);

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

        // ตั้งค่า default options หลังจาก categories ถูกโหลด
        if (selectedCategories.length > 0) {
          const mappedSelected = selectedCategories.map((id) => {
            const category = formattedCategories.find((cat) => cat.value === id);
            return category ? { value: category.value, label: category.label } : null;
          }).filter(Boolean); // กรองค่าที่เป็น null ออก
          setDefaultOptions(mappedSelected);
        }
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
        isDisabled={isLoading}
        isClearable={true}
        isSearchable={true}
        onChange={handleChange}
        placeholder={isLoading ? "Loading categories..." : "Select Category"}
        value={defaultOptions} // ใช้ value แทน defaultValue
      />
    </div>
  );
};

export default CategorySelect;
