import React from 'react'
import { motion } from 'framer-motion'

export default function SkillCard({ title, Description, year }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: 100 }} // Start faded out and slightly below
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.3 }}
      className=' text-black h-[150px] w-[800px] bg-gray-50 rounded-xl font-bold bg-opacity-65 '
    >
      <h1 className='p-2 text-3xl font-extrabold '>{title}</h1> <p className='px-2 font-semibold'>{Description} </p>
    </motion.div>
  )
}
