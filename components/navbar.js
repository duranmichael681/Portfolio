import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Don't render the navbar on mobile
  if (isMobile) return null

  return (
    <nav className='bg-neutral-500 z-50 fixed top-0 left-0 right-0 flex justify-between items-center rounded-2xl p-3 m-3 shadow-md'>
      <div className='flex gap-10'>
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className='px-6 py-2 bg-white rounded'
          onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Introduction
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className='px-6 py-2 bg-white rounded'
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Projects
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className='px-6 py-2 bg-white rounded'
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Skills
        </motion.button>
      </div>

      <a
        href='https://docs.google.com/document/d/1AIJVoLaUnRe0Ua5YSJ5D1S8VYOKg3RbW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true'
        target='_blank'
      >
        <motion.button
          whileTap={{ scale: 0.8, backgroundColor: '#FFFF00' }}
          whileHover={{ scale: 1.1, backgroundColor: 'yellow' }}
          className='bg-gradient-to-r from-blue-500 to-yellow-500 px-6 py-2 text-white rounded'
        >
          Resume
        </motion.button>
      </a>
    </nav>
  )
}
