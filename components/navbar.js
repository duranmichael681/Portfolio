import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from '@mui/material'
import { Drawer } from './ui/drawer'
import { MenuIcon } from 'lucide-react'
import { DrawerContent, DrawerTrigger } from './ui/drawer'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Ensure `window` is accessed only on the client
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)

    checkScreenSize() // Run once on mount
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Don't render the navbar on mobile
  if (isMobile)
    return (
      <div>
        <Drawer direction='right'>
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>

          <DrawerContent>
            <div className='flex-col justify-between space-y-2 flex '>
              <button className='p-2 bg-slate-400 rounded-xl'>intro</button>
              <button className='p-2 bg-slate-400 rounded-xl'>Projects</button>

              <button className='p-2 bg-slate-400 rounded-xl'>Skills</button>
              <button className='p-2  bg-gradient-to-r from-blue-500 to-yellow-500 rounded-xl'>Resume</button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )

  return (
    <nav className='bg-zinc-700 z-50 fixed top-0 left-0 right-0 flex justify-between  rounded-2xl p-3 m-3 shadow-xl'>
      <div className='flex gap-10 '>
        {['Intro', 'Projects', 'About me'].map((section) => (
          <motion.button
            key={section}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className='px-6 py-2 bg-white rounded'
            onClick={() => document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
          >
            {section}
          </motion.button>
        ))}
      </div>

      <a
        href='https://docs.google.com/document/d/1AIJVoLaUnRe0Ua5YSJ5D1S8VYOKg3RbW/edit?usp=sharing&ouid=114518633992613409676&rtpof=true&sd=true'
        target='_blank'
        rel='noopener noreferrer'
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
