import { FC, useEffect } from "react";
import { useStudentDavomat } from "@/context/logic/state-managment/teacher/teacher";
import { AttandanceStudent } from "@/context/logic/course";
import moment from "moment";
import StudentRows from "./studentRows";

interface AttendanceTableProps {
    active: number;
    setActive: (monthId: number) => void;
}

const DavomatStudent: FC<AttendanceTableProps> = ({ active, setActive }) => {
    const { davomat, setDavomat } = useStudentDavomat();

    useEffect(() => {
        AttandanceStudent(active, setDavomat);
    }, [active, setDavomat]);

    const months = [
        { month: 'Yan', id: 1 },
        { month: 'Fev', id: 2 },
        { month: 'Mar', id: 3 },
        { month: 'Apr', id: 4 },
        { month: 'May', id: 5 },
        { month: 'Jun', id: 6 },
        { month: 'Jul', id: 7 },
        { month: 'Avg', id: 8 },
        { month: 'Sen', id: 9 },
        { month: 'Oct', id: 10 },
        { month: 'Noy', id: 11 },
        { month: 'Dek', id: 12 }
    ];

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg relative max-w-screen-lg mx-auto">
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
                {months.map((month, index) => (
                    <span
                        key={index}
                        onClick={() => setActive(month.id)}
                        className={`${month.id === active ? 'text-orange-600 font-bold border-orange-600' : 'border-gray-300'} border rounded-xl px-4 py-1.5 hover:cursor-pointer shadow-md`}
                    >
                        {month.month}
                    </span>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="font-semibold border-b border-gray-300 p-3 text-center">T/r</th>
                            <th className="font-semibold border-b border-gray-300 p-3 text-center">Ism familiya</th>
                            <th className="font-semibold border-b border-gray-300 p-3 text-center">Qatnashish Holati</th>
                            <th className="font-semibold border-b border-gray-300 p-3 text-center">Sana</th>
                        </tr>
                    </thead>
                    <tbody>
                        {davomat?.length > 0 ? davomat.map((attendance: any, index: number) => (
                            <StudentRows
                                key={index}
                                studentLastName={attendance?.studentLastName}
                                studentName={attendance?.studentName}
                                attendanceDate={attendance?.date}
                                isPresent={attendance?.attendance}
                                rowIndex={index + 1} 
                            />
                        )) : (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-500">Davomat mavjud emas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DavomatStudent;
