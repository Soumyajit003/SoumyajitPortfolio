import { motion, AnimatePresence } from 'framer-motion';
import { myProjects } from '../../assets/assets';
import { useState, useEffect } from 'react';
import ImageLoader from '../Common/ImageLoader';

const ImageSlider = ({ images = [], name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync index if images list changes or becomes smaller
  useEffect(() => {
    if (images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-video flex items-center justify-center bg-zinc-900 rounded-xl border border-zinc-800">
        <span className="text-zinc-600 font-outfit text-sm">No images available</span>
      </div>
    );
  }

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (images.length > 0 ? (prev + 1) % images.length : 0));
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (images.length > 0 ? (prev - 1 + images.length) % images.length : 0));
  };

  return (
    <div className="relative group/slider w-full overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-900 shadow-2xl">
      <AnimatePresence mode="wait">
        <ImageLoader
          key={`${name}-${currentIndex}`}
          src={images[currentIndex]}
          alt={`${name} screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover aspect-video"
        />
      </AnimatePresence>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-50 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-black/30 text-white hover:bg-yellow-400 hover:text-zinc-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-black/30 text-white hover:bg-yellow-400 hover:text-zinc-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-yellow-400" : "w-1.5 bg-white/30"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    setProjects(myProjects)
  };

  useEffect(() => {
    fetchProjects();

  }, []);

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.section
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 py-20 border-b border-zinc-800 last:border-none`}
            >
              {/* Project Image Slider */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: isEven ? -50 : 50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full md:w-1/2 relative group"
              >
                <ImageSlider images={project.images} name={project.name} />

                {/* Subtle glow effect */}
                <div className="absolute -inset-4 bg-yellow-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>

              {/* Project Details */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: isEven ? 50 : -50 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 }}
                className="w-full md:w-1/2 flex flex-col items-start"
              >
                <motion.h2
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="font-bebas text-5xl md:text-7xl text-white mb-4"
                >
                  {project.name}
                </motion.h2>

                <motion.p
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="font-outfit text-zinc-400 text-lg leading-relaxed mb-6"
                >
                  {project.description}
                </motion.p>

                {/* Key Features */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="mb-8"
                >
                  <h4 className="text-white font-bold mb-3 font-outfit uppercase tracking-wider text-sm opacity-60">Key Features</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.features?.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-zinc-300 font-outfit">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {project.technologyuse.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-white/5 border border-zinc-700 text-yellow-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 px-6 py-2.5 text-zinc-900 rounded-xl font-bold font-outfit flex items-center gap-2 transition-colors hover:bg-white"
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 border border-zinc-700 text-white rounded-xl font-bold font-outfit hover:bg-white/5 transition-colors"
                  >
                    GitHub
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;