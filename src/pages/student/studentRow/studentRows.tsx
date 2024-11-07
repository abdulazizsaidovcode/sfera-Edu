import React, { FC } from "react";
import moment from "moment";

interface StudentRowProps {
    studentLastName: string;
    studentName: string;
    attendanceDate: string;
    isPresent: boolean;
    rowIndex: number;
}

const StudentRows: FC<StudentRowProps> = ({ studentLastName, studentName, attendanceDate, isPresent, rowIndex }) => {
    return (
        <tr className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
            <td className="border-b border-gray p-3 text-center">{rowIndex}</td> {/* Tartib raqami */}
            <td className="border-b border-gray p-3 text-center">{studentLastName} {studentName}</td>
            <td className="border-b border-gray p-3 text-center">
                <span className={`px-2 py-1 rounded-lg ${isPresent ? 'bg-green-400 px-8 text-black' : 'bg-red-100 text-red-700'}`}>
                    {isPresent ? "Bor" : "Yo'q"}
                </span>
            </td>
            <td className="border-b border-gray p-3 text-center">
                {moment(attendanceDate).format("YYYY-MM-DD")}
            </td>
        </tr>
    );
};

export default StudentRows;
