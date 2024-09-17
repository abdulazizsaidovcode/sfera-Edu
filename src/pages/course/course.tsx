import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { getCourses, getLesson, getModules } from "@/context/logic/course";
import { useCategory, useLesson } from "@/context/logic/state-managment/course";
import { useModule } from "@/context/logic/state-managment/module";


const Course = () => {
  const { setCategoryData, categoryData } = useCategory();
  const { setLessonData, lessonData } = useLesson();
  const { setModuleData, moduleData } = useModule();
  const navigate = useNavigate();
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleAccordion = (moduleId: string) => {
    if (openAccordionId === moduleId) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(moduleId);
      getLesson(moduleId, setLessonData); // Fetch lessons when accordion is opened
    }
  };

  useEffect(() => {
    if (!categoryData || !categoryData.name) {
      setLoading(true);
      getCourses(setCategoryData).finally(() => setLoading(false));
    }
  }, [setCategoryData, categoryData]);

  useEffect(() => {
    if (categoryData && categoryData.id) {
      setLoading(true);
      getModules(categoryData.id, setModuleData).finally(() => setLoading(false));
    }
  }, [categoryData, setModuleData]);

  const handleNavigateToLesson = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`); // Lesson sahifasiga o'tish
  };

  const hasData = categoryData && categoryData.name;
  const accordionData = (moduleData || []).map((modulData: any) => ({
    moduleId: modulData.moduleId,
    title: `${modulData.name} `,
    icon: <MdDevices />,
  }));

  return (
    <>
    </>
    // <div className="hs-accordion-group">
    //   <SlightFlip
    //     word="Lesson"
    //     justify="right"
    //     className="text-3xl font-bold mb-6 text-gray-800"
    //   />
    //   {loading ? (
    //     <div className="flex justify-center items-center h-48">
    //       Loading....
    //     </div>
    //   ) : hasData ? (
    //     <>
    //       <ShineBorder
    //         color={"#16423C"}
    //         borderWidth={1.5}
    //         duration={10}
    //         className="bg-[#fff] h-40 w-full flex items-center justify-center relative rounded-lg shadow-lg mb-6"
    //       >
    //         <Particles
    //           className="absolute inset-0"
    //           quantity={100}
    //           ease={80}
    //           color={"#16423C"}
    //           refresh
    //         />
    //         <div className="relative z-10 text-center">
    //           <SlightFlip
    //             word={`Guruhingiz: ${categoryData.name}`}
    //             className="text-4xl font-bold text-black"
    //           />
    //           <p className="text-black mt-2 font-semibold">
    //             Darslarni hoziroq boshlang
    //           </p>
    //         </div>
    //       </ShineBorder>

    //       {accordionData.length > 0 ? (
    //         accordionData.map((moduleData: any) => (
    //           <AccordionItem
    //             key={moduleData.moduleId}
    //             id={moduleData.moduleId}
    //             title={moduleData.title}
    //             icon={moduleData.icon}
    //             isOpen={openAccordionId === moduleData.moduleId}
    //             toggle={() => toggleAccordion(moduleData.moduleId)}
    //           >
    //             {openAccordionId === moduleData.moduleId &&
    //               lessonData &&
    //               lessonData.length > 0 && (
    //                 <div>
    //                   {lessonData.map((lesson: any) => (
    //                     <button
    //                       key={lesson.id}
    //                       onClick={() => handleNavigateToLesson(lesson.id)}
    //                       className="block w-full text-left py-2 bg-[#6A9C89] mb-2 px-4 hover:bg-gray-100 transition flex items-center"
    //                     >
    //                       {/* Video Icon */}
    //                       <FaVideo className="mr-4 text-2xl text-black" />
    //                       {/* Lesson Name */}
    //                       <span className="font-bold text-[#0c0a09]">
    //                         {lesson.name}
    //                       </span>
    //                       {/* Lesson Duration */}
    //                       <p className="ml-auto text-[#0c0a09] font-bold">
    //                         {`${lesson.videoTime}`}{" "}
    //                         <span className="text-[#1e293b]">minut</span>
    //                       </p>
    //                     </button>
    //                   ))}
    //                 </div>
    //               )}
    //           </AccordionItem>
    //         ))
    //       ) : (
    //         <p className="text-center text-red-600">
    //           Accordion data mavjud emas
    //         </p>
    //       )}
    //     </>
    //   ) : (
    //     <p className="text-center font-bold text-2xl mt-6 text-red-600">
    //       Ma'lumot mavjud emas
    //     </p>
    //   )}
    // </div>
  );
};

export default Course;
