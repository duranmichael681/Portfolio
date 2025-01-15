"use client";
import Image from "next/image";
import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import myImage from "../public/dev-ed-wave.png";
import userName from "../public/UserName.jpg";
import { useState } from "react";
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Michael Duran Portfolio</title>
      </Head>
      <main className="min-h-screen bg-white dark:bg-gray-800">
        <section className="h-screen">
          <nav className="p-10 mb-12 flex justify-between">
            <h1 className="text-xl font-bold font-mono">Michael Duran</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl"
                />
              </li>
              <li>
                <a
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 px-10 py-2 text-white rounded-md ml-8"
                  href="#"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-justify pl-10">
            <h2 className="text-5xl py-2 text-cyan-500 ">
              Hi,im Michael Duran
            </h2>
            <h3 className="text-2xl py-2 text-cyan-500 font-bold">
              An expreienced front end engineer and Cyber Security Data Analyst
            </h3>
            <p className="text-md py-5 leading-10 text-cyan-500">
              Sophomore in FIU with great drive and determination to tackle all
              bugs
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-36 text-gray-600">
            <AiFillLinkedin />
            <AiFillTwitterCircle />
          </div>
          <div className="relative bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-20 overflow-hidden mx-auto">
            <Image src={myImage} layout="fill" objectFit="cover" />
          </div>
        </section>
        <section className="text-left">
          {/* Remove text-center */}
          <div>
            <h3 className="text-3xl p-9 font-bold text-gray-800">
              Services I can Provide
            </h3>
            <p className="text-md pl-12 leading-10 text-gray-700 font-semibold">
              Ever since I began coding back in 2023, I have worked on two major
              projects with{" "}
              <a
                target="_blank"
                href="https://www.weareinit.org/"
                className="text-teal-500 underline"
              >
                Init
              </a>{" "}
              ,
              <a
                target="_blank"
                href="https://www.ducky.pics/"
                className="text-teal-500 underline"
              >
                Ducky
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                href="https://www.devbuds.org/"
                className="text-teal-500 underline"
              >
                DevBuds
              </a>
              , which have both gave me real-world experiences on what it is
              like collaborating with a team.
            </p>
            <div>
              <div className="text-center shadow-2xl p-10 rounded-xl bg-white my-10">
                <h3 className="text-xl font-bold">
                  Most of my work has revolved around
                </h3>
                <p className="text-lg p-5">Creating React components</p>
                <p className="text-lg p-5">
                  Using API calls to a database in live time
                </p>
                <p className="text-lg p-5">Creating login forms</p>
                <p className="text-lg p-5">
                  Using Figma to collaborate with my peers
                </p>
                <p className="text-lg p-5">
                  Using drag-and-drop features to add files to a site to later
                  upload to a database
                </p>
              </div>
              <div className="text-center shadow-2xl p-10 rounded-xl bg-white my-10">
                <h3 className="text-xl font-bold">Education</h3>
                <p className="text-lg p-5">Creating React components</p>
                <p className="text-lg p-5">
                  Using API calls to a database in live time
                </p>
                <p className="text-lg p-5">Creating login forms</p>
                <p className="text-lg p-5">
                  Using Figma to collaborate with my peers
                </p>
                <p className="text-lg p-5">
                  Using drag-and-drop features to add files to a site to later
                  upload to a database
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
