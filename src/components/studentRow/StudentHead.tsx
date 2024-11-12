import { FC, useEffect, useState } from "react";
import { useAttendase, useGroupId } from "@/context/logic/state-managment/teacher/teacher";
import { groupAttendace } from "@/context/logic/course";
import moment from "moment";
import ShinyButton from "../magicui/shiny-button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRow from "./Studentrow";
import axios from "axios";
import { attendanceCreate } from "@/context/api/url";
import { config } from "@/context/api/token";

interface AttendanceTableProps {
    active: number;
    setActive: (monthId: number) => void;
}

export interface IStudentData {
    studentId: number;
    attendance: boolean;
    date: string;
}


export interface IAttendance {
    attendDtoList: {
        attendance: null | boolean;
        date: string;
        id: null | number;
    }[];
    studentId: number;
    studentLastName: string;
    studentName: string;
}

const AttendanceTable: FC<AttendanceTableProps> = ({ active, setActive }) => {
    const { selectedGroupId } = useGroupId();
    const year = new Date().getFullYear();
    const { getAttendase, setAttendase } = useAttendase();
    const [attendanceData, setAttendanceData] = useState<IStudentData[]>([]);
    const [addLoading, setAddLoading] = useState(false);
    const [addResponse, setAddResponse] = useState(null);

    useEffect(() => {
        groupAttendace(selectedGroupId, year, active, setAttendase);
    }, [selectedGroupId, year, active, setAttendase]);

    useEffect(() => {
        setAttendanceData([]);
    }, [active]);

    useEffect(() => {
        if (addResponse) {
            setAttendanceData([]);
        }
    }, [addResponse]);

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
    // const isToday = (date: string) => {
    //     const today = moment().format('YYYY-MM-DD');
    //     return moment(date).isSame(today, 'day');
    // };
    const handleUpdateAttendance = (data: IStudentData[]) => {
        setAttendanceData((prev) => {
            const filtered = prev.filter(
                (item) => item.studentId !== data[0].studentId || item.date !== data[0].date
            );
            return [...filtered, ...data];
        });
    };
    const addAttendance = async () => {
        try {
            if (attendanceData.length === 0) {
                toast.error('Hech bo\'lmaganda 1 ta o\'quvchini tanlang!');
                return;
            }
            setAddLoading(true);
            const response = await axios.post(attendanceCreate, attendanceData, config);
            setAddResponse(response.data);
            toast.success("Davomat ma'lumotlari muvaffaqiyatli saqlandi");
        } catch (error) {
            toast.error("Davomat ma'lumotlarini saqlashda xatolik yuz berdi");
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <div className="relative w-3/4 bg-white p-6 shadow-md rounded-lg">
            <ToastContainer position="top-right" autoClose={3000} />
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
                            {getAttendase?.length > 0 && <th className="font-medium border-b border-black/50 p-2">Ism</th>}
                            {getAttendase?.length > 0 && getAttendase[0].attendDtoList.map((date:any, index:number) => (
                                <th key={index} className="text-center font-medium border-b border-black/50 min-w-24">
                                    {moment(date.date).format('DD MMM')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getAttendase?.length > 0 ? (
                            getAttendase.map((item: IAttendance, index: number) => (
                                <StudentRow
                                    key={index}
                                    data={item}
                                    updateAttendance={handleUpdateAttendance}
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
            <div className="flex justify-end mt-5">
                <ShinyButton
                    text={addLoading ? 'Yuborilmoqda...' : 'Saqlash'}
                    className={`bg-blue-600 ${addLoading && 'cursor-not-allowed opacity-60'}`}
                    onClick={() => addAttendance()}
                />
            </div>
        </div>
    );
};

export default AttendanceTable;
