import React, { useRef } from "react";
import { assets, myProjects } from "../../assets/assets";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Element } from "react-scroll";
import ImageLoader from "../Common/ImageLoader";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, navigate }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate('/projects')}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      className="relative group w-full md:w-[340px] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-yellow-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {/* Project Image Container */}
        <div className="relative h-44 overflow-hidden">
          {/* Circular Action Links in top-right corner */}
          <div 
            className="absolute top-3.5 right-3.5 flex gap-2 z-30"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-zinc-900 hover:shadow-[0_0_15px_rgba(250,204,21,0.25)] transition-all duration-300 group/btn"
              title="Live Demo"
            >
              <ExternalLink size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-zinc-900 hover:shadow-[0_0_15px_rgba(250,204,21,0.25)] transition-all duration-300 group/btn"
              title="GitHub Repository"
            >
              <Github size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
            </a>
          </div>

          <ImageLoader
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Premium dark blurred overlay for description */}
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-5 z-20">
            <p className="text-zinc-300 text-[11px] font-outfit leading-relaxed font-normal text-center">
              {project.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5" style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-outfit text-[19px] font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-tight leading-snug">
            {project.name}
          </h3>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologyuse.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-zinc-900/50 border border-zinc-800/40 text-zinc-400 rounded-full text-[9px] font-medium font-outfit uppercase tracking-wider group-hover:border-yellow-400/10 group-hover:text-yellow-400/70 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {project.technologyuse.length > 3 && (
              <span className="text-zinc-500 text-[9px] font-outfit self-center ml-1">+{project.technologyuse.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Subtle Glow Effect */}
        <div className="absolute -inset-2 bg-yellow-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const displayProjects = myProjects.slice(0, 3);

  return (
    <Element name="projects" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 border-b border-b-zinc-600 pb-20 cursor-default perspective-1000">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="font-outfit text-3xl m-auto text-center mt-10 text-white"
      >
        <span className="text-yellow-400 font-bold">F</span>eatured Projects
      </motion.p>

      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="flex justify-center gap-8 flex-wrap mt-16"
      >
        {displayProjects.map((project) => (
          <ProjectCard key={project.name} project={project} navigate={navigate} />
        ))}
      </motion.div>

      <div className="text-center mt-16">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="bg-yellow-400 px-8 py-3 text-zinc-800 rounded-xl font-bold font-outfit flex items-center gap-2 mx-auto hover:bg-white transition-all duration-300 shadow-lg hover:shadow-yellow-400/20"
        >
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
        </motion.button>
      </div>
    </Element>
  );
};

export default Projects;
