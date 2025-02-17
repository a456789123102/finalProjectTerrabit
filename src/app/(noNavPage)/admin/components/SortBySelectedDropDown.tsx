import React from "react";
import Select from "react-select";

interface SortOption {
  orderBy: string;
  orderWith: string;
  label: string;
}

interface SortBySelectedDropDownProps {
  data: SortOption[];
  orderBy: string;
  setOrderBy: (value: string) => void;
  orderWith: string;
  setOrderWith: (value: string) => void;
}

const SortBySelectedDropDown: React.FC<SortBySelectedDropDownProps> = ({
  data,
  orderBy,
  setOrderBy,
  orderWith,
  setOrderWith,
}) => {
  const handleChange = (selectedOption: SortOption | null) => {
    if (selectedOption) {
      setOrderBy(selectedOption.orderBy);
      setOrderWith(selectedOption.orderWith);
    }
  };

  return (
    <Select
      placeholder="Select sorting..."
      options={data}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => `${e.orderBy}-${e.orderWith}`}
      value={data.find(
        (option) => option.orderBy === orderBy && option.orderWith === orderWith
      )}
      onChange={handleChange}
      className="w-36 text-black text-[0.8rem]"
      classNames={{
        option: ({ isSelected }) =>
          isSelected
            ? "bg-blue-500 text-white p-2 cursor-pointer"
            : "p-2 hover:bg-gray-100 cursor-pointer",
      }}
    />
  );
};

export default SortBySelectedDropDown;
