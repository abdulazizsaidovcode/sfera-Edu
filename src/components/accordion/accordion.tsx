import React, { useRef, useEffect } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode; // Optional icon prop
  subtitle?: React.ReactNode; // Optional subtitle or additional name
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  isOpen,
  toggle,
  children,
  onClick,
  icon,
  subtitle,
}) => {
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="mb-4" id={id}>
      <button
        className="py-3 inline-flex items-center gap-x-3 w-full font-semibold bg-[#6A9C89] text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`hs-basic-nested-collapse-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        {icon && <span className="mr-2 text-black-600 text-2xl">{icon}</span>} {/* Larger and colored icon */}
        <div className="flex-1">
          <div className="flex items-center gap-x-2">
            <span>{title}</span>
            {subtitle && <span className="font-bold text-lg">{subtitle}</span>}
          </div>
        </div>
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
      </button>
      <div
        id={`hs-basic-nested-collapse-${id}`}
        className="w-full overflow-auto transition-max-height duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
        }}
        role="region"
        aria-labelledby={id}
        ref={contentRef}
      >
        <div className="p-6" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
