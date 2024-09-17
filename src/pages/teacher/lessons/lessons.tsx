import React, { useState } from 'react';
import Tables from '@/components/custom/table';
import ShinyButton from '@/components/magicui/shiny-button';
import { SelectDemo } from '@/components/select/select';

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: 'Ball' },
];

const students = [
  { id: 1, lastname: 'Smith', firstname: 'John', score: 85 },
  { id: 2, lastname: 'Doe', firstname: 'Jane', score: 90 },
  { id: 3, lastname: 'Brown', firstname: 'Mike', score: 78 },
  { id: 4, lastname: 'Taylor', firstname: 'Emily', score: 92 },
  { id: 5, lastname: 'Johnson', firstname: 'Chris', score: 88 },
];

const Lessons = () => {
  const [framework, setFramework] = useState('');

  return (
    <div>
      <div className='mb-3'>
        <div className='flex justify-between space-x-4 mb-6'>
          <ShinyButton text="Lesson qo'shish" className='bg-[#16423C] shadow-lg py-2 px-3' />
          <div className='shadow-lg'><SelectDemo /></div>
          
        </div>
        <div>
          <Tables thead={dashboardThead}>
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id || index} className="hover:bg-gray duration-100">
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{index + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.lastname ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.firstname ?? 'N/A'}</p>
                  </td>
                  <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{student.score ?? 'N/A'}</p>
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
      </div>
    </div>
  );
};

export default Lessons;