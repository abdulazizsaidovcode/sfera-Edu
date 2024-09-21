import React, { useEffect, useState } from 'react';
import Tables from '@/components/custom/table';
import ShinyButton from '@/components/magicui/shiny-button';
import { SelectComponent } from '@/components/select/select';
import { FaEdit } from 'react-icons/fa';
import Modal from '@/components/moduleSaidbar/modulTeacher';
import { Input } from '@/components/ui/input';
import { getCategoryTeachers, getModules, getTeacherGroup, getTeacherLessons,} from '@/context/logic/course';
import { useLesson } from '@/context/logic/state-managment/course';
import { useTeacherAllGroup, useTeacherCategory, useTeacherTopGuruh } from '@/context/logic/state-managment/teacher/teacher';
import { usePost } from '@/context/logic/global_functions/usePostOption';
import { LessonAdd } from '@/context/api/url';
import { config } from '@/context/api/token';
import SelectTeacher from '@/components/select/selectTeacher';
import { useModule } from '@/context/logic/state-managment/module';

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
  const [lessonModal, setLessonModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const { setLessonData, lessonData } = useLesson();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const { setModuleData, moduleData } = useModule();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lessonName, setLessonName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modulId, setModulId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [duration, setDuration] = useState<number | null>(null);
  const [lessonNameError, setLessonNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [videoLinkError, setVideoLinkError] = useState('');
  const [durationError, setDurationError] = useState('');
  const { setTeacherCategory, teacherCategory } = useTeacherCategory();
  const { teacherAllGroup, setTeacherAllGroup } = useTeacherAllGroup();
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const openModal = (type: string, lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };
  const { postData, response } = usePost(LessonAdd, {
    name: lessonName,
    description: description,
    videoLink: videoLink,
    videoTime: duration,
    moduleId: selectedCategory,
    fileId: 0
  }, config)

  useEffect(() => {
    getTeacherLessons(setLessonData, currentPage, pageSize);
    getCategoryTeachers(setTeacherCategory);
    getTeacherGroup(setTeacherAllGroup);
    getModules(modulId, setModuleData)
  }, [currentPage, pageSize, setLessonData]);
 
  useEffect(() => {
    getTeacherLessons(setLessonData, currentPage, pageSize);
  }, [response])

  const LessonData = {
    groupId: 1,
    lessonId: 2,
    active: true,
  };
  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 0 && newPage < totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };
  const modalLesson = () => {
    setLessonModal(true);
    setSelectedTeacherId(null);
  };
  const handleSubmitTeacher = () => {
    if (selectedLesson && selectedTeacherId) {
      console.log(`Lesson ID: ${selectedLesson.id}, Selected Teacher ID: ${selectedTeacherId}`);
    } else {
      console.error('Please select a teacher before submitting.');
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    setSelectedId(selectedValue);
  };

  const lessons = lessonData?.body || [];
  const totalPages = lessonData?.body?.data?.totalPage || 1;

   
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }
    const pageNumbers = [];
    if (currentPage < 3) {
      pageNumbers.push(0, 1, 2, 3, '...', totalPages - 1);
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pageNumbers.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
    }
    return pageNumbers;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLessonAdd(false);
    // clearForm();
  };
  const closeLessonModal = () =>{
    setLessonModal(false)
  }

  const handleSubmit = () => {
    let hasError = false;

    if (!lessonName) {
      setLessonNameError('Lesson name is required');
      hasError = true;
    }
    if (!description) {
      setDescriptionError('Description is required');
      hasError = true;
    }
    if (!videoLink || isNaN(Number(videoLink))) {
      setVideoLinkError('Video link (duration) is required and must be a number');
      hasError = true;
    }
    if (!duration || isNaN(Number(duration))) {
      setDurationError('Duration is required and must be a number');
      hasError = true;
    }

    if (hasError) return;
    console.log({
      name: lessonName,
      description: description,
      videoLink: videoLink,
      videoTime: duration,
      moduleId: selectedCategory,
      fileId: 0
    });
    postData()
    closeModal();

    // setLessonNameError('');
    // setDescriptionError('');
    // setVideoLinkError('');
    // setDurationError('');
  };
  // const handleSubmits = async () => {
  //   await LessonTracingPosts(lessonData, setData);
  // };

  return (
    <div className='mb-3'>
      <div className='flex justify-between space-x-4 mb-6'>
        <ShinyButton
          text="Add Lesson"
          className='bg-[#16423C] shadow-lg py-2 px-3 text-white'
          onClick={() => openModal('add', null)}
        />
        <div className='shadow'>
          <SelectComponent
            label=""
            options={teacherCategory?.map((category: any) => ({
              value: category.id,
              label: category.name,
            })) || []}
            placeholder="Kategoriyani tanlang"
            onChange={handleSelectChange}
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
                      onClick={() => openModal('edit', lesson)
                      }
                    >
                      <FaEdit />
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#eee] min-w-[160px]">
                  <div className="flex gap-10">
                    <div
                      className="text-blue-500 mt-3 text-center hover:text-yellow-600 cursor-pointer"
                      onClick={modalLesson}
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
      {/* Pagination */}
      <div className="mt-4 flex justify-center  items-center space-x-3 p-3">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && handlePageChange(page as number)}
            className={`shadow-lg py-1 px-3 text-black text-lg font-bold ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}
            disabled={page === '...'}
          >
            {page === '...' ? '...' : `${+page + 1}`}
          </button>
        ))}
      </div>

      {/* Add/Edit Lesson Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">{lessonAdd ? 'Add Lesson' : 'Edit Lesson'}</h2>
        <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <div className='mb-4'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '8px',
              }}
              dropdownStyle={{ zIndex: 9999 }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              onChange={(value) =>{
                setModulId(value);
              }}
              options={teacherCategory?.map((teacher: any) => ({
                value: teacher.id,
                label: teacher.name,
              }))}
            />
          </div>
          <div className='mb-3'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '8px',
              }}
              dropdownStyle={{ zIndex: 9999 }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              onChange={(value) => {
                setSelectedCategory(value); 
              }}
              options={teacherAllGroup?.map((teacher: any) => ({
                value: teacher.id,
                label: teacher.name,
              }))}
            />
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dars mavzusi:
              </label>
              <Input
                className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3 p-2 bg-white border rounded-lg'
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
              />
              {lessonNameError && <p className="text-red-500">{lessonNameError}</p>}
            </div>

            <div className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dars haqida ma'lumot:
              </label>
              <Input
                className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3 p-2 bg-white border rounded-lg'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <p className="text-red-500">{descriptionError}</p>}
            </div>
            <div className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video vaqt (min):
              </label>
              <Input
                type="text"
                className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3 p-2 bg-white border rounded-lg'
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              {videoLinkError && <p className="text-red-500">{videoLinkError}</p>}
            </div>
            <div className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3'>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Davomiylik (min):
              </label>
              <Input
                type="number"
                className='min-w-54 sm:w-64 md:w-96 lg:w-[40rem] mb-3 p-2 bg-white border rounded-lg'
                value={duration?.toString() || ''}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              />
              {durationError && <p className="text-red-500">{durationError}</p>}
            </div>

            <div className='flex justify-between space-x-3'>
              <ShinyButton text="Saqlash" className='bg-green-600' onClick={handleSubmit} />
              <ShinyButton text="Bekor qilish" className='bg-red-600' onClick={closeModal} />
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={lessonModal} onClose={closeLessonModal}>
        <h2 className="text-xl font-bold mb-4">Guruhga dars qo'shish</h2>
        <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          {/* <div className='mb-4'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '8px',
              }}
              dropdownStyle={{ zIndex: 9999 }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              onChange={(value) =>{
                setTeacherAllGroup(value);
              }}
              options={teacherCategory?.map((teacher: any) => ({
                value: teacher.id,
                label: teacher.name,
              }))}
            />
          </div> */}
          <div className='mb-15'>
            <SelectTeacher
              style={{
                width: '640px',
                height: '44px',
                backgroundColor: "#f0f0f0",
                borderRadius: '8px',
              }}
              dropdownStyle={{ zIndex: 9999 }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              onChange={(value) => {
                setSelectedCategory(value); 
              }}
              options={teacherAllGroup?.map((teacher: any) => ({
                value: teacher.id,
                label: teacher.name,
              }))}
            />
          </div>
          <div className='flex  space-x-3'>
              {/* <ShinyButton text="Saqlash" className='bg-green-600' onClick={handleSubmits} /> */}
              <ShinyButton text="Bekor qilish" className='bg-red-600' onClick={closeModal} />
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Lessons;
