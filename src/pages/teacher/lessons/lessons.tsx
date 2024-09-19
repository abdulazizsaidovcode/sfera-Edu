import React, { useEffect, useState } from 'react';
import Tables from '@/components/custom/table';
import ShinyButton from '@/components/magicui/shiny-button';
import { SelectComponent } from '@/components/select/select';
import { FaEdit } from 'react-icons/fa';
import AnimatedModal from '@/components/Modal/modal';
import TextInput from '@/components/Inputs/TextInput';
import { getTeacherLessons } from '@/context/logic/course';
import { useLesson } from '@/context/logic/state-managment/course';

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Dars mavzusi' },
  { id: 3, name: "Dars haqida ma'lumot" },
  { id: 4, name: 'Davomiylik vaqti (min)' },
  { id: 5, name: 'Darsni tahrirlash' },
];

const Lessons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); 
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const { setLessonData, lessonData } = useLesson();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const openModal = (type: string, lesson: any) => {
    setModalContent(type);
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTeacherLessons(setLessonData, currentPage, pageSize);
  }, [currentPage, pageSize, setLessonData]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

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
    setModalContent('');
    setSelectedLesson(null);
  };

  return (
    <div>
      <div className='mb-3'>
        <div className='flex justify-between space-x-4 mb-6'>
          <ShinyButton text="Add Lesson" className='bg-[#16423C] shadow-lg py-2 px-3' />
          <div className='shadow-xl'>
            <SelectComponent
              label="Category"
              options={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
                { value: "blueberry", label: "Blueberry" },
                { value: "grapes", label: "Grapes" },
                { value: "pineapple", label: "Pineapple" },
              ]}
              placeholder="Select Category"
            />
          </div>
        </div>
        <div>
          <Tables thead={dashboardThead}>
            {lessonData?.body?.length > 0 ? (
              lessonData.body.map((lesson: any, index: number) => (
                <tr key={lesson.id || index} className="hover:bg-gray duration-100">
                  <td className="border-b border-[#eee] min-w-[200px] p-5">
                    <p className="text-black dark:text-white">{index + 1 + currentPage * pageSize}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                    <p className="text-black dark:text-white">{lesson.name ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                    <p className="text-black dark:text-white">{lesson.description ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[160px] p-5 ">
                    <p className="text-black dark:text-white">{lesson.videoTime ?? 'N/A'} min</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[160px]">
                    <div className="flex gap-10">
                      <div
                        className="text-blue-500 mt-3 text-center hover:text-yellow-600 cursor-pointer"
                        onClick={() => openModal('edit', lesson)}
                      >
                        <FaEdit />
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
        <div className="flex justify-center items-center space-x-3 p-3">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => page !== '...' && handlePageChange(page as number)}
              className={`shadow-lg py-1 px-3 text-lg font-bold ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}
              disabled={page === '...'}
            >
              {page === '...' ? '...' : `${page + 1}`}
            </button>
          ))}
        </div>
        {/* Modal Component */}
      <AnimatedModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent === 'edit' ? 'Edit Lesson' : 'Delete Lesson'}
      >
        {modalContent === 'edit' && selectedLesson ? (
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='mb-4'>
                <label>Lesson Name:</label>
                <TextInput defaultValue={selectedLesson?.name} />
              </div>
              <div className='mb-4'>
                <label>Description:</label>
                <TextInput defaultValue={selectedLesson?.description} />
              </div>
              <div className='mb-4'>
                <label>Video Link:</label>
                <TextInput defaultValue={selectedLesson?.videoLink} />
              </div>
              <div className='mb-4'>
                <label>Duration (min):</label>
                <TextInput defaultValue={selectedLesson?.videoTime} />
              </div>
              <ShinyButton  
                text="Edit" 
                className='bg-[#16423C] shadow-lg' 
                onClick={closeModal}
              />
            </form>
          </div>
        ) : (
          <div>
            <p>Are you sure you want to delete the lesson "{selectedLesson?.name}"?</p>
            <button onClick={() => {/* Handle delete logic */}}>Yes, delete</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        )}
      </AnimatedModal>
    </div>
      </div>

  )
}

export default Lessons;
