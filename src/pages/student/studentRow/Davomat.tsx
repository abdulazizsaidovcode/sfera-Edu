import { useState } from "react";
import { useParams } from "react-router-dom";
import DavomatStudent from "./studentDavomat";

const StudentDavomat = () => {
    const { id, name } = useParams<{ id: string; name: string }>();
    const [active, setActive] = useState(new Date().getMonth() + 1);
    console.log(`id: ${id}, name: ${name}`);

    return (
        <div className="flex justify-center  bg-gray-300">
            <div className="w-full max-w-5xl p-4 overflow-x-auto lg:overflow-x-auto lg:overflow-y-auto">
                <DavomatStudent active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default StudentDavomat;
