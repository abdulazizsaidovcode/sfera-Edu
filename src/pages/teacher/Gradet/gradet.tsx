import React, { useState } from 'react';
import Tables from '@/components/custom/table';
import { dashboardThead } from '../dashboard/dashboard';
import TextInput from '@/components/Inputs/TextInput';
import { SelectComponent } from '@/components/select/select';

// Defining the type for table data
const Graded: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="p-5">
            <div className="mb-4 flex justify-center gap-4 md:gap-0 md:justify-between flex-wrap ">
                <TextInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 p-2 rounded-md w-1/3" />
                <SelectComponent
                    label='Filter by Column 2'
                    options={[{ value: 'dsadasd', label: 'dsadasd' }, { value: 'bbbbb', label: 'bbbbb' }]}
                    placeholder='Filter by Column 2'
                    onChange={(value) => setSelectedOption(value)}
                />
            </div>

            <Tables thead={dashboardThead}>
                <tr className="hover:bg-gray-100 duration-100">
                    <td className="border-b border-[#eee] min-w-[200px] p-5">
                        <p className="text-black">aaaa</p>
                    </td>
                    <td className="border-b border-[#eee] min-w-[200px] p-5">
                        <p className="text-black">bbbb</p>
                    </td>
                    <td className="border-b border-[#eee] min-w-[200px] p-5">
                        <p className="text-black">cccc</p>
                    </td>
                    <td className="border-b border-[#eee] min-w-[160px] p-5">
                        <p className="text-black">dddd</p>
                    </td>
                </tr>
            </Tables>

            <div className="mt-4 flex justify-center space-x-2">
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
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Graded;
