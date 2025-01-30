'use client'
import Image from 'next/image'
import Head from 'next/head'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import myImage from '../Renderofme.webp'
import userName from '../public/UserName.jpg'
import { useState } from 'react'
import './globals.css'

import { motion } from 'framer-motion'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>Michael Duran Portfolio</title>
      </Head>
      <main className='bg-white dark:bg-black min-h-screen'>
        {/* Navbar */}
        <nav className='fixed top-0 w-full bg-neutral-500 z-50'>
          <div className='flex items-center gap-10 p-5'>
            <motion.button
              whileTap={{ scale: 0.8, backgroundColor: '#FFFF00' }}
              whileHover={{ scale: 1.1, backgroundColor: 'yellow' }}
              className='bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white rounded-md absolute flex gap-4 top-5 right-5'
            >
              Resume
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className='px-6 py-2 bg-white rounded'
              onClick={() => {
                const section = document.getElementById('intro')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Introduction
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className='px-6 py-2 bg-white rounded'
              onClick={() => {
                const section = document.getElementById('projects')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Projects
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className='px-6 py-2 bg-white rounded'
              onClick={() => {
                const section = document.getElementById('skills')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Skills
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }} className='px-6 py-2 bg-white rounded'>
              Contact
            </motion.button>
          </div>
        </nav>

        {/* Centered Content */}
        <section id='intro' className='h-screen flex items-center justify-center text-center'>
          <div className='max-w-3xl'>
            <motion.h1 className=' font-bold text-xl' href='#intro'>
              Introduction
            </motion.h1>
            <motion.h1 className='text-6xl font-bold' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              I'm Michael Duran, a{' '}
            </motion.h1>
            <motion.h1 className='font-bold text-5xl'>
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'
              >
                Software Engineer
              </motion.a>{' '}
              and a{' '}
              <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className='bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text'
              >
                Cyber Security Data Analyst
              </motion.a>
            </motion.h1>
          </div>
        </section>
        <section id='projects' className='bg-black h-screen'>
          <div className='h-screen flex items-center justify-start px-10 gap-10'>
            {/* Left Side: Title */}
            <h1 className='text-white text-5xl font-bold p-20 w-1/3'>
              {' '}
              <a className=' bg-gradient-to-r from-yellow-500 to-blue-500 text-transparent bg-clip-text'>Projects</a> I have worked on
            </h1>

            {/* Right Side: Project Cards */}
            <div className='flex gap-8 w-2/3'>
              {/* Ducky */}
              <a href='https://www.ducky.pics' target='_blank' className='flex-1 max-w-md'>
                <motion.div
                  className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${
                    darkMode ? 'bg-gradient-to-b from-[#eaf258] to-white' : 'bg-gradient-to-b from-white to-[#eaf258]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 100 }} // Start faded out and slightly below
                  whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-3xl font-extrabold text-center'>Ducky</h3>
                  <p className='text-xl font-semibold'>
                    Ducky.pics is a fun, easy-to-use photo-sharing platform designed for capturing and sharing special moments.
                  </p>
                </motion.div>
              </a>

              {/* Devbuds */}
              <a href='https://www.Devbuds.org' target='_blank' className='flex-1 max-w-md'>
                <motion.div
                  className={`text-center rounded-xl shadow-xl p-10 min-h-[350px] flex flex-col justify-center ${
                    darkMode ? 'bg-gradient-to-b from-[#5865F2] to-gray-500' : 'bg-gradient-to-b from-white to-[#5865F2]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: -100 }} // Start faded out and slightly below
                  whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-3xl font-extrabold text-center'>Devbuds</h3>
                  <p className='text-xl font-semibold'>
                    Devbuds helps CompSci majors find collaborators for projects, build resumes, and grow confidence in coding.
                  </p>
                </motion.div>
              </a>
            </div>
          </div>
        </section>
        <section className='h-screen bg-white flex justify-start ' id='skills'>
          <div>
            <h1
              className='font-bold text-6xl p-20
              '
            >
              Skills
            </h1>
          </div>
        </section>
      </main>
    </div>
  )
}
