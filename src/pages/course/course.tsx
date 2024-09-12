import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDevices } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import AccordionItem from "@/components/accordion/accordion";
import { getCourses } from "@/context/logic/course";
import { useCategory } from "@/context/logic/state-managment/course";

const Course = () => {
  const { setCategoryData, categoryData } = useCategory();
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
    // getModules()
  }, [setCategoryData]);

  const hasData = categoryData && categoryData.name;

  const accordionData = [
    {
      id: "parentAccordion1",
      title: "1-Modul",
      icon: <MdDevices />,
      children: [
        {
          id: "childAccordion1",
          title: "1-dars",
          navigateTo: "/lesson",
          subtitle: 'Java asoslari',
          icon: <FaVideo />,
        },
        {
          id: "childAccordion2",
          title: "2-dars",
          navigateTo: "/lesson",
          subtitle: 'Java asoslari',
          icon: <FaVideo />,
        },
      ],
    },
    {
      id: "parentAccordion2",
      title: "2-Modul",
      icon: <MdDevices />,
      children: [
        {
          id: "childAccordion3",
          title: "3-dars",
          navigateTo: "/lesson",
          subtitle: 'Java asoslari',
          icon: <FaVideo />,
        },
      ],
    },
  ];

  return (
    <div className="hs-accordion-group">
      {hasData ? (
        <>
          <h2 className="font-bold mb-3 text-2xl">
            Sizning guruhingiz <span className="text-red-600 font-bold">{categoryData.name || ''}</span>
          </h2>

          {accordionData.length > 0 ? (
            accordionData.map((parent) => (
              <AccordionItem
                key={parent.id}
                id={parent.id}
                title={parent.title}
                icon={parent.icon}
                isOpen={openAccordionId === parent.id}
                toggle={() => toggleAccordion(parent.id)}
              >
                {parent.children.map((child) => (
                  <AccordionItem
                    key={child.id}
                    id={child.id}
                    title={child.title}
                    subtitle={child.subtitle}
                    isOpen={false} // Child accordions are not independently openable
                    toggle={() => handleNavigate(child.navigateTo)} // Handle navigation on click
                    icon={child.icon}
                  />
                ))}
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
