import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { images } from "../../assets/images";

const projects = [
  {
    id: 1,
    title: "Ad Creatives Automation",
    category: "Web App",
    description:
      "Ad Creatives Automation is a system that automatically generates advertising creatives by combining templates, images, and text. It helps create multiple ad variations quickly, reduces manual design work, and ensures consistent branding across campaigns. The platform enables faster production of ad creatives for different formats and marketing channels.",
    tags: ["React", "Redux", "Css","Tailwind","React-Konva"],
    image: images.creatives_automation,
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "AOTM OCR",
    category: "Web App(Tool)",
    description:
      "AOTM OCR is an optical character recognition system that extracts and processes text from images and documents. It enables automated data extraction, reducing manual effort and improving accuracy in handling large volumes of document-based information.",
    tags: ["React", "Context", "Css","Bootstrap","React Bootstrap","React-Konva"],
    image: images.aotm_ocr,
    live: "#",
    color: "#ec4899",
  },
  {
    id: 3,
    title: "AOTM EDGE",
    category: "Web App(Tool)",
    description:
      "AOTM Edge is a document labeling and annotation platform used for preparing datasets for AI and machine learning models. It supports features like image annotations, obfuscation, and data connector uploads, allowing users to efficiently manage and label documents for training purposes.",
    tags: ["React", "Context", "Css","Bootstrap", "React Bootstrap","React-Konva"],
    image: images.aotm_edge,
    github: "#",
    live: "#",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Infilter",
    category: "Web App",
    description:
      "Infilter is a social media analytics platform that provides detailed insights for YouTube and Instagram. It helps users analyze performance metrics, audience engagement, and content trends through interactive dashboards and reports, enabling data-driven decisions to improve social media growth and marketing strategies.",
    tags: ["React", "Context", "Css","Bootstrap","React Bootstrap"],
     image: images.infilter,
    github: "#",
    live: "#",
    color: "#10b981",
  },
  {
    id: 5,
    title: "Divo",
    category: "Enterprise",
    description:
      "Divo is an analytics platform designed to provide insights and performance metrics for digital content and marketing campaigns. It helps users track data, analyze trends, and generate reports through interactive dashboards, enabling better decision-making and improved campaign performance.",
      tags: ["React", "Context", "Css","Bootstrap","React Bootstrap"],
     image: images.divo,
    live: "#",
    color: "#ef4444",
  },
  {
    id: 6,
    title: "Bretty",
    category: "Web App",
    description:
      "Bretty is a GPT-based web application designed to assist users with intelligent content generation and automation. It leverages AI to provide quick responses, generate text, and improve productivity through an interactive and user-friendly interface. The platform helps streamline tasks by using advanced language models to deliver accurate and efficient results.",
    tags: ["React", "Context", "Css","Bootstrap","React Bootstrap"],
    image: images.bretty,
    github: "#",
    live: "#",
    color: "#f59e0b",
  },
   {
    id: 6,
    title: "Vel Aero DX",
    category: "Static Web App",
    description:
      "Vel Aero DX is a static website developed to showcase drone technology, products, and services. It provides information about drone solutions, features, and applications through a clean and responsive interface, helping users easily explore the company’s offerings and innovations in the drone industry.",
    tags: ["React", "Context", "Css","Bootstrap","React Bootstrap"],
    image: images.velaerodx,
    live: "#",
    color: "#f59e0b",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group rounded-2xl overflow-hidden border border-white/5 bg-[#0d0d1a] cursor-pointer"
      style={{
        boxShadow: hovered ? `0 0 40px ${project.color}30` : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: "rgba(7,7,18,0.85)" }}
        >
          
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-white font-['Poppins']"
          style={{ background: `${project.color}90`, fontSize: "10px", backdropFilter: "blur(10px)" }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-white font-['Poppins'] group-hover:text-[#a855f7] transition-colors"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            {project.title}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#a855f7] transition-colors" />
          </motion.div>
        </div>

        <p className="text-gray-500 mb-4 font-['Poppins']" style={{ fontSize: "12px", lineHeight: 1.7 }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag,i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-gray-400 font-['Poppins'] border border-white/5"
              style={{ fontSize: "10px", background: "rgba(255,255,255,0.03)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-24 bg-[#070712] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <h2
            className="text-white font-['Poppins']"
            style={{ fontSize: "1.8rem", fontWeight: 600 }}
          >
            My Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-700/50 to-transparent ml-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* See more button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#a855f7]/40 text-[#a855f7] font-['Poppins'] text-sm hover:bg-[#a855f7]/10 transition-all duration-300"
          >
            My Projects
            <ArrowUpRight size={14} />
          </motion.button>
        </motion.div> */}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />
    </section>
  );
}
