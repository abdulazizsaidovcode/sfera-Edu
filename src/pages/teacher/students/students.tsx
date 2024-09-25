import Tables from "@/components/custom/table";
import TextInput from "@/components/Inputs/TextInput";
import { SelectComponent } from "@/components/select/select";
import { getCategoryTeachers, getStudenTeacher, getTeacherGroup } from "@/context/logic/course";
import { useTeacherAll, useTeacherAllGroup, useTeacherCategory, useTeacherStudent } from "@/context/logic/state-managment/teacher/teacher";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: "Telefon no'mer" },
  { id: 5, name: 'Guruh' },
];

const Students = () => {
  const { teacherStudent, setTeacherStudent } = useTeacherStudent();
  const { setTeacherCategory, teacherCategory } = useTeacherCategory();
  const { teacherAllGroup, setTeacherAllGroup } = useTeacherAllGroup();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState('');

  const handleSelectChange = (selectedValue: number | undefined) => {
    setSelectedId(selectedValue);
  };

  

  useEffect(() => {
    setLoading(true);
    getTeacherGroup(setTeacherAllGroup);
    getCategoryTeachers(setTeacherCategory,currentPage,pageSize);
    setLoading(false);
  }, [setTeacherAllGroup, setTeacherCategory]);

  useEffect(() => {
    setLoading(true);
    getStudenTeacher(setTeacherStudent, currentPage, pageSize, selectedId).finally(() => {
      setLoading(false);
    });
  }, [currentPage, pageSize, selectedId, setTeacherStudent]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const students = teacherStudent?.body?.data?.body || [];
  const totalPages = teacherStudent?.body?.data?.totalPage || 1;

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-wrap gap-6 mb-8 justify-between">
        <div className="md:w-auto flex-1">
          <SelectComponent
            label=""
            options={teacherAllGroup?.map((category: any) => ({
              value: category.id,
              label: category.name,
            })) || []}
            placeholder="Guruhni tanlang"
            onChange={handleSelectChange}
          />
        </div>
        <div className="md:w-auto flex-1">
          <TextInput placeholder=" 🔍 Qidiruv..." />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow">
        <Tables thead={dashboardThead}>
          {loading ? (
            <tr>
              <td colSpan={dashboardThead.length} className="text-center py-4">
                <div className="flex justify-center items-center">
                  <FadeLoader color="#6A9C89" />
                </div>
              </td>
            </tr>
          ) : (
            students.length > 0 ? (
              students.map((student: any, index: number) => (
                <tr key={student.userId || index} className="hover:bg-gray duration-100">
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{index + 1 + (currentPage * pageSize)}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.lastName ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.firstName ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.phoneNumber ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.groupName ?? 'N/A'}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={dashboardThead.length} className="text-center py-4">
                  Ma'lumotlar mavjud emas
                </td>
              </tr>
            )
          )}
        </Tables>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-3 p-3">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && handlePageChange(page as number)}
            className={`shadow-lg py-1 px-3 text-lg font-bold ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}
            disabled={page === '...'}
          >
            {page === '...' ? '...' : `${+page + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Students;
