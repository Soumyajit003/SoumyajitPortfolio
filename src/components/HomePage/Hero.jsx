import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { Element } from "react-scroll";
import ImageLoader from '../Common/ImageLoader';
import Magnetic from '../Common/Magnetic';

const Hero = ({ isLoading }) => {
  const greeting = "Hello, I am ".split("");
  const name = "Soumyajit".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <>
      <Element name='home' className='grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16 text-white font-outfit max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 border-b border-b-zinc-600 md:mt-25 mt-40'>
        {/* Left div */}
        <div className='w-full flex items-center text-center md:text-left'>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            className="flex flex-col items-center md:items-start"
          >
            <motion.h1 className='text-4xl md:text-6xl font-extrabold mb-6 md:mb-10 text-white flex flex-wrap justify-center md:justify-start'>
              {greeting.map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
              <span className='text-yellow-400'>
                {name.map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className='text-sm md:text-lg px-4 md:px-0 text-zinc-400 max-w-xl leading-relaxed'>
              A results-driven <span className="text-white font-semibold">Full-Stack Developer</span> specializing in building scalable web applications and high-performance backend systems with modern technologies.
            </motion.p>

            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              // to open resume
              <button
                onClick={() => window.open(assets.resume, '_blank')}
                className='bg-yellow-400 px-7 py-3 md:px-10 md:py-4 text-zinc-900 border-none rounded-2xl mt-8 md:mt-12 font-bold text-base md:text-lg outline-none cursor-pointer transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]'>
                View CV
              </button>

            </motion.div>
          </motion.div>
        </div>

        {/* Right div */}
        <motion.div
          variants={{
            hidden: { x: 50, opacity: 0, scale: 0.9, rotate: 5 },
            visible: { x: 0, opacity: 1, scale: 1, rotate: 0 }
          }}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15,
            delay: 0.8
          }}
          className='w-full flex justify-center mt-20 md:mt-0 relative'
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <ImageLoader
              src={assets.my_photo_3}
              alt="Soumyajit's Photo"
              className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[420px] rounded-lg relative hover:grayscale grayscale-0 transition-all duration-700 mx-auto"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 inset-0 flex items-center justify-center pointer-events-none scale-110 md:scale-125">
            {/* Main Pulse Glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-full h-full bg-yellow-400/10 blur-[80px] rounded-full will-change-transform"
              style={{ transform: "translateZ(0)" }}
            />

            <div className="absolute w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center z-0">

              {/* <div className="absolute w-[420px] h-[320px] flex items-center justify-center">

  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0 border border-dashed border-yellow-400/20 rounded-full scale-x-120"
  />

  <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    className="absolute inset-[10%] border border-dashed border-yellow-400/10 rounded-full scale-x-120"
  />

</div> */}

              {/* Orbit Dot 1 */}
              {/* <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0"
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]" />
  </motion.div> */}

              {/* Orbit Dot 2 */}
              {/* <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0"
  >
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 border border-yellow-400/50 rounded-full" />
  </motion.div> */}

            </div>
          </div>
        </motion.div>
      </Element>
    </>
  );
};

export default Hero;
