import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllcategory } from '@/app/apis/category';

const CategorySelect = ({ setCategory, isMulti, selectedCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]); // 🔹 เก็บค่า `{ value, label }` ที่ถูกต้อง

  // Fetch categories เมื่อ Component โหลด
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
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && selectedCategories.length > 0) {
      const matchedCategories = categories.filter((cat) => selectedCategories.includes(cat.value));
      setSelectedOptions(matchedCategories);
    }
  }, [categories, selectedCategories]);

  const handleChange = (selectedOption) => {
    const selectedValues = isMulti
      ? selectedOption ? selectedOption.map(option => option.value) : []
      : selectedOption ? selectedOption.value : '';

    setCategory(selectedValues);
    setSelectedOptions(selectedOption); // 🔹 อัปเดต state ให้ตรงกับ React-Select
  };


  return (
<div className='text-sm overflow-visible'>
  <Select
    classNamePrefix="select"
    options={categories}
    isMulti={isMulti}
    isDisabled={isLoading}
    isClearable={true}
    isSearchable={true}
    onChange={handleChange}
    placeholder={isLoading ? "Loading categories..." : "Select Category"}
    value={selectedOptions}
    menuPortalTarget={document.body} // แก้ปัญหา dropdown ถูกตัด
    menuPosition="fixed" // ให้ dropdown อยู่บนสุด
    styles={{
      menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ปรับ z-index
    }}
  />
</div>

  );
};

export default CategorySelect;
