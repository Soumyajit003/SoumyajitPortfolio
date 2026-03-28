import React from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const About = () => {
  return (
    <Element className="md:mx-25 mx-10 border-b border-b-zinc-600 cursor-default pb-20" name="about">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-white text-3xl m-auto md:text-center mt-20 font-outfit"
      >
        About Me
      </motion.p>

      <div className="mt-12 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
           className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-10 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -inset-1 bg-yellow-400/5 blur-3xl rounded-full -z-10" />
          
          <div className="space-y-6 text-zinc-400 font-outfit text-lg leading-relaxed">
            <p>
              I am a dedicated <span className="text-white font-semibold">Full-Stack Web Developer</span> with a strong foundation in modern web technologies. I am passionate about creating seamless digital solutions that combine elegant frontend design with powerful backend functionality.
            </p>
            <p>
              My journey in web development began with a curiosity for how the internet works, leading me to master <span className="text-yellow-400">React</span> for interactive UIs, <span className="text-yellow-400">Node.js</span> and <span className="text-yellow-400">Express</span> for server-side logic, and <span className="text-yellow-400">MongoDB</span> for flexible data management. I've also focused on securing applications using <span className="text-yellow-400">JWT authentication</span>.
            </p>
            <p>
              Currently, I am focused on building <span className="text-white font-semibold">scalable backend systems</span>, optimizing database performance, and delivering real-world projects that solve complex problems with clean, maintainable code.
            </p>
          </div>
        </motion.div>
      </div>
    </Element>
  );
};

export default About;
