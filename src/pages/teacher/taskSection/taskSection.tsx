import Tables from '@/components/custom/table';
import { setConfig } from '@/context/api/token';
import { lessonTRacings, teacherGetLesson } from '@/context/logic/course';
import { useLessonTracing, useTeacherAllLessonTracing } from '@/context/logic/state-managment/teacher/teacher';
import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import Switch from 'react-switch';

export const dashboardThead = [
    { id: 1, name: 'T/r' },
    { id: 2, name: 'Guruh nomi ' },
    { id: 3, name: "Dars mavzusi" },
    { id: 4, name: "Darsning holati " },
];

const TaskSection = () => {
    const { setTeacherAllGetLesson, teacherAllGetLesson } = useTeacherAllLessonTracing();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setConfig();
        teacherGetLesson(setTeacherAllGetLesson).finally(() => setLoading(false));
    }, [setTeacherAllGetLesson]);

    const handleToggle = (lessonId: string, currentState: boolean) => {
        const newActiveState = !currentState; // Toggle the current state
        console.log(`Lesson ID: ${lessonId}, New Active State: ${newActiveState}`);

        // Make an API call here to update the lesson's active status
        // Example: updateLessonStatus(lessonId, newActiveState).then(() => {
        //     // Optionally refresh lessons or update state
        // });
    };

    return (
        <div>
            <h2 className='font-bold mb-4 text-xl'>Ruhsat berilgan darslar </h2>
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
                    teacherAllGetLesson?.length > 0 ? (
                        teacherAllGetLesson.map((lesson: any, index: number) => (
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
                                        onChange={() => handleToggle(lesson.id, lesson.active)} // Toggle the state
                                        disabled={false}
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
                    )
                )}
            </Tables>
        </div>
    );
};

export default TaskSection;
