import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-5 text-center overflow-x-hidden'>
      <motion.p
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0}}
      transition={{ duration: 1 }}
      className=' text-zinc-500 text-xs cursor-default'>Copyright © 2026 SoumyajitBera</motion.p>
    </div>
  )
}

export default Footer
