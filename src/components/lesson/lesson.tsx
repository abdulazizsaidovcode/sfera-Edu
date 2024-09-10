import React, { useState } from "react";
import AccordionItem from "../accordion/accordion";
import AccordionLesson from "../accordion/accordionLesson";

interface LessonProps {
    videoUrl: string;
    resourceTitle: string;
    questionTitle: string;
    accordionItems: { title: string; content: string }[];
}

const Lesson: React.FC<LessonProps> = ({ videoUrl, resourceTitle, questionTitle, accordionItems }) => {
    // State to manage which accordion item is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Handler to toggle accordion items
    const handleAccordionToggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className="text-white min-h-screen">
            {/* Video Section */}
            <div className="mb-8">
                <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 bg-[#6A9C89] rounded-lg">
                <h4 className="text-lg font-bold mb-2">{resourceTitle}</h4>
                {accordionItems.map((item, index) => (
                    <AccordionLesson
                        key={index}
                        title={item.title}
                        content={item.content}
                        isOpen={index === openIndex} 
                        onToggle={() => handleAccordionToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Lesson;
