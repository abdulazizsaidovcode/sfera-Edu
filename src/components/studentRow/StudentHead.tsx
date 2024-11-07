import { FC, useEffect } from "react";
import StudentRow from "./Studentrow";
import { useAttendase, useGroupAll, useGroupId } from "@/context/logic/state-managment/teacher/teacher";
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
    const { getOneGroup } = useGroupAll();
    const { getAttendase, setAttendase } = useAttendase();
    const today = moment().format('YYYY-MM-DD');

    useEffect(() => {
        groupAttendace(selectedGroupId, year, active, setAttendase);
    }, [selectedGroupId, year, active]);

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
    const isToday = (date: string) => {
        return moment(date).isSame(today, 'day');
    };

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
                            {getAttendase?.days?.length > 0 && getAttendase?.days?.map((date: string, index: number) => (
                                <th
                                    key={index}
                                    className={`text-center font-medium border-b border-black/50 min-w-24 ${!isToday(date) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}`}
                                    style={{ pointerEvents: !isToday(date) ? 'none' : 'auto' }}  // Disable for non-today dates
                                >
                                    {moment(date).format('DD MMM')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {active && getOneGroup?.students?.length > 0 ? (
                            getOneGroup?.students
                                .filter((student:any) => student.active)
                                .map((name: { fullName: string; studentId: number; active: boolean }, index: number) => (
                                    <StudentRow
                                        key={index}
                                        name={name}
                                        dates={getAttendase?.days}
                                        checkData={getAttendase?.attendanceDtos}
                                    />
                                ))
                        ) : (
                            <tr>
                                <td colSpan={getAttendase?.days?.length + 1} className="text-center text-gray-400">No students available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {getAttendase?.students?.length > 0 && (
                <div
                    className={`${getAttendase.students.length >= 6 ? 'flex justify-end mt-7' : 'absolute bottom-5 right-5'}`}
                >
                    <ShinyButton
                        text={'Saqlash'}
                        className={'bg-darkGreen'}
                        onClick={() => { }}
                    />
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
