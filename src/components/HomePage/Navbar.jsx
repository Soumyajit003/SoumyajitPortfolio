import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import ScrollReading from "./ScrollReading";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";
import Magnetic from "../Common/Magnetic";

const Navbar = () => {
  const calculatedHeight = ScrollReading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "about", label: "About" },
    { to: "technologies", label: "Skills" },
    { to: "projects", label: "Projects" },
    { to: "experience", label: "Experience" },
    { to: "education", label: "Education" },
    { to: "contact", label: "Contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-outfit px-4 md:px-0 mt-0 md:mt-2`}
      >
        <div
          className={`mx-auto transition-all duration-500 flex justify-between items-center ${scrolled
              ? "max-w-5xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 py-3 px-8 rounded-full shadow-2xl mt-4"
              : "max-w-7xl bg-transparent py-6 px-4 sm:px-6 md:px-8 lg:px-12"
            }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center"
          >
            <Magnetic>
              <img
                src={assets.soumyajit_logo_light}
                alt="Logo"
                className="w-10 h-10 cursor-pointer hover:rotate-12 transition-transform duration-300"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              />
            </Magnetic>
          </motion.div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Magnetic key={item.to}>
                <motion.li
                  whileHover={{ y: -2 }}
                  className="relative group flex flex-col items-center"
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    className="text-yellow-400 font-medium tracking-wide text-sm hover:text-white transition-colors cursor-pointer px-2 py-1"
                  >
                    {item.label}
                  </Link>
                  {/* Active/Hover Indicator */}
                  <motion.div
                    className="w-1 h-1 bg-yellow-400 rounded-full mt-1 scale-0 group-hover:scale-100 transition-transform duration-300"
                  />
                </motion.li>
              </Magnetic>
            ))}
          </ul>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-yellow-400 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Integrated Progress Bar (for Desktop Pill) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: calculatedHeight / 100 }}
            style={{ originX: 0 }}
            className={`absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-yellow-400/50 transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
          />
        </div>

      </nav>

      {/* Modern Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-zinc-950/98 backdrop-blur-3xl z-[200] md:hidden flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <img
                src={assets.soumyajit_logo_light}
                alt="Logo"
                className="w-10 h-10 cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-2"
              >
                <X size={32} />
              </button>
            </div>

            <motion.ul
              variants={{
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              {[...navItems].map((item) => (
                <motion.li
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-outfit font-bold text-zinc-400 hover:text-yellow-400 transition-colors uppercase tracking-widest cursor-pointer block"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-auto pt-10 border-t border-white/5"
            >
              <p className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">© 2026 Soumyajit Bera</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
