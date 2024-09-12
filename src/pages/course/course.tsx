import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import AccordionItem from "@/components/accordion/accordion";
import { getCourses, getModules } from "@/context/logic/course";
import { useCategory } from "@/context/logic/state-managment/course";
import { useModule } from "@/context/logic/state-managment/module";
import { config } from "@/context/api/token";
import SlightFlip from "@/components/magicui/flip-text";

const Course = () => {
  const { setCategoryData, categoryData } = useCategory();
  const { setModuleData, moduleData } = useModule();
  const navigate = useNavigate();
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  useEffect(() => {
    getCourses(setCategoryData);
  }, []);

  const hasData = categoryData && categoryData.name;
  const accordionData = (moduleData || []).map((modulData: any) => ({
    id: `parentAccordion${modulData.id}`,
    title: `${modulData.name}`,
    icon: <MdDevices />,
  }));

  return (
    <div className="hs-accordion-group">
      <SlightFlip
        word="Lesson"
        justify="right"
        className="text-3xl font-bold mb-6 text-gray-800" />
      {hasData ? (
        <>
          {/* Custom YouTube-style gradient banner */}
          <div className="bg-[#16423C] h-40 w-full flex items-center justify-center relative rounded-lg shadow-lg mb-6">
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div> {/* Dark overlay */}
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white">
                Guruhingiz: <span className="text-white">{categoryData.name || ''}</span>
              </h2>
              <p className="text-white mt-2 font-semibold">Darslarni hoziroq boshlang</p>
            </div>
          </div>

          {accordionData.length > 0 ? (
            accordionData.map((moduleData: any) => (
              <AccordionItem
                key={moduleData.moduleId}
                id={moduleData.moduleId}
                title={moduleData.title}
                icon={moduleData.icon}
                isOpen={openAccordionId === moduleData.moduleId}
                toggle={() => toggleAccordion(moduleData.moduleId)}
              >
              </AccordionItem>
            ))
          ) : (
            <p className="text-center text-red-600">Accordion data mavjud emas</p>
          )}
        </>
      ) : (
        <p className="text-center font-bold text-2xl mt-6 text-red-600">Ma'lumot mavjud emas</p>
      )}
    </div>
  );
};

export default Course;
