import React, { useEffect, useState } from 'react';
import TaskAccardion from "@/components/accordion/taskAccardion/taskAccardion";
import ShinyButton from "@/components/magicui/shiny-button";
import Tooltip from '@/components/tooltip/tooltip';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { get_file, getHomeWork_all_url, getHomework_list_url } from '@/context/api/url';
import { config } from '@/context/api/token';
import LoadingModal from '@/components/Loading/loading';
import { RiFolderDownloadLine } from 'react-icons/ri';

const Completed_tasks: React.FC = () => {
    const [studentId, setStudentId] = useState<number | null>(null); // Initially null
    const { data, loading, getData } = useGet(getHomeWork_all_url, config);
    const { data: homeWork_data, getData: homeWork_getData } = useGet(`${getHomework_list_url}${studentId || 0}`, config);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (studentId) {
            homeWork_getData();
        }
    }, [studentId]);

    const handleAccordionOpen = (id: number) => {
        setStudentId((prevId) => (prevId === id ? null : id));
    };

    // Har bir input uchun to'g'ridan-to'g'ri qiymat olish
    const handleInputChange = (homeIndex: number, value: string) => {
        console.log(`Ball for homeIndex ${homeIndex}:`, value); // Input qiymatini ko'rsatish
    };

    if (loading) {
        return <LoadingModal isVisible={loading} />;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Completed Taskslar</h1>
            {
                data && data.length > 0 ? (
                    <>
                        {data.map((item: any, index: number) => (
                            <TaskAccardion
                                key={index}
                                number={index + 1}
                                firstName={item.firstName}
                                lastName={item.lastName}
                                groupName={item.groupName || "Dasturchilar"}
                                onOpen={() => handleAccordionOpen(item.userId)}
                                studentId={item.userId}
                            >
                                <div className="overflow-x-auto">
                                    {
                                        homeWork_data && homeWork_data.length > 0 ? (
                                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                                                <thead className="bg-green-200">
                                                    <tr>
                                                        <th className="px-2 py-2 border text-sm md:px-4 md:py-2">№</th>
                                                        <th className="px-2 py-2 border text-sm md:px-4 md:py-2">Saturation</th>
                                                        <th className="px-2 py-2 border text-sm md:px-4 md:py-2">File download</th>
                                                        <th className="px-2 py-2 border text-sm md:px-4 md:py-2">Ball</th>
                                                        <th className="px-2 py-2 border text-sm md:px-4 md:py-2">Button</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {homeWork_data.map((homeWork: any, homeIndex: number) => (
                                                        <tr key={homeIndex}>
                                                            <td className="px-2 py-2 border text-center text-sm md:px-4 md:py-2">{homeIndex + 1}</td>
                                                            <td className="px-2 py-2 border text-center text-sm md:px-4 md:py-2">
                                                                <Tooltip text={homeWork.solution}>
                                                                    <span className="truncate cursor-pointer">
                                                                        {homeWork.solution}
                                                                    </span>
                                                                </Tooltip>
                                                            </td>
                                                            <td className="px-2 py-2 border text-center text-sm md:px-4 md:py-2">
                                                                <div className="flex justify-center">
                                                                    {homeWork.fileId ? (
                                                                        <a href={`${get_file}${homeWork.fileId}`}
                                                                            download
                                                                            className='bg-transparent border-b-2 px-2 border-b-[#316651]  text-[#316651] hover:text-[#316651] flex items-center cursor-pointer'>
                                                                            <span>Download</span>
                                                                            <RiFolderDownloadLine size={20} className="ml-1" />
                                                                        </a>
                                                                    ) : (
                                                                        <span className="text-red-500">File not found</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-2 py-2 border text-center text-sm md:px-4 md:py-2">
                                                                <input
                                                                    type="number"
                                                                    className='border border-[#e0e0e0] rounded-md px-2 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent'
                                                                    placeholder="Ball"
                                                                    onChange={(e) => handleInputChange(homeIndex, e.target.value)} // Qiymatni olish
                                                                />
                                                            </td>
                                                            <td className="py-2 border text-center text-sm md:px-4 md:py-2">
                                                                <ShinyButton text="Baholash" className="bg-[#316651]" />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-gray-500">Hozirda bu talabaga bog'liq vazifalar mavjud emas.</p>
                                        )
                                    }
                                </div>
                            </TaskAccardion>
                        ))}
                    </>
                ) : (
                    <p className="text-gray-500">Hozirda tugallangan vazifalar mavjud emas.</p>
                )
            }
        </div>
    );
};

export default Completed_tasks;
