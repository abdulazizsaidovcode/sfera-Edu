import React, { useEffect, useState } from "react";
import { useLessonONe, useLessonTask } from "@/context/logic/state-managment/module";
import VideoPlayer from "@/components/lesson/lessonVideo";
import { getLessonOneTask } from "@/context/logic/course";
import axios from "axios";
import { base_url, get_file } from "@/context/api/url";
import ShinyButton from "@/components/magicui/shiny-button";
import Modal from "@/components/moduleSaidbar/modulTeacher";
import { checkImgUpload } from "@/context/logic/global_functions/fileUpolatOptions";
import { config } from "@/context/api/token";
import toast from "react-hot-toast";
import { FaPenClip } from "react-icons/fa6";

const Course = () => {
  const { lessonOneSave } = useLessonONe();
  const { lessonTaskSave, setLessonTaskSave } = useLessonTask();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solution, setSolution] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    const id = lessonOneSave?.id;
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        await getLessonOneTask(id, setLessonTaskSave);
        setLoading(false);
      };
      fetchData();
    } else {
      setLoading(false); // No lesson ID, set loading to false
    }
  }, [lessonOneSave, setLessonTaskSave]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

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

  const upLoadLesson = async () => {
    if (!selectedFile) {
      toast.error("Avval faylni tanlang.");
      return;
    }

    const uploadedFileId = await uploadFile();

    if (uploadedFileId) {
      const data = {
        taskId: lessonOneSave?.id,
        solution: solution || "Javob yo'q",
        fileId: uploadedFileId,
      };

      try {
        const response = await axios.post(`${base_url}homework/save`, data, config);
        console.log(response.data);
        toast.success("Vazifa muvaffaqiyatli yuklandi");
        closeModal();
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
      {loading ? (
        <p className="text-gray-600 font-bold">Yuklanmoqda...</p> // Loading message
      ) : (
        <>
          {lessonOneSave && lessonOneSave.videoLink ? (
            <VideoPlayer videoId={lessonOneSave.videoLink} />
          ) : (
            <VideoPlayer videoId={""} />
          )}
          <div className="bg-[#6A9C89] shadow-xl p-3 mt-2 rounded-xl">
            <h2 className="text-xl mb-2 font-bold">Dars mavzusi ✅ :
              <span className="text-green-900 text-xl font-bold ml-2">
                {lessonOneSave?.name || "Darslik mavjud emas "}
              </span>
            </h2>
            <h2 className="font-bold mb-2 text-lg flex">Mavzu yuzasidan izoh <span className="mt-2 text-sm ml-2 "><FaPenClip /></span>
              <span className="text-green-900 text-xl font-bold ml-3">
                : {lessonOneSave?.description || "Mavzu mavjud emas"}
              </span>
            </h2>
            <h2 className="font-bold mb-2 text-lg">Davomiylik vaqti :
              <span className="text-green-900 text-xl font-bold">
                {lessonOneSave?.videoTime || "Darsning davomiylik vaqti mavjud emas"}
              </span> minut
            </h2>
            <p className="font-bold text-black mb-2">Mavzu yuzasidan savol va topshiriqlar</p>

            {Array.isArray(lessonTaskSave) && lessonTaskSave.length > 0 ? (
              <>
                {lessonTaskSave.map((task: any, index: number) => (
                  <div key={index} className="mb-4 bg-gray-600 p-3 border-gray-900 rounded-xl">
                    <p>Savol : <span className="font-bold mb-3">{task.name || "Dars yuzasidan savollar mavjud emas ⚠️"}</span></p>
                    <p className="mb-4">Savolga izoh: {task.description || "Task Description"}</p>
                    {task.fileId ? (
                      <div>
                        <p className="mb-3">Dars davomida ishlatilgan qo'llanmani yuklab olish :
                          <a
                            href={`${get_file}${task.fileId}`}
                            className="mb-4 bg-gray-600 p-1 border-2 rounded-xl ml-2"
                            download
                          >
                            Yuklab olish
                          </a>
                        </p>
                        <div className="mb-2 mt-3">
                          {task.send ?
                            <ShinyButton className="bg-slate-700" onClick={openModal} text="Vazifa yuklash" />
                            :
                            <p className="text-gray-600 font-bold">Siz oldin bu savolga javob bergansiz </p>
                          }
                        </div>
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
              <p className="text-gray-600 font-bold">Vazifalar mavjud emas</p>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div>
                <div className="flex items-center justify-center w-90">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h8z" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Faylni tanlang</span> yoki saqlash uchun yuklang</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF yoki DOCX formatlarida fayllarni yuklashingiz mumkin</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                <div className="mt-4">
                  <textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Javobingizni kiriting..."
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={upLoadLesson}>Saqlash</button>
                  <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>Bekor qilish</button>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
