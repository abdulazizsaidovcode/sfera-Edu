import React, { useState, useEffect } from 'react';

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');

    // Ensure it only includes the correct number of digits (Uzbek phone number: 12 digits)
    if (cleaned.length > 12) {
        cleaned = cleaned.slice(0, 12);
    }

    // Format the number
    let formatted = '+998';
    if (cleaned.length > 3) {
        formatted += ` (${cleaned.slice(3, 5)})`;
    }
    if (cleaned.length > 5) {
        formatted += ` ${cleaned.slice(5, 8)}`;
    }
    if (cleaned.length > 8) {
        formatted += `-${cleaned.slice(8, 10)}`;
    }
    if (cleaned.length > 10) {
        formatted += `-${cleaned.slice(10, 12)}`;
    }

    return formatted;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, placeholder }) => {
    const [internalValue, setInternalValue] = useState(formatPhoneNumber(value));

    useEffect(() => {
        // Update internalValue when value prop changes
        setInternalValue(formatPhoneNumber(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Remove non-numeric characters for the actual value
        const rawValue = inputValue.replace(/\D/g, '');

        // Limit the raw value to 11 digits (after the +998 code)
        if (rawValue.length > 12) return;

        // Set the internal value (formatted) for display purposes
        const formattedValue = formatPhoneNumber(rawValue);
        setInternalValue(formattedValue);

        // Remove '+998' for storage
        onChange(rawValue);
    };

    return (
        <input
            type="text"
            value={internalValue}
            onChange={handleChange}
            placeholder={placeholder || "+998 (99) 123-45-67"}
            className="login__input bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
        />
    );
};

export default PhoneInput;
