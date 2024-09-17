"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowDropDownLine, RiDashboardHorizontalFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { getCourses, getLesson, getModules } from "@/context/logic/course";
import { useCategory, useLesson } from "@/context/logic/state-managment/course";
import { useModule } from "@/context/logic/state-managment/module";
import { AiFillLock, AiFillUnlock } from "react-icons/ai"; // Lock and Unlock icons
import { ClipLoader } from "react-spinners"; // For loading spinner

export interface ModuleSidebarProps {
  modules: { moduleId: number; name: string; categoryId: number }[];
  lessons: {
    moduleId: number | null;
    name: string | null;
    lessonId: number;
    description: string | null;
    videoLink: string | null;
    videoTime: number | null;
    userActive: boolean; // Add userActive flag for lock/unlock state
  }[];
  setVideoLink: (videoLink: string | null) => void;
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ modules, lessons, setVideoLink }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { setCategoryData, categoryData } = useCategory();
  const [loading, setLoading] = useState<boolean>(true);
  const { setModuleData, moduleData } = useModule();
  const { setLessonData, lessonData } = useLesson();
  const [lessonLoading, setLessonLoading] = useState<boolean>(false); // Track lesson loading state

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

  useEffect(() => {
    if (moduleData && moduleData.length > 0) {
      setActiveModule(moduleData[0].moduleId); // Automatically open the first module
    }
  }, [moduleData]);

  useEffect(() => {
    if (activeModule) {
      setLessonLoading(true); // Start lesson loading
      getLesson(activeModule, setLessonData).finally(() => setLessonLoading(false)); // Stop when finished
    }
  }, [activeModule, setLessonData]);

  const toggleAccordion = (moduleId: number) => {
    setActiveModule((prevModule) => (prevModule === moduleId ? null : moduleId));
  };

  const handleLessonClick = (lessonId: number, videoLink: string | null, userActive: boolean) => {
    if (userActive) {
      setVideoLink(videoLink);
    }
  };

  return (
    <div>
      <NavLink to="/" className="flex items-center gap-2 mb-4 ml-4 text-white hover:text-gray-300">
        <IoIosArrowBack size={20} />
        <span>Orqaga</span>
      </NavLink>
      <div className="flex flex-col ml-4 mt-4 p-2">
        <div className="space-y-4">
          <div className="flex items-center mb-6">
            <RiDashboardHorizontalFill className="text-[#6A9C89] text-2xl" />
            <h1 className="text-xl ml-2 font-bold text-white">Modules</h1>
          </div>
          {moduleData?.map((modul: any) => (
            <div key={modul.moduleId}>
              <div
                className="flex justify-between items-center cursor-pointer px-4 py-2 rounded-md bg-[#6A9C89] hover:bg-[#54907F] transition"
                onClick={() => toggleAccordion(modul.moduleId)}
              >
                <span className="font-medium text-lg">{modul.name}</span>
                <RiArrowDropDownLine
                  className={`text-2xl transition-transform ${
                    activeModule === modul.moduleId ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {activeModule === modul.moduleId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#E9EFEC] text-[#16423C] rounded-md mt-2"
                  >
                    <ul className="p-4 space-y-2">
                      {lessonLoading ? (
                        <div className="flex justify-center items-center py-4">
                          <ClipLoader color="#6A9C89" size={30} /> {/* Spinner during loading */}
                        </div>
                      ) : lessonData && lessonData.length > 0 ? (
                        lessonData.map((lesson: any) => (
                          <li
                            key={lesson.lessonId}
                            className={`flex items-center justify-between text-base cursor-pointer transition ${
                              lesson.userActive
                                ? "text-[#16423C] font-bold hover:text-[#6A9C89]"
                                : "text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() =>
                              handleLessonClick(lesson.lessonId, lesson.videoLink, lesson.userActive)
                            }
                          >
                            <span>{lesson.name || "No name"}</span>
                            {lesson.userActive ? (
                              <AiFillUnlock className="text-xl text-green-600" />
                            ) : (
                              <AiFillLock className="text-xl text-red-500" />
                            )}
                          </li>
                        ))
                      ) : (
                        <li className="text-base text-red-500">Bu modulda hali darslar mavjud emas</li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
