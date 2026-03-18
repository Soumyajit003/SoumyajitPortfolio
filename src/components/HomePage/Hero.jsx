import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { Element } from "react-scroll";
import ImageLoader from '../Common/ImageLoader';

const Hero = () => {

  return (
    <>
      <Element name='home' className='flex cursor-default flex-col md:flex-row justify-around text-white font-outfit mx-5 md:mx-25 border-b border-b-zinc-600 items-center overflow-hidden md:mt-25 mt-40'>
        {/* Left div */}
        <div className='w-full md:w-lg flex items-center text-center md:text-left'>
          <motion.div
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.p className='text-4xl md:text-5xl font-extrabold mb-6 md:mb-10 text-white'
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}>
              Hello I am <span className='text-5xl md:text-7xl text-yellow-400'>Soumyajit</span>
            </motion.p>
            <motion.p
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              className='text-sm md:text-base px-4 md:px-0 text-zinc-400'>
              I am a passionate Full-Stack Web Developer. I specialize in building modern, scalable, and user-friendly web applications using the latest technologies. From intuitive front-end designs to robust back-end architectures, I craft seamless digital experiences. Let's create something amazing together!
            </motion.p>
            <motion.button
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(assets.resume, '_blank')}
              className='bg-yellow-400 px-4 py-2 text-zinc-800 border-none rounded-xl mt-6 md:mt-10  font-semibold outline-none cursor-pointer transition ease-out duration-200 '>
              Resume
            </motion.button>
          </motion.div>
        </div>
        {/* Right div */}
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.8 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.4
          }}
          className='w-full md:w-lg flex justify-center mt-20 md:mt-0'>  {/*md:justify-end*/}
          <ImageLoader
            src={assets.my_photo_3}
            alt="Soumyajit's Photo"
            className="w-60 md:w-md rounded-lg"
          />
        </motion.div>
      </Element>
    </>
  );
};


export default Hero;