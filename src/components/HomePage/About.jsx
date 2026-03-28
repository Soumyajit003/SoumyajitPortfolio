import React from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const About = () => {
    const aboutData = [
        {
            title: "Who I Am",
            content: "I am a dedicated Full-Stack Web Developer with a strong foundation in modern web technologies. I am passionate about creating seamless digital solutions that combine elegant frontend design with powerful backend functionality."
        },
        {
            title: "My Journey",
            content: "My journey in web development began with a curiosity for how the internet works, leading me to master React for interactive UIs, Node.js and Express for server-side logic, and MongoDB for flexible data management. I've also focused on securing applications using JWT authentication."
        },
        {
            title: "Current Focus",
            content: "Currently, I am focused on building scalable backend systems, optimizing database performance, and delivering real-world projects that solve complex problems with clean, maintainable code."
        }
    ];

    return (
        <Element className="md:mx-25 mx-5 border-b border-b-zinc-600 cursor-default pb-20" name="about">
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-white text-3xl m-auto md:text-center mt-12 font-outfit"
            >
                About Me
            </motion.p>

            <div className="mt-8">
                {aboutData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className={`md:flex justify-around items-start ${idx !== 0 ? 'mt-12' : ''}`}
                    >
                        {/* Left side: Title */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="md:w-xs font-bebas text-5xl text-white font-bold md:mb-0 mb-7"
                        >
                            <h3 className="uppercase tracking-tight">
                                {item.title.split(' ')[0]} <span className="text-yellow-400">{item.title.split(' ').slice(1).join(' ')}</span>
                            </h3>
                        </motion.div>

                        {/* Right side: Content */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: 30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="md:w-lg relative"
                        >
                            <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-yellow-400/50 to-transparent hidden md:block" />
                            <p className="text-zinc-400 font-outfit text-lg leading-relaxed">
                                {item.content}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Element>
    );
};

export default About;
