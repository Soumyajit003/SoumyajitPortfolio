import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <div className=' md:mx-25 mx-10 px-5 py-5 text-center'>
      <motion.p
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0}}
      transition={{ duration: 1 }}
      className=' text-zinc-500 text-xs cursor-default'>Copyright © 2026 SoumyajitBera</motion.p>
    </div>
  )
}

export default Footer
