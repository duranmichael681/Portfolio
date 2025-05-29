import { motion } from "framer-motion";
import ParticlesComponent from "@/components/particlesBG";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import { ArrowRight } from "@mynaui/icons-react";
import Bubble from "@/components/bubble";
import ProjectCard from "@/components/projectCards";
import SkillCard from "@/components/SkillCards";
import ContactForm from "@/components/contactForm";
export default function MobileSite() {
  return (
    <>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <ParticlesComponent />
        <div className="relative z-10 text-white p-3 pt-5">
          <div className="  text-white p-3 pt-5">
            <div className="flex justify-center flex-col">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl"
              >
                Hi, I'm{" "}
                <motion.span className="text-teal-400">Michael </motion.span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl mt-2"
              >
                A Software Engineer
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold mt-4 max-w-[300px] break-words"
              >
                Building projects and expanding my programming knowledge is my
                passion. I design and develop seamless, accessible solutions
                across both backend and frontend.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row mt-3"
              >
                {" "}
                <a
                  href="https://github.com/duranmichael681"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <AiFillGithub className="text-6xl hover:text-teal-400 transition" />
                </a>
                <a
                  href="https://www.linkedin.com/in/michael-a-duran/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <AiFillLinkedin className="text-6xl hover:text-teal-400 transition" />
                </a>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                href="https://docs.google.com/document/d/1AIJVoLaUnRe0Ua5YSJ5D1S8VYOKg3RbW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group mt-4"
              >
                Check out my&nbsp;<span className="text-teal-400">Resume</span>
                <ArrowRight className=" transform transition-all duration-500 ease-in-out group-hover:translate-x-[10px]" />
              </motion.a>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3  "
              >
                <Bubble text="About" textSize="2xl" />
                <h1 className="mt-4"> Innovating Dreams Into a Reality</h1>
                <p className="text-wrap max-w-lg">
                  I'm Michael Duran, a passionate software engineer with a
                  strong interest in software and web development. As a
                  first-generation college student excelling in Computer
                  Science, I continuously expand my expertise beyond the
                  classroom by self-learning technologies like React, Next.js,
                  Node.js, and MongoDB. .
                </p>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center text-center"
                >
                  <a className="bg-gradient-to-r from-yellow-500 to-sky-500 text-transparent bg-clip-text text-3xl">
                    <span className="text-teal-400">My Projects</span>
                  </a>{" "}
                </motion.div>
                <div className=" flex justify-center gap-8 flex-row items-center p-3 overflow-y-auto w-fit h-fit">
                  <ProjectCard
                    title="Ducky"
                    description="Ducky.pics is a fun, easy-to-use photo-sharing platform designed for capturing and sharing special moments."
                    link="https://www.ducky.pics"
                    bgClass="bg-gray-50"
                    animationDelay={0.2}
                  />
                  <ProjectCard
                    title="Devbuds"
                    description="Devbuds helps CompSci majors find collaborators for projects, build resumes, and grow confidence in coding."
                    link="https://www.Devbuds.org"
                    bgClass="bg-gray-50"
                    animationDelay={0.4}
                  />
                </div>
                <div className="flex">
                  <div className=" ">
                    <motion.div
                      whileHover={{ backgroundColor: "#D3D3D3" }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center justify-center px-8 rounded-full border border-white  text-sm font-extrabold m-1 max-w-[150px] break-words space-x-2"
                    >
                      <h1 className="text-2xl font-semibold">Skills</h1>
                    </motion.div>
                    <div className="p-2">
                      <h1 className="text-xl font-bold">Languages</h1>
                      <Bubble
                        text="Java"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
                        }
                      />
                      <Bubble
                        text="JS"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png"
                        }
                      />
                      <Bubble
                        text="C++"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"
                        }
                      />
                      <Bubble
                        text="Python"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/701px-Python-logo-notext.svg.png"
                        }
                      />
                    </div>
                    <div className="p-2">
                      <h1 className="text-xl font-extrabold">Frameworks</h1>
                      <Bubble
                        text="React"
                        imgSrc={
                          "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                        }
                      />
                      <Bubble
                        text="Vite"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/2078px-Vitejs-logo.svg.png"
                        }
                      />
                      <Bubble
                        text="Next.js"
                        imgSrc={
                          "https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp"
                        }
                      />
                      <Bubble
                        text="Tailwind"
                        imgSrc={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"
                        }
                      />
                    </div>
                    <div className="p-2">
                      <h1 className="text-lg font-bold">Tools</h1>
                      <Bubble
                        text="VS Code"
                        imgSrc={
                          "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png"
                        }
                      />
                      <Bubble
                        text="Figma"
                        imgSrc={
                          "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png"
                        }
                      />
                      <Bubble
                        text="Vercel"
                        imgSrc={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAuKrVgOa4BJxUnH4gdJ5TV0m2IFEMjLJ2g&s"
                        }
                      />
                      <Bubble
                        text="Firebase"
                        imgSrc={
                          "https://www.gstatic.com/devrel-devsite/prod/v718dd607f99926e9e0e7eb375d5f6155db0a99cab136ac991f232c506c338c80/firebase/images/touchicon-180.png"
                        }
                      />
                      <Bubble
                        text="Node.js"
                        imgSrc={
                          "https://static-00.iconduck.com/assets.00/node-js-icon-1817x2048-g8tzf91e.png"
                        }
                      />
                      <Bubble
                        text="Express.js"
                        imgSrc={
                          "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png"
                        }
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              <Bubble text={"Education and Experience"} textSize="2xl" />
              <div className=" p-4 flex-col flex gap-y-8">
                <SkillCard
                  title={"Miami Dade College 2022-2024 - GPA 3.6"}
                  Description={
                    "Courses - Java I & Java II, Intro to C++, Calculus I & Calculus II"
                  }
                />
                <SkillCard
                  title={
                    "Florida International University 2024-Present 3.6 GPA "
                  }
                  Description={
                    "Courses - Data Strucutres, Systems Programming, Human Computer Interface, Software Engineering with AI, Data Mining"
                  }
                />
                <SkillCard
                  title={"FIU Init Build Member"}
                  Description={
                    "Being a team member of INIT at FIU means collaborating on innovative tech projects, gaining hands-on experience, and growing both professionally and personally. It’s an opportunity to work with like-minded individuals, solve real-world problems, and expand your skills in a dynamic environment."
                  }
                />
              </div>
              <div>
                <div className="p-3">
                  <h1>Contact Me</h1>
                  <h2>duranmichael681@gmail.com</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
