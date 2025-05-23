import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MenuIcon, Home, Folder, User } from 'lucide-react'
import { Drawer } from './ui/drawer'
import { DrawerContent, DrawerTrigger } from './ui/drawer'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false) // New state

  useEffect(() => {
    setIsClient(true) // Ensure this runs only on the client

    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleScroll = (id) => {
    if (isClient) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isMobile)
    return (
      <div>
        <Drawer direction='right'>
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>

          <DrawerContent>
            <div className='flex-col justify-between space-y-2 flex'>
              <button className='p-2 bg-slate-400 rounded-xl'>Intro</button>
              <button className='p-2 bg-slate-400 rounded-xl'>Projects</button>
              <button className='p-2 bg-slate-400 rounded-xl'>Skills</button>
              <button className='p-2 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-xl '>Resume</button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )

  return (
    <nav className='fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col rounded-2xl p-2 shadow-xl justify-center bg-transparent'>
      <div className='flex flex-col space-y-4'>
        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1, backgroundColor: '#D3D3D3' }}
          className='p-2 rounded flex items-center justify-center border-1 border-slate-500'
          onClick={() => handleScroll('intro')}
        >
          <Home size={24} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1, backgroundColor: '#D3D3D3' }}
          className='p-2 rounded flex items-center justify-center border-1 border-slate-500'
          onClick={() => handleScroll('projects')}
        >
          <Folder size={24} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1, backgroundColor: '#D3D3D3' }}
          className='p-2 rounded flex items-center justify-center border-1 border-slate-500'
          onClick={() => handleScroll('about me')}
        >
          <User size={24} />
        </motion.button>
      </div>
    </nav>
  )
}
