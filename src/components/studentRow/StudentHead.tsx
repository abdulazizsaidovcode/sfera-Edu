import { FC, useEffect } from "react";
import StudentRow from "./Studentrow";
import { useAttendase, useGroupId } from "@/context/logic/state-managment/teacher/teacher";
import { groupAttendace } from "@/context/logic/course";


interface AttendanceTableProps {
    active: number;
    setActive: (monthId: number) => void;
}

const AttendanceTable: FC<AttendanceTableProps> = ({ active, setActive }) => {
    const { selectedGroupId } = useGroupId();
    const year = new Date().getFullYear();
    const { getAttendase, setAttendase } = useAttendase();
    useEffect(() => {
        groupAttendace(selectedGroupId, year, active, setAttendase);
    }, [selectedGroupId, year, active]);

    console.log("sana ", getAttendase);

    const dates = [
        '1 sent', '3 sent', '6 sent', '8 sent', '10 sent', '13 sent', '15 sent', '16 sent', '17 sent',
        '18 sent', '19 sent', '20 sent', '21 sent', '22 sent', '23 sent', '24 sent', '25 sent', '26 sent',
        '27 sent', '28 sent', '29 sent'
    ];

    const names = [
        'Akobir Quronov', 'Муниса Рахматова', 'Niso Khamraeva', 'Xudayberganova Intizor', 'Mahmudov Temur',
        'Masharipova Gulrux'
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
        <div className="w-3/4 bg-white p-6 shadow-md rounded-lg">
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
                {months.map((month) => (
                    <span
                        key={month.id}
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
                            {getAttendase?.days?.map((day: any, index: number) => (
                                <th key={index} className="text-center font-medium border-b border-black/50 min-w-24">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {names.map((name, index) => (
                            <StudentRow key={index} name={name} dates={getAttendase?.days} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTable;
