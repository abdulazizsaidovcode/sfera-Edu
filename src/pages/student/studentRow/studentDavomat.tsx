import { FC, useEffect } from "react";
import { useAttendase, useGroupId, useStudentDavomat } from "@/context/logic/state-managment/teacher/teacher";
import { AttandanceStudent, groupAttendace } from "@/context/logic/course";
import StudentHead from "./StudentHead";


interface AttendanceTableProps {
    active: number;
    setActive: (monthId: number) => void;
}

const DavomatStudent: FC<AttendanceTableProps> = ({ active, setActive }) => {
    
   const {davomat, setDavomat} = useStudentDavomat();
   useEffect(() => {
    AttandanceStudent(active, setDavomat);
}, [setDavomat]);

console.log("student",davomat);

    const dates = [
        '1 sent', '3 sent', '6 sent', '8 sent', '10 sent', '13 sent', '15 sent', '16 sent', '17 sent',
        '18 sent', '19 sent', '20 sent', '21 sent', '22 sent', '23 sent', '24 sent', '25 sent', '26 sent',
        '27 sent', '28 sent', '29 sent'
    ];

    const names = [
        'Akobir Quronov'
    ];

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
        <div className="w-3/4 bg-white p-6 shadow-md rounded-lg relative">
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
            {months.map((month, index) => (
                <span
                    key={index}
                    onClick={() => setActive(month.id)}
                    className={`${month.id === active ? 'text-orange-600 font-bold border-orange-600' : 'border-black/40'} border rounded-xl px-4 py-1.5 hover:cursor-pointer shadow-md`}
                >
                    {month.month}
                </span>
            ))}
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr>
                    <th className="font-medium border-b border-black/50 p-2">Ism</th>
                    {davomat?.days?.length > 0 && davomat.days.map((date: string, index: number) => (
                        <th key={index} className="text-center font-medium border-b border-black/50 min-w-24">
                            {date(date).format('DD MMM')}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {/* {groupRes?.students?.length > 0 ? groupRes.students.map((name: {
                    fullName: string
                    studentId: number
                }, index: number) => (
                    <StudentRow
                        key={index}
                        name={name}
                        dates={response?.days}
                        checkData={response?.attendanceDtos}
                    />
                )) : <>
                    <tr>
                        <td colSpan={response?.days?.length} className={'py-3 text-center'}>Studentlar mavjud emas</td>
                    </tr>
                </>} */}
                </tbody>
            </table>
        </div>
        {/* {groupRes?.students?.length > 0 && (
            <div
                className={`${groupRes.students.length >= 6 ? 'flex justify-end mt-7' : 'absolute bottom-5 right-5'}`}
            >
                <ShinyButton
                    text={'Saqlash'}
                    className={'bg-darkGreen'}
                    onClick={() => {
                    }}
                />
            </div>
        )} */}
    </div>
    );
};

export default DavomatStudent;
