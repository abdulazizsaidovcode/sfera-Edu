import React, { useEffect, useState } from 'react';
import Tables from '@/components/custom/table';
import { gradedThead } from '../dashboard/dashboard';
import TextInput from '@/components/Inputs/TextInput';
import { SelectComponent } from '@/components/select/select';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { getAllGroupTeacher, homework_filter } from '@/context/api/url';
import { config } from '@/context/api/token';

const Graded: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // For student FIO search
    const [selectedOption, setSelectedOption] = useState<string>(''); // For group filter
    const [currentPage, setCurrentPage] = useState<number>(1); // Pagination
    const [pageSize] = useState<number>(10); // Page size

    // Fetch groups for the group filter dropdown
    const groups = useGet(getAllGroupTeacher, config);

    // Dynamically build the URL based on whether groupId and studentFIO are present
    const buildUrl = () => {
        let url = `${homework_filter}?page=${currentPage - 1}&size=${pageSize}`;
        if (selectedOption) url += `&groupId=${selectedOption}`;
        if (searchTerm) url += `&studentFIO=${searchTerm}`;
        return url;
    };

    // Fetch graded homework data with conditional query params
    const gradeds = useGet(buildUrl(), config);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        groups.getData(); // Fetch groups when the component mounts
    }, []);

    useEffect(() => {
        gradeds.getData(); // Fetch homework data whenever search/filter/page changes
    }, [currentPage, selectedOption, searchTerm]);

    console.log(gradeds.data);

    return (
        <div className="p-5">
            {/* Search and Filter Section */}
            <div className="mb-4 flex justify-center gap-4 md:gap-0 md:justify-between flex-wrap">
                <TextInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search student..."
                    className="border border-gray-300 p-2 rounded-md w-1/3"
                />
                <SelectComponent
                    label="Filter group"
                    options={groups.data ? groups.data.map((group: { id: string, name: string }) => ({ value: group.id, label: group.name })) : []}
                    placeholder="Filter by Group"
                    onChange={(value) => setSelectedOption(value)}
                />
            </div>

            {/* Conditional Rendering for Data */}
            {gradeds.data && gradeds.data.body.length > 0 ? (
                <Tables thead={gradedThead}>
                    {gradeds.data.body
                    .map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-100 duration-100">
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black">{index + 1}</p>
                            </td>
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black">{row.firstName} {row.lastName}</p>
                            </td>
                            <td className="border-b border-[#eee] min-w-[200px] p-5">
                                <p className="text-black">{row.groupName}</p>
                            </td>
                        </tr>
                    ))}
                </Tables>
            ) : (
                <p className="text-center text-gray-500 mt-4">No data available</p>
            )}

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-start space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                <span className="p-2">{currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === gradeds.data?.totalPage}
                    className={`p-2 rounded-md ${currentPage === gradeds.data?.totalPage ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Graded;
