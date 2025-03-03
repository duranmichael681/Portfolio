import React from 'react'
import { motion } from 'framer-motion'

export default function Bubble({ text, imgSrc }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: '#D3D3D3' }}
      transition={{ duration: 0.3 }}
      className='inline-flex items-center px-3 py-2 rounded-full border border-white text-white text-sm font-semibold m-1 max-w-[150px] break-words space-x-2'
    >
      {imgSrc && <img src={imgSrc} alt='' className='w-4 h-4' />}
      <span>{text}</span>
    </motion.div>
  )
}
