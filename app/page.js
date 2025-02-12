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

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'dark' : ''}>
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
        <section id='intro' className='h-screen flex items-center justify-center text-center'>
          <div className='max-w-3xl'>
            <motion.h1 className='text-6xl font-bold' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              I'm Michael Duran, a{' '}
            </motion.h1>
            <motion.h1 className='font-bold text-5xl'>
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='bg-gradient-to-r from-blue-500 to-yellow-500 text-transparent bg-clip-text'
              >
                Software Engineer
              </motion.span>{' '}
              and a{' '}
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className='bg-gradient-to-r from-yellow-500 to-blue-500 text-transparent bg-clip-text'
              >
                Cyber Security Data Analyst
              </motion.span>
            </motion.h1>
          </div>
        </section>
        <section id='projects' className='bg-black h-screen'>
          <div className='h-screen flex items-center justify-start px-10 gap-10'>
            {/* Left Side: Title */}
            <h1 className='text-white text-5xl font-bold p-20 w-1/3'>
              {' '}
              <a className=' bg-gradient-to-r from-yellow-500 to-blue-500 text-transparent bg-clip-text'>
                <span className='bg-gradient-to-r from-blue-500 to-yellow-500 text-transparent bg-clip-text'>Projects</span>
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
                bgClass='bg-gradient-to-l from-blue-500 to-yellow-500'
                animationDelay={0.2}
              />

              <ProjectCard
                title='Devbuds'
                description='Devbuds helps CompSci majors find collaborators for projects, build resumes, and grow confidence in coding.'
                link='https://www.Devbuds.org'
                bgClass='bg-gradient-to-r from-blue-500 to-yellow-500'
                animationDelay={0.4}
              />
            </div>
          </div>
        </section>
        <section id='skills' className='bg-white h-screen'>
          <div>
            <h1 className='text-center p-20 text-6xl font-bold'>Skills</h1>
            <div className='grid lg:grid-cols-3 gap-10 m-10'>
              <motion.div
                className="h-64 w-full  text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-[url('/React-icon.svg.png')]  bg-slate-500   bg-contain bg-center bg-no-repeat bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>React</h3>
              </motion.div>{' '}
              <motion.div
                className="h-64 w-full text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-slate-500 bg-[url('/5968350.png')] bg-contain bg-center bg-no-repeat bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>Python</h3>
              </motion.div>{' '}
              <motion.div
                className="h-64 w-full text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-slate-500 bg-[url('/8637656.png')] bg-contain bg-center bg-no-repeat  bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>Data-Structures</h3>
              </motion.div>
              <motion.div
                className="h-64 w-full text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-slate-500 bg-[url('/Java_(programming_language)-Logo.wine.png')] bg-contain bg-center bg-no-repeat  bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>Java</h3>
              </motion.div>
              <motion.div
                className="h-64 w-full text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-slate-500 bg-[url('/C++_logo.png')] bg-contain bg-center bg-no-repeat  bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>C++</h3>
              </motion.div>
              <motion.div
                className="h-64 w-full text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center bg-slate-500 bg-[url('/tailwind-css-icon-2048x1229-u8dzt4uh.png')] bg-contain bg-center bg-no-repeat  bg-blend-overlay"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-3xl font-extrabold text-center'>TailWind</h3>
              </motion.div>
            </div>

            <div className='fixed bottom-4 left-0 right-0 flex  space-x-4 ml-auto'>
              <a target='_blank' href='https://github.com/duranmichael681'>
                <AiFillGithub className='text-6xl text-black' />{' '}
              </a>
              <a href='https://www.linkedin.com/in/michael-a-duran/' target='_blank'>
                <AiFillLinkedin className='text-6xl text-blue-500' />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
