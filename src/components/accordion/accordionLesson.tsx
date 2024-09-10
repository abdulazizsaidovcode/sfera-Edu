import React, { useState } from "react";

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen?: boolean; 
    onToggle?: () => void; 
}

const AccordionLesson: React.FC<AccordionItemProps> = ({ title, content, isOpen = false, onToggle }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            // Implement your file upload logic here.
            // For demonstration, we'll log the file to the console.
            console.log("File to upload:", selectedFile);
            // Example of file upload logic using FormData (adjust the URL as needed)
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            try {
                const response = await fetch('YOUR_UPLOAD_URL_HERE', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) throw new Error('Upload failed');
                console.log('File uploaded successfully');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="mb-4">
            <button
                className="w-full text-left p-2 bg-[#6A9C89] text-white rounded-lg"
                onClick={onToggle}
            >
                <h4 className="text-lg font-bold">{title}</h4>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-200 rounded-lg">
                    <p className="mb-4">{content}</p>
                    <div className="mb-4">
                        <label
                            htmlFor="fileInput"
                            className="w-[10%] bg-[#6A9C89] "
                        >
                            
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            className="block mt-1 rounded-full shadow-lg bg-[#6A9C89]"
                        />
                    </div>
                   
                </div>
            )}
        </div>
    );
};

export default AccordionLesson;
