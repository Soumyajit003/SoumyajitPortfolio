import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReading from "../HomePage/ScrollReading";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../Common/Magnetic";
import { ArrowLeft } from "lucide-react";

const NavProject = () => {
  const calculatedHeight = ScrollReading();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="md:mx-25 mx-10 my-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -5 }}
          className="flex text-white font-outfit items-center cursor-pointer w-fit gap-3 group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
            <ArrowLeft size={18} className="group-hover:text-zinc-900 transition-colors group-hover:scale-130 transition-transform duration-500" />
          </div>
          <p className="text-lg font-medium tracking-tight">Back</p>
        </motion.div>
      </div>

      {/* Floating Back Button - Desktop Only */}
      <AnimatePresence>
        {scrolled && (
          <div className="fixed bottom-12 right-12 z-[1001] hidden md:block">
            <Magnetic>
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 50 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer flex items-center gap-4 group hover:border-yellow-400/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center transition-transform duration-500">
                  <ArrowLeft size={18} className="group-hover:scale-130 transition-transform duration-500"/>
                </div>
                <span className="font-outfit uppercase tracking-widest text-xs">Back</span>

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-yellow-400/5 blur-xl -z-10 group-hover:bg-yellow-400/20 transition-colors duration-500 rounded-2xl" />
              </motion.div>
            </Magnetic>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: calculatedHeight / 100 }}
        style={{ originX: 0 }}
        className="fixed top-0 left-0 right-0 h-[4px] bg-yellow-400 z-[1000] shadow-[0_0_15px_rgba(250,204,21,0.4)]"
      />
    </>
  );
};

export default NavProject;
