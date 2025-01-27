"use client";
import Image from "next/image";
import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import myImage from "../Renderofme.webp";
import userName from "../public/UserName.jpg";
import { useState } from "react";
import "./globals.css";

import { motion } from "framer-motion";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Michael Duran Portfolio</title>
      </Head>
      <main className="bg-white dark:bg-black min-h-screen">
        {/* Navbar */}
        <nav className="absolute top-5 right-5 flex gap-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              onClick={() => setDarkMode(!darkMode)}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate"></div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-300">
              {!darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </label>

          <a
            href="https://docs.google.com/document/d/1_VCLDuw6R4aDT4wqWDZjEzNJ-NWqKmzW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true"
            target="_blank"
          >
            <motion.button
              whileTap={{ scale: 0.8, backgroundColor: "#FFFF00" }}
              whileHover={{ scale: 1.1, backgroundColor: "yellow" }}
              className="bg-gradient-to-r from-teal-500 to-pink-300 px-6 py-2 text-white rounded-md"
            >
              Resume
            </motion.button>
          </a>
        </nav>

        {/* Centered Content */}
        <section className="h-screen flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <motion.h1 className="font-bold text-xl">Introduction</motion.h1>
            <motion.h1
              className="text-6xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              I'm Michael Duran, a{" "}
            </motion.h1>
            <motion.h1 className="font-bold text-5xl">
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
              >
                Software Engineer
              </motion.a>{" "}
              and a{" "}
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
              >
                Cyber Security Data Analyst
              </motion.a>
            </motion.h1>
          </div>
        </section>
        <section className="bg-black h-screen">
          <div className="h-screen flex items-center justify-start px-10 gap-10">
            {/* Left Side: Title */}
            <h1 className="text-white text-5xl font-bold p-20 w-1/3">
              Projects I have worked on
            </h1>

            {/* Right Side: Project Cards */}
            <div className="flex gap-8 w-2/3">
              {/* Ducky */}
              <a
                href="https://www.ducky.pics"
                target="_blank"
                className="flex-1 max-w-md"
              >
                <motion.div
                  className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${
                    darkMode
                      ? "bg-gradient-to-b from-[#eaf258] to-white"
                      : "bg-gradient-to-b from-white to-[#eaf258]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <h3 className="text-3xl font-extrabold text-center">Ducky</h3>
                  <p className="text-xl font-semibold">
                    Ducky.pics is a fun, easy-to-use photo-sharing platform
                    designed for capturing and sharing special moments.
                  </p>
                </motion.div>
              </a>

              {/* Devbuds */}
              <a
                href="https://www.Devbuds.org"
                target="_blank"
                className="flex-1 max-w-md"
              >
                <motion.div
                  className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${
                    darkMode
                      ? "bg-gradient-to-b from-[#5865F2] to-gray-500"
                      : "bg-gradient-to-b from-white to-[#5865F2]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <h3 className="text-3xl font-extrabold text-center">
                    Devbuds
                  </h3>
                  <p className="text-xl font-semibold">
                    Devbuds helps CompSci majors find collaborators for
                    projects, build resumes, and grow confidence in coding.
                  </p>
                </motion.div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
