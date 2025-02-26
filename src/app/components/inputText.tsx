import React from 'react';
import Text from './text'; 


type InputTextProps = {
    label: string,
    type?: "text" | "password",
    value: string;
    onChange: (value: string) => void; 
};

function InputText({ label, type = "text", value, onChange }: InputTextProps) {
  return (
    <div className='flex flex-col my-1 font-pixelify'>
      <Text className='mb-1 text-sm'>{label}</Text>
      <input
        className='bg-white mb-1 border-gray-700 border h-9 px-4 hover:border-yellow-500'
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        autoComplete='off'
      />
    </div>
  );
}

export default InputText;
