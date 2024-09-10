import React, { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ value, onChange, placeholder, type, ...props }, ref) => {
  return (
    <div className="text-input-container">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        {...props}
        className="login__input bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
      />
    </div>
  );
});

TextInput.displayName = 'TextInput'; // `displayName` ni o‘rnatish zarur, bu `forwardRef` bilan ishlash uchun

export default TextInput;
