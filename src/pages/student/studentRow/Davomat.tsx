import SidebarStudent from "@/components/studentRow/SaidbarStudent";
import AttendanceTable from "@/components/studentRow/StudentHead";
import { useState } from "react";
// import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import DavomatStudent from "./studentDavomat";


const StudentDavomat = () => {
    const { id, name } = useParams<{ id: string; name: string }>();
    const [active, setActive] = useState(new Date().getMonth() + 1)
    console.log(`id: ${id}, name: ${name}`);

    return (
        <>
            {/* <Breadcrumb pageName={`Guruhlar`} subPage={'Davomat'}/> */}

            <div className="flex bg-gray-100 min-h-screen space-x-4">
                <DavomatStudent active={active} setActive={setActive} />
            </div>
        </>
    );
};

export default StudentDavomat;
