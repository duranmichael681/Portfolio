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
import { useState, useRef, useEffect } from "react";
import "./globals.css";

import { motion, useAnimation, useScroll, useInView } from "framer-motion";
import { yellow } from "@mui/material/colors";
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Michael Duran Portfolio</title>
      </Head>
      <main className="min-h-screen bg-white dark:bg-black">
        <section className="h-screen">
          <nav className=" mb-12 ">
            <ul className="flex justify-end">
              <li>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    onClick={() => setDarkMode(!darkMode)}
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate="></div>
                  <span className="ms-3 text-xl font-semibold text-gray-900 dark:text-gray-300">
                    {!darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </label>
              </li>

              <li>
                <a
                  href="https://docs.google.com/document/d/1_VCLDuw6R4aDT4wqWDZjEzNJ-NWqKmzW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true"
                  target="_blank"
                >
                  <motion.button
                    whileTap={{ scale: 0.8, backgroundColor: "#FFFF00" }}
                    whileHover={{ scale: 1.3, backgroundColor: "yellow" }}
                    className="bg-gradient-to-r from-teal-500 to-pink-300 px-10 py-2 text-white rounded-md ml-8"
                    initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and move up when in view
                    transition={{ duration: 0.5 }} // Smooth transition
                    viewport={{ once: false, amount: 0.5 }} // Triggers when 50% visible
                  >
                    Resume
                  </motion.button>
                </a>
              </li>
            </ul>
          </nav>
          <section className="h-screen flex items-center justify-center">
            <motion.h1
              className="text-center text-6xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Michael Duran
            </motion.h1>
          </section>
        </section>

        <section>
          <div className="text-cyan-500 ">
            <motion.h3
              className="text-3xl  font-bold text-center "
              initial=""
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{ delay: 0.3 }}
            >
              Projects I have worked on
            </motion.h3>
            <section>
              <motion.div className=" flex justify-evenly h-max  gap-10">
                <a href="https://www.ducky.pics" target="_blank">
                  <motion.div
                    className={`text-center rounded-xl shadow-xl p-10 my-10 ${
                      darkMode
                        ? "bg-gradient-to-b from-[#eaf258] to-white"
                        : "bg-gradient-to-b from-white to-[#eaf258]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <h3 className="text-3xl font-extrabold text-center">
                      Ducky
                    </h3>
                    <p className="text-xl ">
                      {" "}
                      Ducky.pics is a fun, easy-to-use photo-sharing platform
                      designed for those who want to capture their special
                      moments and share them with friends and family. Whether
                      you're snapping pictures from your phone or camera,
                      Ducky.pics makes it simple to upload, organize, and
                      showcase your photos in a vibrant, user-friendly
                      environment.
                    </p>
                  </motion.div>
                </a>
                <a href="https://www.Devbuds.org" target="_blank">
                  <motion.div
                    className={`text-center rounded-xl shadow-xl p-10 my-10 ${
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
                    <p className="text-xl">
                      As an LFG service for CompSci majors, our group over at
                      Devbuds was to connect people with each other and
                      collaborate with each other on projects to later add to
                      their resume and hopefully build up their confidence in
                      coding
                    </p>
                  </motion.div>
                </a>
              </motion.div>
            </section>
          </div>
        </section>
        <div className="text-5xl flex justify-center gap-36">
          <AiFillLinkedin className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg" />
          <AiFillTwitterCircle className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg" />
          <AiFillGithub className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg" />
        </div>
      </main>
    </div>
  );
}
