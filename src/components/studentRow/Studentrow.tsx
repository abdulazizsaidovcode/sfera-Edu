import React, { useState } from 'react';

interface StudentRowProps {
    name: { fullName: string, studentId: number };
    dates: string[];
    checkData: any[];
}

const StudentRow: React.FC<StudentRowProps> = ({ name, dates, checkData }) => {
    const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const handleClick = (date: string) => {
        setAttendance(prev => ({
            ...prev,
            [date]: prev[date] === 'Bor edi' ? 'Yo\'q' : 'Bor edi'
        }));
    };

    const handleMouseEnter = (date: string) => {
        setHoveredDate(date);
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    return (
        <tr className="border-b border-black/40">
            <td className="p-3 pl-1 pr-5">{name.fullName}</td>
            {dates?.length > 0 && dates.map((date, index) => (
                <td key={index} className="text-center p-2 min-w-24">
                    <div
                        className={`cursor-pointer ${attendance[date] ? 'px-3 py-1.5 rounded-xl' : 'p-4 hover:px-3 hover:py-1.5 rounded-full'} text-sm font-medium border border-black/30 transition-colors duration-300 ${
                            attendance[date] === 'Bor edi'
                                ? 'bg-teal-500 text-white'
                                : attendance[date] === 'Yo\'q'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => handleClick(date)}
                        onMouseEnter={() => handleMouseEnter(date)}
                        onMouseLeave={handleMouseLeave}
                        aria-label={`Attendance for ${date}`}
                    >
                        {attendance[date] || (hoveredDate === date ? 'Bor edi' : '')}
                    </div>
                </td>
            ))}
        </tr>
    );
};

export default StudentRow;
