import { FC, useEffect } from "react";
import StudentRow from "./Studentrow";
import { useAttendase, useGroupId } from "@/context/logic/state-managment/teacher/teacher";
import { groupAttendace } from "@/context/logic/course";
import moment from "moment";
import ShinyButton from "../magicui/shiny-button";

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
    }, [selectedGroupId, year, active, setAttendase]);

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
        { month: 'Dek', id: 12 },
    ];

    const isToday = (date: string) => {
        const today = moment().format('YYYY-MM-DD');
        return moment(date).isSame(today, 'day');
    };

    // Log attendance data for each student
    const handleSaveClick = () => {
        getAttendase?.forEach((student: any) => {
            student.attendDtoList.forEach((attendance: { date: string, status: string }) => {
                console.log(`Student ID: ${student.id}, Date: ${attendance.date}, Attendance: ${attendance.status}`);
            });
        });
    };

    return (
        <div className="relative w-3/4 bg-white p-6 shadow-md rounded-lg">
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
                {months.map((month) => (
                    <span
                        key={month.id}
                        onClick={() => setActive(month.id)}
                        className={`${month.id === active ? 'text-orange-600 font-bold border-orange-600' : 'border-black/40'
                            } border rounded-xl px-4 py-1.5 hover:cursor-pointer shadow-md`}
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
                            {getAttendase?.[0]?.attendDtoList?.map((item: { date: string }, index: number) => (
                                <th
                                    key={index}
                                    className={`text-center font-medium border-b border-black/50 min-w-24 ${!isToday(item.date) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                                        }`}
                                    style={{ pointerEvents: !isToday(item.date) ? 'none' : 'auto' }}
                                >
                                    {moment(item.date).format('DD MMM')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getAttendase?.length > 0 ? (
                            getAttendase.map((student: any, index: number) => (
                                <StudentRow
                                    key={index}
                                    name={student}
                                    dates={student.attendDtoList}
                                    checkData={student}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12} className="text-center text-gray-400">
                                    Guruh ochilmagan yoki talabalar mavjud emas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {getAttendase?.length > 0 && (
                <div className="absolute bottom-5 right-5">
                    <ShinyButton text={'Saqlash'} className={'bg-blue-600'} onClick={handleSaveClick} />
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
