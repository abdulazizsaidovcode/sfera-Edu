
import Tables from "@/components/custom/table";
import TextInput from "@/components/Inputs/TextInput";
import { SelectComponent } from "@/components/select/select";
import { FaEdit, FaTrash } from "react-icons/fa";

export const dashboardThead = [
  { id: 1, name: 'T/r' },
  { id: 2, name: 'Familiya' },
  { id: 3, name: 'Ism' },
  { id: 4, name: 'Ball' },
  { id: 5, name: 'Amallar' }, // Amallar ustuni uchun sarlavha qo'shish
];

const students = [
  { id: 1, lastname: 'Smith', firstname: 'John', score: 85 },
  { id: 2, lastname: 'Doe', firstname: 'Jane', score: 90 },
  { id: 3, lastname: 'Brown', firstname: 'Mike', score: 78 },
  { id: 4, lastname: 'Taylor', firstname: 'Emily', score: 92 },
  { id: 5, lastname: 'Johnson', firstname: 'Chris', score: 88 },
];

const Students = () => {
  return (
    <div>
      {/* Select va Inputni yonma-yon joylashtirish uchun Flex konteyneri */}
      <div className="flex flex-wrap gap-6 mb-8 justify-between">
        <div className="w-full md:w-auto flex-1">
          <SelectComponent
            label="Mevalar"
            options={[
              { value: 'apple', label: 'Olma' },
              { value: 'banana', label: 'Banan' },
              { value: 'blueberry', label: 'Ko‘k meva' },
              { value: 'grapes', label: 'Uzum' },
              { value: 'pineapple', label: 'Ananas' },
            ]}
            placeholder="Kategoriyani tanlang"
          />
        </div>
        <div className="w-full md:w-auto flex-1">
          <SelectComponent
            label="Mevalar"
            options={[
              { value: 'apple', label: 'Olma' },
              { value: 'banana', label: 'Banan' },
              { value: 'blueberry', label: 'Ko‘k meva' },
              { value: 'grapes', label: 'Uzum' },
              { value: 'pineapple', label: 'Ananas' },
            ]}
            placeholder="Modulni tanlang"
          />
        </div>
        <div className="w-full md:w-auto flex-1">
          <TextInput placeholder=" 🔍 Qidiruv..." />
        </div>
      </div>
      <div className="shadow-lg">
        <Tables thead={dashboardThead}>
          {students && students.length > 0 ? (
            students.map((student: any, index: any) => (
              <tr key={student.id || index} className="hover:bg-gray duration-100">
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.lastname ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.firstname ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.score ?? 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] min-w-[160px]">
                  <div className="flex gap-10">
                    <div className="text-blue-500 mt-3 hover:text-yellow-600 cursor-pointer">
                      <FaEdit />
                    </div>
                    <div className="text-blue-500 mt-3 hover:text-red-700 cursor-pointer">
                      <FaTrash />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={dashboardThead.length} className="text-center py-4">
                Ma'lumotlar mavjud emas
              </td>
            </tr>
          )}
        </Tables>
      </div>
    </div>
  );
};

export default Students;
