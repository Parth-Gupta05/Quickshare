import React from "react";
import { motion } from "motion/react";

function GlobalSpinner() {
  return (
    <motion.div 
    initial={{
        opacity:0
    }}
    animate={{
        opacity:1,
    }}
    exit={{
        opacity:0
    }}
    className="w-screen z-30 bg-[#212121] text-white absolute h-screen flex justify-center items-center text-3xl">
      Loading<span className="text-orange-600 font-thin">...</span>
    </motion.div>
  );
}

export default GlobalSpinner;
