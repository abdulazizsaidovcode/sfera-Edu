import ChartTeacher from '@/components/chart/teacherChart';
import Tables from '@/components/custom/table';
import TeacherCard from '@/components/teacherCard/card';
import { getTeacherAllCount, getTopGroup, getTopStudentTEacher } from '@/context/logic/course';
import { useTeacherAll, useTeacherTopGuruh, useTeacherTopStudent } from '@/context/logic/state-managment/teacher/teacher';
import React, { useEffect } from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { GiTeacher } from "react-icons/gi";
import { MdGroups } from "react-icons/md";


export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: "Guruh nomi" },
  { id: 3, name: "O'quvchilar soni" },
  { id: 4, name: 'Umumiy ball' },
];
export const TopStudent = [
  { id: 1, name: 'T/r' },
  { id: 2, name: "Ism va familiya" },
  { id: 3, name: "Guruh" },
  { id: 4, name: 'Natija' },
];

export const lessonData = [
  { id: 1, name: 'Dars', description: 'Salom', group: 'BackEnd', score: 12 },
  { id: 2, name: 'Dars', description: 'Salom', group: 'BackEnd', score: 12 },
  { id: 3, name: 'Dars', description: 'Salom', group: 'BackEnd', score: 12 },
  { id: 4, name: 'Dars', description: 'Salom', group: 'BackEnd', score: 12 },
  { id: 5, name: 'Dars', description: 'Salom', group: 'BackEnd', score: 12 },
];

const DashboardTeacher = () => {
  const { teacherTopGroup, setTeacherTopGroup } = useTeacherTopGuruh();
  const { teacherTopStudent,setTeacherTopStudent } = useTeacherTopStudent();
  const { teacherAll,setTeacherAll } = useTeacherAll();

  useEffect(() => {
    getTopGroup(setTeacherTopGroup);
    getTopStudentTEacher(setTeacherTopStudent)
    getTeacherAllCount(setTeacherAll)
  }, [setTeacherTopGroup,setTeacherTopStudent,setTeacherAll]);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mb-5">
        <TeacherCard
          number={teacherAll?.teacherCount}
          icon={<GiTeacher />}
          title="O'qituvchilar"
          description="Bizning Sfera Academy da eng malakali ustozlar dars beradi sizni ham shular qatorida ekanligingizdan hursandmiz"
        />
        <TeacherCard
          number={teacherAll?.studentCount}
          icon={<PiStudentFill />}
          title="O'quvchilar"
          description="Bizning Sfera Academy da o'qigan har bir o'quvchi eng yaxshisiga loyiq "
        />
        <TeacherCard
          number={teacherAll?.groupCount}
          icon={<MdGroups />}
          title="Guruhlar"
          description="Bizning Sfera Academy da birlashgan har bir inson o'z kelajagi uchun befarq emas "
        />
        
      </div>

      {/* Top  guruh Table */}
      <div className='mb-10'>
        <h2 className="font-bold text-xl p-2 mb-5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Guruh  natijalari
        </h2>
        <Tables thead={dashboardThead}>
          {teacherTopGroup?.length > 0 ? (
            teacherTopGroup.map((teacher: any, index: number) => (
              <tr key={teacher.id || index} className="hover:bg-gray duration-100">
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{teacher.groupName ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{teacher.studentCount ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{teacher.scoreMonth ?? 'N/A'}</p>
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
       {/* Top 5 Students Table */}
      <div className='mb-10'>
        <h2 className="font-bold text-xl p-2 mb-5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Guruh  natijalari
        </h2>
        <Tables thead={TopStudent}>
          {teacherTopStudent?.length > 0 ? (
            teacherTopStudent.map((student: any, index: number) => (
              <tr key={student.id || index} className="hover:bg-gray duration-100">
                <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5">
                  <p className="text-black dark:text-white">{student.fullName ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 ">
                  <p className="text-black dark:text-white">{student.groupName ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.scoreMonth ?? 'N/A'}</p>
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
      {/* Top Teacher Data Section */}
      <div className='mb-10'>
        <h2 className="font-bold text-xl p-2 mb-5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Sizning guruhingizni yillik natijalari
        </h2>
        <ChartTeacher />
      </div>
    </div>
  );
};

export default DashboardTeacher;
