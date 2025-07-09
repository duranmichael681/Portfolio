// ProjectCard.js
import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProjectCard({ title, description, link, bgClass }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ensure `window` is accessed only on the client
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize(); // Run once on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  if (isMobile)
    return (
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-xl text-center ${bgClass}  w-full max-w-md p-4 bg-opacity-65 text-black`}
        whileTap={{ scale: 0.97 }}
      >
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-sm">{description}</p>
      </motion.a>
    );
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 max-w-md"
    >
      <motion.div
        className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${bgClass} bg-opacity-65 text-black`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }} // Start faded out and slightly below
        whileInView={{ opacity: 1, y: 0 }} // Animate when in view
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-3xl font-extrabold text-center te">{title}</h3>
        <p className="text-xl font-semibold">{description}</p>
      </motion.div>
    </a>
  );
}
