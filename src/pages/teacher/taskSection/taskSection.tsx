import Tables from '@/components/custom/table';
import { lessonTRacings } from '@/context/logic/course';
import { useLessonTracing } from '@/context/logic/state-managment/teacher/teacher';
import React, { useEffect } from 'react';
import Switch from 'react-switch';  // Import the Switch component

export const dashboardThead = [
    { id: 1, name: 'T/r' },
    { id: 2, name: 'Dars mavzusi' },
    { id: 3, name: "Dars haqida ma'lumot" },
    { id: 4, name: "Aktiv" }, 
];

const TaskSection = () => {
    const { setTeacherLessonTracing, teacherAllTracing } = useLessonTracing();
    
    useEffect(() => {
        lessonTRacings(setTeacherLessonTracing);
    }, [setTeacherLessonTracing]);
    return (
        <div>
            <h2 className='font-bold mb-4 text-xl'>Ruhsat berilgan darslar </h2>
            <Tables thead={dashboardThead}>
                {teacherAllTracing?.length > 0 ? (
                    teacherAllTracing.map((lesson: any, index: number) => (
                        <tr key={lesson.id || index} className="hover:bg-gray duration-100">
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black dark:text-white">{index + 1}</p>
                            </td>
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black dark:text-white">{lesson.groupName ?? 'N/A'}</p>
                            </td>
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black dark:text-white">{lesson.lessonName ?? 'N/A'}</p>
                            </td>
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <Switch
                                    checked={lesson.active} 
                                    onChange={() => {}}     
                                    disabled={true}         
                                    onColor="#4ade80"        
                                    offColor="#f87171"       
                                />
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
    );
};

export default TaskSection;
