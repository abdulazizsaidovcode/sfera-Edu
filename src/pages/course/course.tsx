import React, { useEffect, useState } from "react";
import { useLessonONe, useLessonTask } from "@/context/logic/state-managment/module";
import VideoPlayer from "@/components/lesson/lessonVideo";
import { getLessonOneTask } from "@/context/logic/course";
import axios from "axios"; // Import axios for handling file upload

const Course = () => {
  const { lessonOneSave } = useLessonONe();
  const { lessonTaskSave, setLessonTaskSave } = useLessonTask();

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  useEffect(() => {
    const id = lessonOneSave?.id;
    if (id) {
      getLessonOneTask(id, setLessonTaskSave);
    }
  }, [lessonOneSave, setLessonTaskSave]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Iltimos, fayl tanlang.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Replace with your actual file upload API endpoint
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Fayl yuklandi muvaffaqiyatli!");
      console.log("Uploaded File:", response.data);
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadStatus("Faylni yuklashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="hs-accordion-group">
      {/* Video Player Component */}
      <VideoPlayer videoId={lessonOneSave?.videoLink || ""} />
      <div className="bg-[#6A9C89] shadow-xl p-3 mt-2 rounded-xl">
        <h2 className="text-xl mb-2">Dars mavzusi :
          <span className="text-[#a21caf] text-xl font-bold">
            {lessonOneSave?.name || "Darslikni tanlang "}
          </span>
        </h2>
        <h2 className="font-bold mb-2 text-lg">Mavzu yuzasidan izoh :
          <span className="text-[#a21caf] text-xl font-bold">
            {lessonOneSave?.description || "Lesson Description"}
          </span>
        </h2>
        <h2 className="font-bold mb-2 text-lg">Davomiylik vaqti :
          <span className="text-[#a21caf] text-xl font-bold">
            {lessonOneSave?.videoTime || "Lesson Duration"}
          </span> minut
        </h2>
        <p className="font-bold text-[#7c2d12]">Mavzu yuzasidan savol va topshiriqlar</p>

        {/* Display lesson task details if available */}
        {lessonTaskSave ? (
          <>
            {lessonTaskSave?.map((task: any, index: number) => (
              <div key={index} className="mb-4 bg-gray-600 p-3 border-2 border-gray-900 rounded-xl">
                <p>Savol : {task.name || "Task Name"}
                <p>Savolga izoh : {task.description || "Task Description"}</p>
                  <label className="block mb-2 font-bold">{task.name} savoliga javob bering</label>
                  <input type="file" onChange={handleFileChange} className="mb-2" />
                  {uploadStatus && <p className="mt-2 text-red-500">{uploadStatus}</p>}
                </p>
                
              </div>
            ))}
          </>
        ) : (
          <p>Topshiriqlar yuklanmoqda...</p> // Show a loading message or placeholder if data isn't available
        )}

        {/* File Upload Section */}
        <div className="mt-4">

        </div>
      </div>
    </div>
  );
};

export default Course;
