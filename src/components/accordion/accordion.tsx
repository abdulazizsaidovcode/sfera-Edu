import React, { useState, useRef, useEffect } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` mb-4`} id={id}>
      <button
        className="py-3 inline-flex items-center gap-x-3 w-full font-semibold bg-[#47EB7E] text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`hs-basic-nested-collapse-${id}`}
        onClick={toggleAccordion}
      >
        <svg
          className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
          {!isOpen && <path d="M12 5v14"></path>}
        </svg>
        {title}
      </button>
      <div
        id={`hs-basic-nested-collapse-${id}`}
        className={`w-full overflow-hidden transition-max-height duration-300 ease-in-out`}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
        }}
        role="region"
        aria-labelledby={id}
        ref={contentRef}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
