import React from "react";
import { motion } from "motion/react";
import { Element } from "react-scroll";

const CertificateLink = ({ href }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View completion certificate"
            className="inline-flex items-center gap-1.5 mt-3 text-zinc-500 hover:text-yellow-400 text-[13px] font-outfit transition-all duration-300 group"
        >
            <span className="group-hover:underline decoration-yellow-400/30 underline-offset-4">View Certificate</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
                <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: "Software Development Engineer Intern",
            company: "Innova Solutions",
            duration: "May 2025 – March 2026", // User example or "1 Year"
            description:
                "Worked as a Software Development Engineer Intern contributing to Salesforce-based enterprise solutions and frontend development. Implemented Salesforce Administration tasks including user management, roles, profiles, and security configurations. Developed Apex classes and triggers to automate business logic and enhance CRM functionality. Built and improved responsive frontend interfaces using React to enhance user experience.",
            tech: ["Salesforce Admin", "Salesforce Apex", "React", "JavaScript", "CRM"],
            certificate: "#", // Add your certificate link here
        },
    ];

    return (
        <Element className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 border-b border-b-zinc-600 cursor-default pb-10" name="experience">
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-white text-3xl m-auto md:text-center mt-10 font-outfit"
            >
                <span className="text-yellow-400 font-bold">E</span>xperience
            </motion.p>

            <div className="my-15">
                {experiences.map((exp, idx) => (
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
                            <p className="text-zinc-400 font-outfit text-lg">{exp.duration}</p>
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
                                {exp.role} <span className="text-yellow-400">@ {exp.company}</span>
                            </h3>
                            <p className="text-zinc-400 mt-4 leading-relaxed font-outfit">
                                {exp.description}
                            </p>

                            <CertificateLink href={exp.certificate} />

                            {/* Tech Stack Tags as Pills */}
                            <div className="flex flex-wrap gap-3 mt-6">
                                {exp.tech.map((tag, tagIdx) => (
                                    <motion.span
                                        key={tagIdx}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.8 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                        whileHover={{ scale: 1.1, backgroundColor: "#facc15", color: "#18181b" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="px-4 py-1.5 bg-white/5 border border-zinc-700 text-yellow-400 rounded-full text-sm font-medium transition-colors duration-300"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Element>
    );
};

export default Experience;
