import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { assets } from '../../assets/assets';

const Preloader = ({ onComplete, speed = "normal" }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);

  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse movement into subtle rotation and translation
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);
  const translateX = useTransform(smoothX, [-500, 500], [-10, 10]);
  const translateY = useTransform(smoothY, [-500, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Progress interval
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [onComplete, speed, mouseX, mouseY]);

  const nameChars = "SOUMYAJIT".split("");

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden perspective-1000"
    >
      {/* Premium Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Cyber Grid Background */}
      <motion.div 
        style={{ x: translateX, y: translateY, rotateX, rotateY }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.div>

      {/* Scanning Line Effect */}
      <motion.div
        animate={{
          top: ['0%', '100%', '0%'],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent z-10 pointer-events-none"
      />

      <div className="relative flex flex-col items-center z-20">
        
        {/* Animated Bracket Decor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -inset-16 pointer-events-none hidden md:block"
        >
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/30" />
           <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400/30" />
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-400/30" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-400/30" />
        </motion.div>

        {/* Logo Animation with Parallax */}
        <motion.div
          style={{ rotateX, rotateY, x: translateX, y: translateY }}
          initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative mb-12 flex items-center justify-center group"
        >
          {/* Sonar / Pulse Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-0">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 3, opacity: [0, 0.3, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 1,
                  ease: "easeOut"
                }}
                className="absolute w-48 h-48 md:w-64 md:h-64 border border-yellow-400/40 rounded-full"
              />
            ))}
          </div>

          <motion.img 
            src={assets.soumyajit_logo_light} 
            alt="Logo" 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]"
          />
          
          {/* Intense Glow behind logo */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-yellow-400/30 blur-[60px] rounded-full scale-150 z-0" 
          />
        </motion.div>


        {/* Staggered Text Animation */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center space-x-1 md:space-x-3">
             {nameChars.map((letter, i) => (
               <motion.span
                 key={i}
                 initial={{ y: 20, opacity: 0, scale: 0.5 }}
                 animate={{ y: 0, opacity: 1, scale: 1 }}
                 transition={{ 
                   duration: 0.6, 
                   delay: 0.4 + (i * 0.08),
                   ease: "backOut"
                 }}
                 whileHover={{ y: -10, color: '#facc15' }}
                 className={`font-bebas text-5xl md:text-9xl tracking-tighter cursor-default ${
                   i >= 6 ? 'text-yellow-400' : 'text-white'
                 } drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
               >
                 {letter}
               </motion.span>
             ))}
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
            className="h-[1px] w-full mt-4 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
          />
        </div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center w-72 md:w-96"
        >
           <div className="flex items-center justify-between w-full mb-3 px-1">
             <motion.span 
               animate={{ opacity: [0.4, 1, 0.4] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="font-outfit text-[10px] text-zinc-400 uppercase tracking-[0.4em]"
             >
               Loading Portfolio...
             </motion.span>
             <span className="font-josefin text-sm text-yellow-400 font-bold tabular-nums">
               {percent.toString().padStart(3, '0')}%
             </span>
           </div>
           
           <div className="w-full h-[4px] bg-white/5 rounded-full relative overflow-hidden backdrop-blur-sm border border-white/5">
             <motion.div
               className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200"
               style={{ width: `${percent}%` }}
             >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]" />
             </motion.div>
             
             {/* Glowing head of progress bar */}
             <motion.div
               className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full blur-[6px] z-10"
               style={{ left: `calc(${percent}% - 8px)` }}
             />
           </div>
        </motion.div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Animated Glows */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-400/10 blur-[180px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 blur-[180px] rounded-full" 
          />
          
          {/* Particle System */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                 y: [-20, -120, -20],
                 x: [0, (i % 2 === 0 ? 30 : -30), 0],
                 opacity: [0, 0.4, 0],
                 scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                 duration: 6 + (i * 1.5),
                 repeat: Infinity,
                 delay: i * 0.5,
                 ease: "easeInOut"
              }}
              className="absolute w-[2px] h-[2px] bg-yellow-400/60 rounded-full"
              style={{
                 top: `${10 + (i * 8)}%`,
                 left: `${5 + (i * 9) % 90}%`,
                 boxShadow: '0 0 10px rgba(250,204,21,0.5)'
              }}
            />
          ))}
      </div>

      {/* Interactive mouse follow glow */}
      <motion.div
        style={{ x: translateX, y: translateY, left: mouseX, top: mouseY }}
        className="fixed w-[400px] h-[400px] bg-yellow-400/5 blur-[100px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
};

export default Preloader;
