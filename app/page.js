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
import "bootstrap/dist/css/bootstrap.min.css";
import reactImage from "../public/images.png";
import ProjectCard from "@/components/projectCards";
import OppositeContentTimeline from "@/components/ui/timeline";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Bubble from "@/components/bubble";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <Head>
        <title>Michael Duran Portfolio</title>
        <meta
          name="description"
          content="Software Engineer & Cyber Security Data Analyst"
        />
        <meta property="og:title" content="Michael Duran Portfolio" />
        <meta
          property="og:description"
          content="Software Engineer & Cyber Security Data Analyst"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>

      <main className="bg-white dark:bg-black ">
        {/* Navbar */}
        <Navbar />

        {/* Centered Content */}
        <section
          id="intro"
          className="h-[80vh] flex items-center  p-10 bg-black"
        >
          <div className="text-white w-1/2">
            <motion.h1
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Michael Duran{" "}
            </motion.h1>
            <motion.h1 className="font-bold text-2xl pt-4">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-sky-500 to-yellow-500 text-transparent bg-clip-text"
              >
                Software Engineer
              </motion.span>{" "}
              and a{" "}
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-yellow-500 to-sky-500 text-transparent bg-clip-text"
              >
                Cyber Security Data Analyst
              </motion.span>
            </motion.h1>
            <p className="text-white text-xl font-semibold m-1 max-w-[300px] break-words">
              Building projects and expanding my programming knowledge is my
              passion. I design and develop seamless, accessible solutions
              across both backend and frontend.
            </p>
          </div>
          <div className=" w-1/8 flex justify-center">
            <p></p>
          </div>
        </section>
        <section id="projects" className="bg-black py-10">
          <div className="flex flex-col items-center px-10 gap-10">
            {/* Left Side: Title */}
            <h1 className="text-white text-5xl font-bold p-20 w-1/3">
              {" "}
              <a className=" bg-gradient-to-r from-yellow-500 to-sky-500 text-transparent bg-clip-text">
                <span className="bg-gradient-to-r from-sky-500 to-yellow-500 text-transparent bg-clip-text">
                  Projects
                </span>
              </a>{" "}
              I have worked on
            </h1>

            {/* Right Side: Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              {/* Ducky */}
              <ProjectCard
                title="Ducky"
                description="Ducky.pics is a fun, easy-to-use photo-sharing platform designed for capturing and sharing special moments."
                link="https://www.ducky.pics"
                bgClass="bg-gradient-to-l from-sky-500 to-yellow-500"
                animationDelay={0.2}
              />

              <ProjectCard
                title="Devbuds"
                description="Devbuds helps CompSci majors find collaborators for projects, build resumes, and grow confidence in coding."
                link="https://www.Devbuds.org"
                bgClass="bg-gradient-to-r from-sky-500 to-yellow-500"
                animationDelay={0.4}
              />
            </div>
          </div>
        </section>
        <section id="about me" className="bg-black h-screen">
          <div className="text-white">
            <h1 className="text-center p-20 text-4xl font-bold">About me</h1>
            <OppositeContentTimeline />

            <section className="h-screen bg-black">
              <h1 className="p-15 text-4xl font-bold">
                {" "}
                My{" "}
                <span className="bg-gradient-to-r from-sky-500 to-yellow-500 text-transparent bg-clip-text">
                  Skills
                </span>
              </h1>
              <div>
                {" "}
                <h1>Languages</h1>
                <Bubble text="react" />
              </div>
              <div>
                <h1>Frameworks</h1>
              </div>
              <div>
                <h1>Tools</h1>
              </div>
            </section>
            <div className="fixed bottom-4 left-0 right-0 flex  space-x-4 ml-auto">
              <a target="_blank" href="https://github.com/duranmichael681">
                <AiFillGithub className="text-4xl text-slate-500" />{" "}
              </a>
              <a
                href="https://www.linkedin.com/in/michael-a-duran/"
                target="_blank"
              >
                <AiFillLinkedin className="text-4xl text-sky-500 " />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
