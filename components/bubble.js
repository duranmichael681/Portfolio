import React from "react";
import { motion } from "framer-motion";

export default function Bubble({ text }) {
  return (
    <div className="inline-block px-3 py-2 rounded-full border border-white text-white text-sm font-semibold m-1 max-w-[150px] break-words">
      {text}
    </div>
  );
}
