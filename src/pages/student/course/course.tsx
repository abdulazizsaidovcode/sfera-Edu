import React, { useEffect, useState } from "react";
import { useLessonONe, useLessonTask } from "@/context/logic/state-managment/module";
import VideoPlayer from "@/components/lesson/lessonVideo";
import { getLessonOneTask } from "@/context/logic/course";
import axios from "axios";
import { base_url, get_file, file_upload } from "@/context/api/url";
import ShinyButton from "@/components/magicui/shiny-button";
import Modal from "@/components/moduleSaidbar/modulTeacher";
import { checkImgUpload } from "@/context/logic/global_functions/fileUpolatOptions";
import { config } from "@/context/api/token";
import toast from "react-hot-toast";

const Course = () => {
  const { lessonOneSave } = useLessonONe();
  const { lessonTaskSave, setLessonTaskSave } = useLessonTask();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solution, setSolution] = useState<string>(''); // Solution uchun state

  const closeMOdal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    const id = lessonOneSave?.id;
    if (id) {
      getLessonOneTask(id, setLessonTaskSave);
    }
  }, [lessonOneSave, setLessonTaskSave]);

  // Fayl tanlanganda chaqiriladigan funksiya
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  // Faylni yuklash funksiyasi
  const uploadFile = async () => {
    if (selectedFile) {
      const uploadedFileId = await checkImgUpload(selectedFile, setFileId);
      if (uploadedFileId) {
        setUploadStatus("Fayl yuklandi!");
        return uploadedFileId;
      } else {
        setUploadStatus("Fayl yuklashda xatolik yuz berdi.");
        return null;
      }
    } else {
      setUploadStatus("Fayl tanlanmagan.");
      return null;
    }
  };

  // Yangi taskni yuklash funksiyasi
  const upLoadLesson = async () => {
    if (!selectedFile) {
      toast.error("Avval faylni tanlang.");
      return;
    }

    // Faylni yuklab, keyin topshiriqni yuklaymiz
    const uploadedFileId = await uploadFile();

    if (uploadedFileId) {
      const data = {
        taskId: lessonOneSave?.id,
        solution: solution || "Javob yo'q",
        fileId: uploadedFileId, // Fayl yuklab bo'lgandan keyin fileId qo'yamiz
      };

      try {
        const response = await axios.post(`${base_url}homework/save`, data, config);
        console.log(response.data);
        toast.success("Vazifa muvaffaqiyatli yuklandi");
        closeMOdal(); // Modalni yopish
      } catch (error) {
        console.error("Vazifa yuklashda xatolik:", error);
        toast.error("Vazifa yuklashda xatolik yuz berdi.");
      }
    } else {
      toast.success("Avval faylni yuklang.");
    }
  };

  return (
    <div className="hs-accordion-group">
      <VideoPlayer videoId={lessonOneSave?.videoLink || ""} />
      <div className="bg-[#6A9C89] shadow-xl p-3 mt-2 rounded-xl">
        <h2 className="text-xl mb-2">Dars mavzusi :
          <span className="text-green-900 text-xl font-bold">
            {lessonOneSave?.name || "Darslikni tanlang "}
          </span>
        </h2>
        <h2 className="font-bold mb-2 text-lg">Mavzu yuzasidan izoh :
          <span className="text-green-900 text-xl font-bold">
            {lessonOneSave?.description || "Lesson Description"}
          </span>
        </h2>
        <h2 className="font-bold mb-2 text-lg">Davomiylik vaqti :
          <span className="text-green-900 text-xl font-bold">
            {lessonOneSave?.videoTime || "Lesson Duration"}
          </span> minut
        </h2>
        <p className="font-bold text-black mb-2">Mavzu yuzasidan savol va topshiriqlar</p>

        {lessonTaskSave ? (
          <>
            {lessonTaskSave?.map((task: any, index: number) => (
              <div key={index} className="mb-4 bg-gray-600 p-3  border-gray-900 rounded-xl">
                <p>Kim qo'shgan bo'lsa o'sha  crud: {task.name || "Task Name"}</p>
                <p>Savolga izoh: {task.description || "Task Description"}</p>

                {task.fileId ? (
                  <div>
                    <p>Dars davomida ishlatilgan qo'llanmani yuklab olish :
                      <a
                        href={`${get_file}${task.fileId}`}
                        className="mb-4 bg-gray-600 p-3 border-2  rounded-xl"
                        download
                      >
                        Yuklab olish
                      </a>
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block mb-2 font-bold">{task.name} savoliga javob bering</label>
                    <input type="file" onChange={handleFileChange} className="mb-2" />
                    <button
                      className="bg-[#4A5568] text-white py-2 px-4 rounded-lg"
                      onClick={uploadFile}
                    >
                      Faylni yuklash
                    </button>
                    {uploadStatus && <p className="mt-2 text-red-500">{uploadStatus}</p>}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>Topshiriqlar yuklanmoqda...</p>
        )}

        <ShinyButton className="bg-slate-700" onClick={openModal} text="Vazifa yuklash" />
        <Modal isOpen={isModalOpen} onClose={closeMOdal}>
          <div>
            <div className="flex items-center justify-center w-90">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">html, css, java, py ,js ... </p>
                </div>
                <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              id="message"
              placeholder="Solution kiriting"
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " ></textarea>

            <div className="flex gap-5 pt-10">
              <ShinyButton className="bg-black text-white" onClick={closeMOdal} text="Yopish" />
              <ShinyButton className="bg-[#316651]" onClick={upLoadLesson} text="Jo'natish" />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Course;
