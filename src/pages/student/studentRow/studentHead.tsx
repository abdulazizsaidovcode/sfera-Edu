
import React, {useState} from 'react';

interface StudentRowProps {
    name: string;
    dates: string[];
}

const StudentHead: React.FC<StudentRowProps> = ({name, dates}) => {
    const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
    const handleClick = (date: string, status: string) => setAttendance({...attendance, [date]: status});

    return (
        <tr className="border-b border-black/40">
            <td className="p-3 pl-1 pr-5">{name}</td>
            {dates?.map((date, index) => (
                <td key={index} className="text-center p-2 min-w-24">
                    <div
                        className={`cursor-pointer ${attendance[date] ? 'px-3 py-1.5 rounded-xl' : 'p-4 hover:px-3 hover:py-1.5 rounded-full'} text-sm font-medium border border-black/30 transition-colors duration-300 ${
                            attendance[date] === 'Bor edi'
                                ? 'bg-teal-500 text-white'
                                : attendance[date] === 'Yo\'q'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => handleClick(date, attendance[date] === 'Bor edi' ? 'Yo\'q' : 'Bor edi')}
                        onMouseEnter={(e) => e.currentTarget.innerText = attendance[date] === 'Bor edi' ? 'Yo\'q' : 'Bor edi'}
                        onMouseLeave={(e) => e.currentTarget.innerText = attendance[date] || ''}
                    >
                        {attendance[date] || ''}
                    </div>
                </td>
            ))}
        </tr>
    );
};

export default StudentHead;
