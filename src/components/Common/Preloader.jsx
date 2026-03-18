import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../../assets/assets';

const Preloader = ({ onComplete, speed = "normal" }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Normal: 25ms * 100 = 2.5s
    // Fast: 10ms * 100 = 1s
    const intervalDuration = speed === "fast" ? 10 : 25;
    
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, speed === "fast" ? 400 : 800); 
          return 100;
        }
        return prev + 1;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [onComplete, speed]);

  const nameChars = "SOUMYAJIT".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden"
    >
      {/* Premium Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative flex flex-col items-center z-10">
        
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-12 flex items-center justify-center"
        >
          {/* Sonar / Pulse Effect - Now nested for perfect centering */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-0">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.5, opacity: [0, 0.2, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute w-48 h-48 md:w-64 md:h-64 border border-yellow-400/30 rounded-full"
              />
            ))}
          </div>

          <img 
            src={assets.soumyajit_logo_light} 
            alt="Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10"
          />
          {/* Subtle Glow behind logo */}
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150" />
        </motion.div>


        {/* Staggered Text Animation */}
        <div className="flex flex-col items-center mb-10 overflow-hidden">
          <div className="flex overflow-hidden">
             <div className="flex">
               {nameChars.map((letter, i) => (
                 <motion.span
                   key={i}
                   initial={{ y: '100%', opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ 
                     duration: 0.8, 
                     delay: 0.1 + (i * 0.05),
                     ease: [0.33, 1, 0.68, 1]
                   }}
                   className={`font-bebas text-5xl md:text-8xl mb-2 ${
                     i >= 6 ? 'text-yellow-400' : 'text-white'
                   }`}
                 >
                   {letter}
                 </motion.span>
               ))}
             </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
          />
        </div>

        {/* Improved Progress Section */}
        <div className="flex flex-col items-center w-72">
           <div className="flex items-center justify-between w-full mb-3 px-1">
             <span className="font-outfit text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Welcome to the portfolio...</span>
             <span className="font-josefin text-xs text-yellow-400 font-bold">{percent}%</span>
           </div>
           
           <div className="w-full h-[3px] bg-white/5 rounded-full relative overflow-hidden">
             <motion.div
               className="absolute left-0 top-0 h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
               style={{ width: `${percent}%` }}
             />
           </div>
        </div>
      </div>

      {/* High-end Nebula Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.15, 0.1],
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-yellow-400/5 blur-[150px] rounded-full" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             opacity: [0.05, 0.1, 0.05],
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 blur-[150px] rounded-full" 
         />
         
         {/* Floating light points */}
         {[...Array(5)].map((_, i) => (
           <motion.div
             key={i}
             animate={{
                y: [0, -100, 0],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                opacity: [0, 0.3, 0]
             }}
             transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
             }}
             className="absolute w-1 h-1 bg-yellow-400/40 rounded-full blur-[2px]"
             style={{
                top: `${20 + i * 15}%`,
                left: `${10 + (i * 20) % 80}%`
             }}
           />
         ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
