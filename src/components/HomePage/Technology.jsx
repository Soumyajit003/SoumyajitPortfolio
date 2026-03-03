import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "motion/react";
import { Element } from "react-scroll";

const Technology = () => {
  return (
    <Element className="md:mx-25 mx-10 border-b border-b-zinc-600 cursor-default" name="technologies">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className=" text-white text-3xl m-auto md:text-center mt-10 font-outfit"
      >
        Technologies
      </motion.p>
      <div className=" grid auto-cols-fr my-15">
        {[
          {
            title: "Frontend",
            items: [
              { name: "HTML", icon: assets.html },
              { name: "CSS", icon: assets.css },
              { name: "React", icon: assets.reactpng },
              { name: "Tailwind", icon: assets.tailwind },
              { name: "Javascript", icon: assets.js },
              { name: "Typescript", icon: assets.typescript },
              { name: "Frammer", icon: assets.frammer }
            ]
          },
          {
            title: "Backend",
            items: [
              { name: "Node.Js", icon: assets.node },
              { name: "Express.Js", icon: assets.express }
            ]
          },
          {
            title: "Database",
            items: [
              { name: "MongoDB", icon: assets.mongo },
              { name: "MySQL", icon: assets.mysql }
            ]
          },
          {
            title: "Languages",
            items: [
              { name: "Java", icon: assets.java },
              { name: "C++", icon: assets.cpp },
              { name: "C", icon: assets.c }
            ]
          },
          {
            title: "Tools",
            items: [
              { name: "Git", icon: assets.git },
              { name: "Github", icon: assets.github },
              { name: "AWS (EC2, S3, IAM)", icon: assets.aws }
            ]
          }
        ].map((section, idx) => (
          <motion.div
            key={section.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className={`md:flex justify-around ${idx !== 0 ? 'my-10' : 'mb-10'}`}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className=" md:w-xs font-bebas text-5xl text-white font-bold md:mb-0 mb-7"
            >
              <p>{section.title}</p>
            </motion.div>
            <motion.div
              className="md:w-lg md:grid md:grid-cols-3 gap-3 grid grid-cols-2"
            >
              {section.items.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="flex items-center gap-3 md:w-10 w-7"
                >
                  <img src={item.icon} alt="" className="" />
                  <p className=" text-white font-josefin md:text-xl whitespace-nowrap">{item.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Element>
  );
};

export default Technology;
