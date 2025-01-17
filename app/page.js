'use client'
import Image from 'next/image'
import Head from 'next/head'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import myImage from '../Renderofme.webp'
import userName from '../public/UserName.jpg'
import { useState, useRef, useEffect } from 'react'
import './globals.css'

import { motion, useAnimation, useScroll, useInView } from 'framer-motion'
export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress: completionProgrss } = useScroll()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })
  const mainControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>Michael Duran Portfolio</title>
      </Head>
      <main className='min-h-screen bg-white dark:bg-slate-700'>
        <section className='h-screen'>
          <nav className='p-10 mb-12 flex justify-between '>
            <motion.h1
              className='text-xl font-bold  text-cyan-500 font-'
              initial={{ fontSize: '1rem' }} // 16px
              animate={{ fontSize: '2.5rem' }} // 40px
              transition={{ duration: 1 }}
            >
              Michael Duran
            </motion.h1>

            <ul className='flex items-center'>
              <li>
                <BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className='cursor-pointer text-2xl' />
              </li>

              <li>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'yellow' }}
                  className='bg-gradient-to-r from-cyan-500 to-teal-500 px-10 py-2 text-white rounded-md ml-8 font-'
                  href='https://docs.google.com/document/d/1_VCLDuw6R4aDT4wqWDZjEzNJ-NWqKmzW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true'
                  target='_blank'
                >
                  Resume
                </motion.button>
              </li>
            </ul>
          </nav>
          <div className='text-justify pl-10'>
            <h2 className='text-5xl py-2 text-cyan-500 '>Hi,im Michael Duran</h2>
            <h3 className='text-2xl py-2 text-cyan-500 font-bold'>An experienced front end engineer and Cyber Security Data Analyst</h3>
            <p className='text-md py-5 leading-10 font-semibold text-cyan-500'>
              Sophomore in FIU with great drive and determination to tackle all bugs
            </p>
          </div>

          <div className='relative bg-gradient-to-b from-teal-500 rounded-3xl w-80 h-80 mt-40 overflow-hidden mx-auto'>
            <Image src={myImage} layout='fill' objectFit='cover' />
          </div>
        </section>
        <section ref={containerRef}>
          <div className='text-cyan-500 '>
            <motion.h3
              className='text-3xl p-5 font-bold text-center '
              animate={mainControls}
              initial='hidden'
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
              <div className=' flex justify-evenly'>
                <div className='text-justify  rounded-xl  shadow-xl p-10 my-10 bg-gradient-to-b from-yellow-500 to-white w-80'>
                  <h3 className='text-3xl font-extrabold text-center'>Ducky</h3>
                  <p className='text-xl '></p>
                </div>
                <div className='text-justify rounded-xl shadow-xl p-10 my-10  bg-gradient-to-b from-[#5865F2] to-white w-80 '>
                  <h3 className='text-3xl font-extrabold text-center'>Devbuds</h3>
                  <p></p>
                </div>
                <div className=' shadow-xl p-10 rounded-xl  my-10 w-80 bg-gradient-to-b from-red-500 to-white text-center '>
                  <h3 className='text-3xl font-extrabold text-center'>Education</h3>
                  <h3 className='text-xl pt-2 font-bold text-center'>FIU </h3>
                  <div></div>
                  <div>
                    <p className='text-lg p-5 font-semibold'>SWE with GEN AI</p>
                    <p className='text-md p-7'>CIS4993 U01</p>
                  </div>
                  <div>
                    <p className='text-lg p-5 font-semibold'>Data Structures</p>
                    <p className='text-md p-7'>COP 3530</p>
                  </div>
                  <div>
                    <p className='text-lg p-5 font-semibold'>JAVA 1 & 2 </p>
                    <p className='text-md p-7'>COP 2800 & 2805</p>
                  </div>
                  <p className='text-lg p-5 font-semibold'>Systems Programming </p>
                  <p className='text-md p-7'>COP 4338</p>
                  <p className='text-lg p-5 font-semibold'>Data Mining</p>
                  <p className='text-md p-7'>CAP 4770</p>
                </div>
              </div>
            </section>
          </div>
        </section>
        <div className='text-5xl flex justify-center gap-36'>
          <AiFillLinkedin className='bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg' />
          <AiFillTwitterCircle className='bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg' />
          <AiFillGithub className='bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg' />
        </div>
      </main>
    </div>
  )
}
