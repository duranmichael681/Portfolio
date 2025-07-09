import React from "react";
import { motion } from "framer-motion";
import useIsMobile from "./isMobile";

export default function SkillCard({ title, Description, year }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={
        isMobile
          ? "text-black h-fit w-full  bg-gray-50 rounded-xl font-bold bg-opacity-65 p-4"
          : "text-black h-fit w-[90vh]  bg-gray-50 rounded-xl font-bold bg-opacity-65 p-4"
      }
    >
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="font-semibold">{Description}</p>
    </motion.div>
  );
}
