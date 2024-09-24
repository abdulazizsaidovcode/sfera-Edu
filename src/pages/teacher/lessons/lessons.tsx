import React, { useEffect, useState } from 'react';
import Tables from '@/components/custom/table';
import ShinyButton from '@/components/magicui/shiny-button';
import { SelectComponent } from '@/components/select/select';
import { FaEdit } from 'react-icons/fa';
import Modal from '@/components/moduleSaidbar/modulTeacher';
import { Input } from '@/components/ui/input';
import { getCategoryTeachers, getModules, getTeacherGroup, getTeacherLessons, lessonTRacings } from '@/context/logic/course';
import { useLesson } from '@/context/logic/state-managment/course';
import { useTeacherAllGroup, useTeacherCategory } from '@/context/logic/state-managment/teacher/teacher';
import { usePost } from '@/context/logic/global_functions/usePostOption';
import { config } from '@/context/api/token';
import SelectTeacher from '@/components/select/selectTeacher';
import { useModule } from '@/context/logic/state-managment/module';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Toastify style
import { InputDemo } from '@/components/Inputs/InputDemo';
import LessonModal from '@/components/lesson/lessonModal';

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Dars mavzusi' },
  { id: 3, name: "Dars haqida ma'lumot" },
  { id: 4, name: 'Davomiylik vaqti (min)' },
  { id: 5, name: 'Darsni tahrirlash' },
  { id: 6, name: 'Darsga ruhsat berish' }
];

const Lessons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonAdd, setLessonAdd] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);
  const [editlessonModal, seteditLessonModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({});
  const { setLessonData, lessonData } = useLesson();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const { setModuleData } = useModule();
  const { setTeacherCategory, teacherCategory } = useTeacherCategory();
  const { teacherAllGroup, setTeacherAllGroup } = useTeacherAllGroup();
  const [lessonName, setLessonName] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [duration, setDuration] = useState<number>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    getTeacherLessons(setLessonData, currentPage, pageSize);
    getCategoryTeachers(setTeacherCategory);
    getTeacherGroup(setTeacherAllGroup);
    getModules(selectedCategory, setModuleData);
  }, [currentPage, pageSize, setLessonData, selectedCategory]);



  const lessons = lessonData?.body || [];
  const totalPages = lessonData?.body?.data?.totalPage || 1;

  const openModal = (type: string, lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
    setLessonAdd(type === 'add');
    if (type === 'edit') {
      setLessonName(lesson.name);
      setDescription(lesson.description);
      setVideoLink(lesson.videoLink);
      setDuration(lesson.duration);
    }
  };


  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    seteditLessonModal(true);
    setLessonName(lesson.name);
    setDescription(lesson.description);
    setVideoLink(lesson.videoLink);
    setDuration(lesson.videoTime);
  };

  const handleAllowLesson = (lesson: any) => {
    setSelectedLessonId(lesson.id);
    setLessonModal(true);
  };

  const handleAdd = () => {
    setLessonAdd(true)
  }

  const handleSubmitTeacher = async () => {
    try {
      const taskGroup = {
        groupId: parseInt(selectedCategory ?? "0"),
        lessonId: parseInt(selectedLessonId ?? "0"),
        active: true,
      };

      await lessonTRacings(taskGroup, setLessonData);
      closeModal();
      getTeacherLessons(setLessonData, currentPage, pageSize);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setLessonAdd(false);
    setLessonModal(false);
    seteditLessonModal(false);
  };

  return (
    <div className='mb-3'>
      <div className='flex justify-between space-x-4 mb-6'>
        <ShinyButton
          text="Add Lesson"
          className='bg-[#16423C] shadow-lg py-2 px-3 text-white'
          onClick={() => handleAdd()}
        />
        <div className='shadow'>
          <SelectComponent
            label=''
            options={teacherCategory?.map((category: any) => ({
              value: category.id,
              label: category.name,
            })) || []}
            placeholder="Kategoriyani tanlang"
            onChange={(value: string) => {
              setSelectedCategory(value);
            }}
          />
        </div>
      </div>
      <div>
        <Tables thead={dashboardThead}>
          {lessons.length > 0 ? (
            lessons.map((lesson: any, index: number) => (
              <tr key={lesson.id || index} className="hover:bg-gray duration-100">
                <td className="border-b border-[#eee] min-w-[200px] p-5">
                  <p className="text-black dark:text-white">{index + 1 + (currentPage * pageSize)}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                  <p className="text-black dark:text-white">{lesson.name ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                  <p className="text-black dark:text-white">{lesson.description ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 ">
                  <p className="text-black dark:text-white">{lesson.videoTime ?? '0'} min</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px]">
                  <div className="flex gap-10">
                    <div
                      className="text-blue-500 mt-3 text-center hover:text-yellow-600 cursor-pointer"
                      onClick={() => handleEditLesson(lesson)}
                    >
                      <FaEdit />
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#eee] min-w-[160px]">
                  <div className="flex gap-10">
                    <div
                      className="text-blue-500 mt-3 text-center hover:text-yellow-600 cursor-pointer"
                      onClick={() => handleAllowLesson(lesson)}
                    >
                      <ShinyButton text="O'zgartirish" className='bg-blue-500' />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dashboardThead.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </Tables>
      </div>

      <Modal isOpen={lessonModal} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Guruhga dars qo'shish</h2>
        <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <div className='mb-15'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '6px'
              }}
              dropdownStyle={{ zIndex: 9999 }}
              options={teacherAllGroup?.map((group: any) => ({
                value: group.id,
                label: group.name,
              })) || []}
              onChange={(value: string) => {
                setSelectedCategory(value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <ShinyButton
            text={loading ? "Loading..." : "Saqlash"}
            className="bg-[#16423C] shadow-lg py-2 px-6 text-white"
            onClick={handleSubmitTeacher}
            disabled={loading}
          />
        </div>
      </Modal>
      <Modal isOpen={editlessonModal} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Darsni tahrirlash </h2>
        <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <div className='mb-15'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '6px'
              }}
              dropdownStyle={{ zIndex: 9999 }}
            // options={selectedLesson((module:any) => ({
            //   value: module.id, // yoki module.name, kerakli maydon
            //   label: module.name // yoki module.description, kerakli maydon
            // }))}
            />
            <div className='mb-3'>
              <InputDemo
                label='Dars mavzusini kiriting: '
                type="text"
                placeholder="Dars mavzusini kiriting"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <InputDemo label='Dars yuzasidan izoh yozing : ' type="text" placeholder="Dars yuzasidan izoh yozing"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='mb-3'>
              <InputDemo label='Darsni videosini urlni joylang : ' type="text" placeholder="Darsni videosini urlni joylang"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)} />
            </div>
            <div className='mb-3'>
              <InputDemo label='Videoni davomiylik vaqtini kiriting : ' type="number" placeholder="Videoni davomiylik vaqtini kiriting"
                value={duration}
                onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ShinyButton
            text={loading ? "Loading..." : "Saqlash"}
            className="bg-[#16423C] shadow-lg py-2 px-6 text-white"
            onClick={handleSubmitTeacher}
            disabled={loading}
          />
          <ShinyButton
            text={loading ? "Loading..." : "Bekor qilish "}
            className="bg-red-600 shadow-lg py-2 px-6 text-white"
            onClick={closeModal}
            disabled={loading}
          />
        </div>
      </Modal>
      
      <LessonModal lessonAdd={lessonAdd} closeModal={closeModal} />

      {/* Toast Container */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Lessons;
