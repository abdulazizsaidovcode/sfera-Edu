import React, { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ value, onChange, placeholder, type, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Remove all characters except letters, spaces, and apostrophe
    newValue = newValue.replace(/[^a-zA-Z\s']/g, '');

    // Replace multiple spaces with a single space
    newValue = newValue.replace(/\s{2,}/g, ' ');

    // Remove spaces after apostrophe
    newValue = newValue.replace(/'\s+/g, "'");

    // Prevent apostrophe immediately after space
    newValue = newValue.replace(/\s+'/g, "'");

    // Allow only one apostrophe
    const apostropheCount = (newValue.match(/'/g) || []).length;
    if (apostropheCount > 1) {
      newValue = newValue.replace(/'(?!.*')/g, '');
    }

    // Update input value
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="text-input-container">
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        {...props}
        className="login__input bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
      />
    </div>
  );
});

TextInput.displayName = 'TextInput'; // Set displayName for forwardRef

export default TextInput;
