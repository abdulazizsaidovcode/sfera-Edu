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
    const today = moment().format('YYYY-MM-DD'); // Get today's date in the format YYYY-MM-DD

    useEffect(() => {
        groupAttendace(selectedGroupId, year, active, setAttendase);
    }, [selectedGroupId, year, active]);

    // const dates = [
    //     '1 sent', '3 sent', '6 sent', '8 sent', '10 sent', '13 sent', '15 sent', '16 sent', '17 sent',
    //     '18 sent', '19 sent', '20 sent', '21 sent', '22 sent', '23 sent', '24 sent', '25 sent', '26 sent',
    //     '27 sent', '28 sent', '29 sent'
    // ];

    // const names = [
    //     'Akobir Quronov', 'Муниса Рахматова', 'Niso Khamraeva', 'Xudayberganova Intizor', 'Mahmudov Temur',
    //     'Masharipova Gulrux'
    // ];

    console.log(getOneGroup);

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

    // Disable past dates in the attendance table
    const isFutureDate = (date: string) => {
        return moment(date).isSameOrAfter(today);
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
                                    className={`text-center font-medium border-b border-black/50 min-w-24 ${
                                        !isFutureDate(date) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                                    }`}
                                    // Prevent interaction with past dates
                                    style={{ pointerEvents: !isFutureDate(date) ? 'none' : 'auto' }}
                                >
                                    {moment(date).format('DD MMM')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getOneGroup?.students?.length > 0 ? getOneGroup?.students?.map((name: { fullName: string; studentId: number }, index: number) => (
                            <StudentRow
                                key={index}
                                name={name}
                                dates={getAttendase?.days}
                                checkData={getAttendase?.attendanceDtos}
                            />
                        )) : (
                            <tr>
                                <td colSpan={getAttendase?.days?.length} className={'py-3 text-center'}>Studentlar mavjud emas</td>
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
                        onClick={() => {}}
                    />
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
