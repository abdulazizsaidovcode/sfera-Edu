"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
}) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
            onClick={() => setIsSubscribed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              key="action"
              className="relative  h-full w-full font-semibold flex justify-center items-center"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              style={{ color: buttonColor }}
            >
              {changeText}
              <CheckIcon className="mr-2 h-4 w-4" />
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            onClick={() => setIsSubscribed(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              key="reaction"
              className="relative flex juc items-center font-semibold "
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
              style={{ color: 'black' }}
            >
              {initialText}
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  };
