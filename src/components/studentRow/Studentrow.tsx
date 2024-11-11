import React, { useState } from 'react';
import moment from 'moment';

interface AttendanceData {
    id: number | null;
    attendance: boolean | null;
    date: string;
}

interface StudentRowProps {
    name: {
        studentLastName: string;
        studentName: string;
    };
    dates: AttendanceData[];
    checkData: (date: string, status: string, firstName: string, lastName: string) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({ name, dates, checkData }) => {
    const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
    const today = moment().format('YYYY-MM-DD'); // Bugungi sana

    // Yangi `getAttendanceStatus` funksiyasi
    const getAttendanceStatus = (item: AttendanceData) => {
        if (attendance[item.date] === 'Bor edi') {
            return { text: 'Bor edi', class: 'bg-teal-500 text-white' };
        } else if (attendance[item.date] === 'Yo\'q') {
            return { text: 'Yo\'q', class: 'bg-blue-500 text-white' };
        } else if (item.attendance === true) {
            return { text: 'Bor edi', class: 'bg-teal-500 text-white' };
        } else if (item.attendance === false) {
            return { text: 'Yo\'q', class: 'bg-blue-500 text-white' };
        }
        return { text: '', class: 'px-3' };
    };
    const handleClick = (date: string, status: string) => {
        setAttendance({ ...attendance, [date]: status });
        checkData(date, status, name.studentName, name.studentLastName);
    };

    return (
        <tr className="border-b border-black/40">
            <td className="p-3 pl-1 pr-5">
                {name.studentName} {name.studentLastName}
            </td>
            {dates.map((item, index) => {
                const { text, class: statusClass } = getAttendanceStatus(item);
                const isPastDate = item.date < today; 
                const isFutureDate = item.date > today; 

                return (
                    <td key={index} className="text-center p-2 min-w-24">
                        <div
                            className={`${
                                isPastDate || isFutureDate ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                            } ${
                                attendance[item.date] || item.attendance !== null
                                    ? 'px-3 py-1.5 rounded-xl'
                                    : 'p-4 hover:px-3 hover:py-1.5 rounded-full'
                            } text-sm font-medium border border-black/30 transition-colors duration-300 ${statusClass}`}
                            onClick={() => {
                                if (item.date === today) {
                                    const newStatus = attendance[item.date] === 'Bor edi' ? 'Yo\'q' : 'Bor edi';
                                    handleClick(item.date, newStatus);
                                }
                            }}
                            onMouseEnter={(e) => {
                                if (item.date === today) {
                                    e.currentTarget.innerText = attendance[item.date] === 'Bor edi' ? 'Yo\'q' : 'Bor edi';
                                } else if (isPastDate || isFutureDate) {
                                    e.currentTarget.innerText = 'Bor edi'; // Hover bo'lganda Bor edi ko'rsatilsin
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.innerText = attendance[item.date] || text;
                            }}
                        >
                            {attendance[item.date] || text}
                        </div>
                    </td>
                );
            })}
        </tr>
    );
};

export default StudentRow;
