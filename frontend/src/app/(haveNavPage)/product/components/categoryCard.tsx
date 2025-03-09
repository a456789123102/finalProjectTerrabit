import React, { useState, useEffect } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { getAllcategory } from '@/app/apis/category';

type Category = {
  id: number;
  name: string;
};

type CategoryOption = {
  value: number;
  label: string;
};

interface CategorySelectProps {
  setCategory: (categories: number | number[]) => void;
  isMulti: boolean;
  selectedCategories?: number | number[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({ setCategory, isMulti, selectedCategories = [] }) => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortalTarget(document.body);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData: Category[] = await getAllcategory();
        const formattedCategories: CategoryOption[] = categoryData.map((cat) => ({
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
    if (categories.length > 0 && Array.isArray(selectedCategories) && selectedCategories.length > 0) {

      const matchedCategories = categories.filter((cat) =>
        Array.isArray(selectedCategories) ? selectedCategories.includes(cat.value) : selectedCategories === cat.value
      );
      setSelectedOptions(matchedCategories);
    }
  }, [categories, selectedCategories]);

  const handleChange = (
    selectedOption: MultiValue<CategoryOption> | SingleValue<CategoryOption>
  ) => {
    const selectedValues = isMulti
      ? (selectedOption as MultiValue<CategoryOption>).map((option) => option.value)
      : (selectedOption as SingleValue<CategoryOption>)?.value || null;

    setSelectedOptions(Array.isArray(selectedOption) ? [...selectedOption] : selectedOption ? [selectedOption] : []);

    setCategory(selectedValues as number | number[]);
  };

  return (
    <div className="text-sm overflow-visible">
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
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
};

export default CategorySelect;
