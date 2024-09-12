import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import AccordionItem from "@/components/accordion/accordion";
import { getCourses, getModules } from "@/context/logic/course";
import { useCategory } from "@/context/logic/state-managment/course";
import { useModule } from "@/context/logic/state-managment/module";
import { config } from "@/context/api/token";
import SlightFlip from "@/components/magicui/flip-text";
import Particles from "@/components/magicui/particles";
import ShineBorder from "@/components/magicui/shine-border";

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
    const id = categoryData?.id;
    getModules(id, setModuleData);
  }, []);
  console.log(moduleData);
  console.log(categoryData);



  const hasData = categoryData && categoryData.name;
  const accordionData = (moduleData || []).map((modulData: any) => ({
    id: `parentAccordion${modulData.id}`, // `id` qiymatini to'g'ri tarzda ishlatish
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
          <ShineBorder color={'#16423C'} borderWidth={1.5} duration={10} className="bg-[#fff] h-40 w-full flex items-center justify-center relative rounded-lg shadow-lg mb-6">
            <Particles
              className="absolute inset-0"
              quantity={100}
              ease={80}
              color={'#16423C'}
              refresh
            />
            <div className="relative z-10 text-center">
              <SlightFlip
                word={`Guruhingiz: ${categoryData.name}`}
                className="text-4xl font-bold text-black" />
              <p className="text-black mt-2 font-semibold">Darslarni hoziroq boshlang</p>
            </div>
          </ShineBorder>

          {accordionData.length > 0 ? (
            accordionData.map((moduleData: any) => (
              <AccordionItem
                key={moduleData.id}
                id={moduleData.id}
                title={moduleData.title}
                icon={moduleData.icon}
                isOpen={openAccordionId === moduleData.id}
                toggle={() => toggleAccordion(moduleData.id)}
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
