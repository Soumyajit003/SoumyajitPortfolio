import React from "react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const Education = () => {
    const educationData = [
        {
            degree: "Bachelor of Engineering in Computer Science (BE CSE)",
            college: "Chitkara University",
            duration: "2022 – 2026",
            cgpa: "9.43",
            description: "Developing a strong foundation in computer science and engineering principles, focusing on software development and data structures."
        },
    ];

    return (
        <Element className="md:mx-25 mx-10 border-b border-b-zinc-600 cursor-default pb-20" name="education">
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-white text-3xl m-auto md:text-center mt-10 font-outfit"
            >
                <span className="text-yellow-400 font-bold">E</span>ducation
            </motion.p>

            <div className="my-15">
                {educationData.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="md:flex justify-between items-start mb-12"
                    >
                        {/* Left side: Date */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="md:w-1/4 mb-4 md:mb-0"
                        >
                            <p className="text-zinc-400 font-outfit text-lg">{edu.duration}</p>
                        </motion.div>

                        {/* Right side: Content */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: 30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="md:w-3/4"
                        >
                            <h3 className="text-white font-bold text-2xl font-outfit">
                                {edu.degree} <span className="text-yellow-400">@ {edu.college}</span>
                            </h3>
                            <p className="text-yellow-400 font-outfit text-lg mt-2 font-semibold">CGPA: {edu.cgpa}</p>
                            <p className="text-zinc-400 mt-4 leading-relaxed font-outfit">
                                {edu.description}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Element>
    );
};

export default Education;
