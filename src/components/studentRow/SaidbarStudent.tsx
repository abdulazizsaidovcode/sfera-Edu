import { useEffect } from "react";
import { Select } from "antd";
import { getTeacherGroup, groupOne } from "@/context/logic/course";
import { useGroupAll, useGroupId, useTeacherAllGroup } from "@/context/logic/state-managment/teacher/teacher";

const SidebarStudent = () => {
    const { teacherAllGroup, setTeacherAllGroup } = useTeacherAllGroup();
    const { selectedGroupId, setSelectedGroupId } = useGroupId();
    const { getOneGroup, setgetOneGroup } = useGroupAll();

    useEffect(() => {
        getTeacherGroup(setTeacherAllGroup);
    }, []);

    const handleSelectChange = (value:any) => {
        setSelectedGroupId(value);
        setgetOneGroup(null);
    };

    useEffect(() => {
        if (selectedGroupId) {
            const fetchData = async () => {
                await groupOne(selectedGroupId, setgetOneGroup);
            };
            fetchData();
        }
    }, [selectedGroupId, setgetOneGroup]);
    const totalStudentCount = getOneGroup?.students?.length || 0;
    const activeStudentCount = getOneGroup?.students?.filter((student:{active:boolean}) => student.active).length || 0;
    const deActiveStudentCount = totalStudentCount - activeStudentCount;

    return (
        <div className="bg-white p-6 w-1/4 shadow-md rounded-lg">
            <Select
                placeholder="Select a group"
                className="w-full mb-4"
                allowClear
                onChange={handleSelectChange}
            >
                {teacherAllGroup?.map((group:any) => (
                    <Select.Option key={group.id} value={group.id}>
                        {group.name}
                    </Select.Option>
                ))}
            </Select>

            {selectedGroupId ? (
                getOneGroup ? (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">{getOneGroup.name}</h2>
                        <p className="mt-2"><strong>O'qituvchi: </strong>{getOneGroup.teacherName}</p>
                        <p className="text-gray-500"><strong>Dars boshlanish vaqti:</strong> {getOneGroup.startTime}</p>
                        <p className="text-gray-500"><strong>Dars tugash vaqti:</strong> {getOneGroup.endTime}</p>
                        <p className="text-gray-500"><strong>Days:</strong> {getOneGroup.daysName.join(", ")}</p>

                        <h3 className="text-lg font-semibold mt-4 mb-2"><strong>Students</strong></h3>
                        Jami o'quvchilar soni: <span className="text-blue-600 font-bold">{totalStudentCount}</span> <br />
                        Guruhda o'qiyotgan: <span className="text-green-600 font-bold">{activeStudentCount}</span> <br />
                        Guruhdan chiqib ketgan:<span className="text-red-600 font-bold">{deActiveStudentCount}</span>

                        <ul className="mt-2 space-y-2 mt-4">
                            {getOneGroup?.students?.map((student:any, index:number) => (
                                <li 
                                    key={index} 
                                    className={`text-gray-800 ${!student.active ? 'line-through text-red-500' : ''}`}
                                >
                                    {index + 1}. {student.fullName}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-600">Loading group details...</p>
                )
            ) : (
                <p className="text-gray-600">Please select a group</p>
            )}
        </div>
    );
};

export default SidebarStudent;
