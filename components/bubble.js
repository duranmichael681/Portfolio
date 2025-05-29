import React from "react";
import { motion } from "framer-motion";

export default function Bubble({ text, imgSrc, textSize = "sm" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center px-3 py-2 rounded-full border border-white text-white text-${textSize} font-semibold m-1  break-words ${
        imgSrc ? "space-x-2 justify-start" : "justify-center"
      }`}
    >
      {imgSrc && <img src={imgSrc} alt="" className="w-4 h-4" />}
      <span>{text}</span>
    </motion.div>
  );
}
