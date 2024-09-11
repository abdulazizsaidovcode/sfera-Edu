import { file_upload } from '@/context/api/url';
import axios from 'axios';
import { useState } from 'react';

// Faylni yuklash funksiyasi
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const url = file_upload;
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(`File uploaded successfully. Server response:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; 
  }
};

// AccordionLesson komponenti
interface AccordionItemProps {
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionLesson: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen = false,
  onToggle,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      console.log(`File selected: ${e.target.files[0].name}`);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      console.log(`Starting upload for file: ${selectedFile.name}`); 
      try {
        const result = await uploadFile(selectedFile);
        console.log("File uploaded successfully:", result);
        setUploadedFileName(selectedFile.name);
        setResponseData(result);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected for upload.");
    }
  };

  console.log("Backend" ,responseData);
  

  return (
    <div className="mb-4">
      <button
        className="w-full text-left p-2 bg-[#6A9C89] text-white rounded-lg"
        onClick={() => {
          if (onToggle) onToggle();
          if (isOpen && selectedFile) {
            handleFileUpload();
          }
        }}
      >
        <h4 className="text-lg font-bold">{title}</h4>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="mb-4">{content}</p>
          <div className="mb-4">
            <label
              htmlFor="fileInput"
              className="bg-[#6A9C89] p-2 rounded-lg cursor-pointer"
            >
              Choose File
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="block mt-1 rounded-full shadow-lg bg-[#6A9C89] text-white"
            />
          </div>
          {selectedFile && (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
          {uploadedFileName && (
            <div className="mt-4">
              <p>Uploaded file: {uploadedFileName}</p>
            </div>
          )}
          {responseData && (
            <div className="mt-4">
              <pre>Backend response: {JSON.stringify(responseData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionLesson;
