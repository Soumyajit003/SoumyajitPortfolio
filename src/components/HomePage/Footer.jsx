import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-5 text-center'>
      {/* footer */}
      <motion.p
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='text-zinc-500 text-xs cursor-default'>Copyright © 2026 SoumyajitBera</motion.p>
    </div>
  )
}

export default Footer
