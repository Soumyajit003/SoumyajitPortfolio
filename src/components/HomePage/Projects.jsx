import React, { useRef } from "react";
import { assets, myProjects } from "../../assets/assets";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Element } from "react-scroll";
import ImageLoader from "../Common/ImageLoader";

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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      className="relative group w-full md:w-[350px] bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-yellow-400/30 cursor-pointer"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {/* Project Image Container */}
        <div className="relative h-48 overflow-hidden pointer-events-none">
          <ImageLoader
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-xs font-outfit line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6" style={{ transform: "translateZ(30px)" }}>
          <h3 className="font-bebas text-4xl text-white group-hover:text-yellow-400 transition-colors tracking-tight">
            {project.name}
          </h3>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologyuse.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-white/5 border border-zinc-800 text-zinc-400 rounded-full text-[10px] font-medium group-hover:border-yellow-400/20 group-hover:text-yellow-400/80 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologyuse.length > 3 && (
              <span className="text-zinc-600 text-[10px] self-center">+{project.technologyuse.length - 3} more</span>
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
    <Element name="projects" className="md:mx-25 mx-10 border-b border-b-zinc-600 pb-20 cursor-default perspective-1000">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="font-outfit text-3xl m-auto text-center mt-10 text-white"
      >
        Featured Projects
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
