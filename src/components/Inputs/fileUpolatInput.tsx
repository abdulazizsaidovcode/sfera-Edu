// FileUpload.tsx
import React, { useState } from 'react';
import upload from '@/assets/images/upload.svg'

interface FileUploadProps {
    onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileChange(file);
        }
    };

    return (
        <div className="border-2 border-dashed border-[#126D4D] p-6 text-center rounded-lg bg-gray-100">
            <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                    <img src={upload} alt="Upload Icon" className="mb-4 w-12 h-12 " />
                    <span className="text-lg font-medium text-[#126D4D]">
                        {fileName || "Faylni yuklang yoki sudrab olib keling"}
                    </span>
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
