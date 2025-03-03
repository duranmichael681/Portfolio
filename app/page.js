'use client'
import Image from 'next/image'
import Head from 'next/head'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import myImage from '../Renderofme.webp'
import userName from '../public/UserName.jpg'
import { useState } from 'react'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import reactImage from '../public/images.png'
import ProjectCard from '@/components/projectCards'
import OppositeContentTimeline from '@/components/ui/timeline'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Bubble from '@/components/bubble'
import { Input } from '@/components/ui/input'
import { Button } from '@mui/material'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div>
      <Head>
        <title>Michael Duran Portfolio</title>
        <meta name='description' content='Software Engineer & Cyber Security Data Analyst' />
        <meta property='og:title' content='Michael Duran Portfolio' />
        <meta property='og:description' content='Software Engineer & Cyber Security Data Analyst' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://yourwebsite.com' />
      </Head>

      <main className='bg-white dark:bg-black '>
        {/* Navbar */}
        <Navbar />

        {/* Centered Content */}
        <body className='text-gray-400'>
          <section id='intro' className='h-[80vh] flex items-center   bg-black'>
            <div className='flex w-full px-10'>
              <div className=' w-1/3 '>
                <motion.h1
                  className='text-4xl font-bold '
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Michael Duran{' '}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='font-bold text-2xl pt-4'
                >
                  Software Engineer and a Cyber Security Data Analyst
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className=' text-xl font-semibold m-1 max-w-[300px] break-words'
                >
                  Building projects and expanding my programming knowledge is my passion. I design and develop seamless, accessible solutions across
                  both backend and frontend.
                </motion.p>
                <a
                  href='https://docs.google.com/document/d/1AIJVoLaUnRe0Ua5YSJ5D1S8VYOKg3RbW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true'
                  target='.blank'
                >
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className='bg-gradient-to-r from-yellow-500 to-sky-500 pl-5 pr-5 pt-2 pb-2 rounded-lg text-black'
                  >
                    Resume
                  </motion.button>
                </a>
                <div className='flex pt-3 '>
                  <AiFillGithub className='text-6xl' />
                  <AiFillLinkedin className='text-6xl' />
                  <a href='https://docs.google.com/document/d/1AIJVoLaUnRe0Ua5YSJ5D1S8VYOKg3RbW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true'>
                    <motion.span className='text-teal-500'></motion.span>
                  </a>
                </div>
              </div>
              <div className='w-1/3  '>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=' text-6xl'>
                  Hi, Im{' '}
                  <motion.span className='bg-gradient-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent'>Michael Duran</motion.span>
                </motion.h1>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=' text-6xl'>
                  A Software Engineer
                </motion.h1>
              </div>
              <div className='w-1/3 bg-white'>
                <h1 className='p-10  '>Place Holder For animated SVG that I will add </h1>
              </div>
            </div>
          </section>
          <section id='projects' className='bg-black py-10'>
            <div className='flex flex-col  items-center text-center px-10 gap-10 '>
              {/* Left Side: Title */}
              <h1 className=' text-5xl font-bold p-10 w-1/3'>
                {' '}
                <a className=' bg-gradient-to-r from-yellow-500 to-sky-500 text-transparent bg-clip-text'>
                  <span className='bg-gradient-to-r from-sky-500 to-yellow-500 text-transparent bg-clip-text'>Projects</span>
                </a>{' '}
                I have worked on
              </h1>

              {/* Right Side: Project Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto'>
                {/* Ducky */}
                <ProjectCard
                  title='Ducky'
                  description='Ducky.pics is a fun, easy-to-use photo-sharing platform designed for capturing and sharing special moments.'
                  link='https://www.ducky.pics'
                  bgClass='bg-gradient-to-l from-sky-500 to-yellow-500'
                  animationDelay={0.2}
                />

                <ProjectCard
                  title='Devbuds'
                  description='Devbuds helps CompSci majors find collaborators for projects, build resumes, and grow confidence in coding.'
                  link='https://www.Devbuds.org'
                  bgClass='bg-gradient-to-r from-sky-500 to-yellow-500'
                  animationDelay={0.4}
                />
              </div>
            </div>
          </section>
          <section id='about me' className='bg-black h-screen'>
            <div className='flex'>
              <div className='p-3 w-1/2 flex-col'>
                <div className='p-5'>
                  <h1>Languages</h1>
                  <Bubble text='Java' />
                  <Bubble text='JS' />
                  <Bubble text='C++' />
                  <Bubble text='Python' />
                </div>
                <div className='p-5'>
                  <h1>Frameworks</h1>
                  <Bubble text='React' />
                  <Bubble text='Vite' />
                  <Bubble text='Next.js' />
                  <Bubble text='Tailwind' />
                </div>
                <div className='p-5'>
                  <h1>Tools</h1>
                  <Bubble text='VS Code' />
                  <Bubble text='Figma' />
                  <Bubble text='Vercel' />
                  <Bubble text='Firebase' />
                  <Bubble text='Node.js' />
                  <Bubble text='Express.js' />
                </div>
              </div>

              {/* This is your placeholder section */}
              <div className='w-2/3 p-4'>
                <p>This is just a placeholder for the content that will go here.</p>
              </div>
            </div>
          </section>
        </body>
      </main>
    </div>
  )
}
