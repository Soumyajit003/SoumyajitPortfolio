import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react'
import { Element } from "react-scroll";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxU-hpLMnL5AieAnuvjZoDv_VahG1q3MLvVoFyYQRRVJFnaGi7A0IA1Xlw1jgAsV9rx/exec'; // User will replace this

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form.current),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setShowPopup(true);
        form.current.reset();
        // Hide popup after 5 seconds
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error!', error.message);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <Element name="contact" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-20 border-b border-b-zinc-600 pb-20">
      <div className="grid md:grid-cols-2 gap-16 items-start mt-10">

        {/* Left Side: Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col gap-8"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
            className="font-bebas text-6xl md:text-8xl text-white leading-tight"
          >
            LET'S <span className="text-yellow-400">TALK</span>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
            className="font-outfit text-zinc-400 text-lg max-w-md leading-relaxed"
          >
            Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities or creative challenges.
          </motion.p>

          <div className="flex flex-col gap-6">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-4 group"
            >
              <div className="p-3 bg-white/5 border border-zinc-800 rounded-lg text-yellow-400 group-hover:bg-yellow-400 group-hover:text-zinc-900 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-outfit uppercase tracking-wider">Email Me</p>
                <p className="text-white font-medium font-outfit">soumya.bera003@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-4 group"
            >
              <div className="p-3 bg-white/5 border border-zinc-800 rounded-lg text-yellow-400 group-hover:bg-yellow-400 group-hover:text-zinc-900 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-outfit uppercase tracking-wider">Location</p>
                <p className="text-white font-medium font-outfit">Kolkata, India</p>
              </div>
            </motion.div>
          </div>

          {/* Social Icons integrated in Info Area */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex gap-4 mt-4"
          >
            {[
              { href: "https://github.com/Soumyajit003", icon: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" },
              { href: "https://www.linkedin.com/in/berasoumyajit/", icon: "M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 border border-zinc-800 rounded-full text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-300"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 496 512"><path d={social.icon} /></svg>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-10 rounded-2xl relative"
        >
          <div className="absolute -inset-1 bg-yellow-400/5 blur-3xl rounded-full -z-10" />

          <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 text-xs font-outfit uppercase tracking-widest ml-1">Your Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text" name="name" required
                className="bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400/50 transition-all duration-300 font-outfit placeholder:text-zinc-700"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 text-xs font-outfit uppercase tracking-widest ml-1">Email Address</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email" name="email" required
                className="bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400/50 transition-all duration-300 font-outfit placeholder:text-zinc-700"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 text-xs font-outfit uppercase tracking-widest ml-1">Your Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message" rows={4} required
                className="bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400/50 transition-all duration-300 font-outfit placeholder:text-zinc-700 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.02, backgroundColor: isSubmitting ? "#facc15" : "#fff" }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`bg-yellow-400 text-zinc-900 font-bold py-4 rounded-xl mt-4 font-outfit transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-zinc-900 border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </>
              )}
            </motion.button>
            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm font-outfit text-center mt-2">Failed to send. Please try again or email me directly.</p>
            )}
          </form>

          {/* Confirmation Popup */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed bottom-10 right-10 z-50 bg-zinc-900 border border-yellow-400/30 p-6 rounded-2xl shadow-2xl max-w-sm flex items-start gap-4"
              >
                <div className="bg-yellow-400/10 p-2 rounded-lg text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bebas text-xl tracking-wide">Message Sent!</h3>
                  <p className="text-zinc-400 text-sm font-outfit mt-1">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </Element>
  );
};


export default Contact