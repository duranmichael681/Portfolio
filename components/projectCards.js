// ProjectCard.js
import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, link, bgClass }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 max-w-md"
    >
      <motion.div
        className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${bgClass}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }} // Start faded out and slightly below
        whileInView={{ opacity: 1, y: 0 }} // Animate when in view
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-3xl font-extrabold text-center">{title}</h3>
        <p className="text-xl font-semibold">{description}</p>
      </motion.div>
    </a>
  );
}
