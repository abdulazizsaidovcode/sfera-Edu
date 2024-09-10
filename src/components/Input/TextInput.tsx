import React from 'react';

interface EmailInputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<EmailInputProps> = ({ id = "email", placeholder = "name", value, onChange }) => {
  return (
    <input
      type="email"
      id={id}
      value={value}
      onChange={onChange}
      className="login__input bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
      placeholder={placeholder}
    />
  );
};

export default TextInput;
