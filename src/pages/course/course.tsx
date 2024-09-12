import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import AccordionItem from "@/components/accordion/accordion";
import { getCourses, getModules} from "@/context/logic/course";
import { useCategory } from "@/context/logic/state-managment/course";
import { useModule } from "@/context/logic/state-managment/module";
import { config } from "@/context/api/token";

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
    getCourses(setCategoryData)
    // const id = categoryData.id;
    // getModules(id,setModuleData)
  },[])
  
  

  const hasData = categoryData && categoryData.name;
  const accordionData = (moduleData || []).map((modulData: any) => ({
    id: `parentAccordion${modulData.id}`,
    title: `${modulData.name}`,
    icon: <MdDevices />,
    // children: modulData.lessons.map((lesson: any) => ({
    //   id: `childAccordion${lesson.id}`,
    //   title: `${lesson.number}-dars`,
    //   navigateTo: `/lesson/${lesson.id}`,
    //   subtitle: lesson.subtitle,
    //   icon: <FaVideo />,
    // })),
  }));

  return (
    <div className="hs-accordion-group">
      {hasData ? (
        <>
          <h2 className="font-bold mb-3 text-2xl">
            Sizning guruhingiz <span className="text-red-600 font-bold">{categoryData.name || ''}</span>
          </h2>

          {accordionData.length > 0 ? (
            accordionData.map((moduleData: any) => (
              <AccordionItem
                key={moduleData.moduleId}
                id={moduleData.moduleId}
                title={moduleData.title}
                icon={moduleData.icon}
                isOpen={openAccordionId === moduleData.moduleId }
                toggle={() => toggleAccordion(moduleData.moduleId)}
              >
                {/* {parent.modulData.map((child) => (
                  <AccordionItem
                    key={child.id}
                    id={child.id}
                    title={child.title}
                    subtitle={child.subtitle}
                    isOpen={false} // Child accordions are not independently openable
                    toggle={() => handleNavigate(child.navigateTo)} // Handle navigation on click
                    icon={child.icon}
                  />
                ))} */}
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
