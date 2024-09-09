import React, { useState } from 'react';
import Accordion from '@/components/accordion/accordion';
import AccordionItem from '@/components/accordion/accordion';

const Course = () => {
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

  const accordionData = [
    { id: 1, title: 'Accordion Title 1', content: 'This is the content for the first accordion item.' },
    { id: 2, title: 'Accordion Title 2', content: 'This is the content for the second accordion item.' },
    { id: 3, title: 'Accordion Title 3', content: [
        'This is the first piece of content for the third accordion item.',
        'This is the second piece of content for the third accordion item.',
      ]
    },
  ];

  const handleToggle = (id: number) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  return (
    <div className="hs-accordion-group">
      <AccordionItem id="one" title="Accordion #1">
        <AccordionItem id="sub-one" title="Sub accordion #1">
          <p className="text-gray-800 dark:text-neutral-200">
            <em>This is the first sub accordion body.</em>
          </p>
        </AccordionItem>
        <AccordionItem id="sub-two" title="Sub accordion #2">
          <p className="text-gray-800 dark:text-neutral-200">
            <em>This is the second sub accordion body.</em>
          </p>
        </AccordionItem>
      </AccordionItem>
      <AccordionItem id="two" title="Accordion #2">
        <p className="text-gray-800 dark:text-neutral-200">
          <em>This is the second accordion body.</em>
        </p>
      </AccordionItem>
      <AccordionItem id="three" title="Accordion #3">
        <p className="text-gray-800 dark:text-neutral-200">
          <em>This is the third accordion body.</em>
        </p>
      </AccordionItem>
    </div>
  );
}

export default Course;
