
import TaskAccardion from "@/components/accordion/taskAccardion/taskAccardion";
import ShinyButton from "@/components/magicui/shiny-button";

const Completed_tasks = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Completed Taskslar</h1>

            {/* Birinchi accordion */}
            <TaskAccardion
                number={1}
                firstName="Sardor"
                lastName="Bekov"
                groupName="Dasturchilar"
            >
                {/* Ichki accordion - table shaklida */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">№</th>
                                <th className="px-4 py-2 border">Saturation</th>
                                <th className="px-4 py-2 border">File download</th>
                                <th className="px-4 py-2 border">Ball</th>
                                <th className="px-4 py-2 border">Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border">1</td>
                                <td className="px-4 py-2 border">Task 1.1</td>
                                <td className="px-4 py-2 border">Bajarildi</td>
                                <td className="px-4 py-2 border">Bajarildi</td>
                                <td className="px-4 py-2 border">
                                    <ShinyButton text="Baholash" className="bg-green-500 hover:bg-green-600" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TaskAccardion>

            <TaskAccardion
                number={2}
                firstName="Sardorbek"
                lastName="Sayfullayev"
                groupName="Dasturchilar"
            >
                {/* Ichki accordion - table shaklida */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">№</th>
                                <th className="px-4 py-2 border">Saturation</th>
                                <th className="px-4 py-2 border">File download</th>
                                <th className="px-4 py-2 border">Ball</th>
                                <th className="px-4 py-2 border">Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border">1</td>
                                <td className="px-4 py-2 border">Task 1.1</td>
                                <td className="px-4 py-2 border">Bajarildi</td>
                                <td className="px-4 py-2 border">Bajarildi</td>
                                <td className="px-4 py-2 border">
                                    <ShinyButton text="Baholash" className="bg-green-500 hover:bg-green-600" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TaskAccardion>
        </div>
    );
};

export default Completed_tasks;
