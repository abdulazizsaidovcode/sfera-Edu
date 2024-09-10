import React from "react";
import Lesson from "@/components/lesson/lesson";

const LessonVideo = () => {
  const accordionItems = [
    { title: "Topic 1", content: "Content for topic 1" },
    { title: "Topic 2", content: "Content for topic 2" },
    { title: "Topic 3", content: "Content for topic 3" }
];
  return (

    <Lesson
     accordionItems={accordionItems}
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      resourceTitle="Foydali manbalar va qo’llanmalar"
      questionTitle="1- savol"
    />

  );
};

export default LessonVideo;
