import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function Projects({ projects = [] }) {
  const { t } = useLanguage();

  // Mock data - En la Fase 4 esto vendrá de Sanity
  const mockProjects = [
    {
      _id: "1",
      titulo: "E-commerce Platform",
      descripcionCorta: "Full-stack e-commerce solution with Next.js and Stripe",
      descripcionLarga:
        "A complete e-commerce platform built with Next.js, featuring product management, shopping cart, secure checkout with Stripe, and admin dashboard. Includes inventory management, order tracking, and customer analytics.",
      imagenPrincipal: "/placeholder-project.jpg",
      galeria: ["/placeholder-1.jpg", "/placeholder-2.jpg"],
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Supabase"],
      linkDemo: "https://example.com",
      linkGitHub: "https://github.com/example",
    },
    {
      _id: "2",
      titulo: "Task Management App",
      descripcionCorta: "Collaborative task manager with real-time updates",
      descripcionLarga:
        "A modern task management application with real-time collaboration features. Users can create projects, assign tasks, set deadlines, and track progress. Built with Next.js and Supabase for real-time subscriptions.",
      imagenPrincipal: "/placeholder-project.jpg",
      galeria: ["/placeholder-3.jpg"],
      tecnologias: ["Next.js", "React", "Supabase", "Tailwind CSS"],
      linkDemo: "https://example.com",
      linkGitHub: "https://github.com/example",
    },
    {
      _id: "3",
      titulo: "Portfolio CMS",
      descripcionCorta: "Content management system for portfolios",
      descripcionLarga:
        "A headless CMS built with Sanity and Next.js for managing portfolio content. Features include drag-and-drop page builder, media management, and multi-language support.",
      imagenPrincipal: "/placeholder-project.jpg",
      galeria: [],
      tecnologias: ["Next.js", "Sanity", "React", "Tailwind CSS"],
      linkDemo: "https://example.com",
      linkGitHub: "https://github.com/example",
    },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("projects.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Modal>
                <ModalTrigger asChild>
                  <div className="cursor-pointer">
                    <ProjectCard project={project} />
                  </div>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent className="overflow-y-auto max-h-[80vh]">
                    {/* Header */}
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                        {project.titulo}
                      </h2>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {project.descripcionCorta}
                      </p>
                    </div>

                    {/* Main Image */}
                    {project.imagenPrincipal && (
                      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-neutral-200 dark:bg-neutral-800">
                        <Image
                          src={project.imagenPrincipal}
                          alt={project.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                        Description
                      </h3>
                      <div className="text-neutral-700 dark:text-neutral-300 space-y-2">
                        {project.descripcionLarga || project.descripcionCorta}
                      </div>
                    </div>

                    {/* Technologies */}
                    {project.tecnologias && project.tecnologias.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                          {t("projects.technologies")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tecnologias.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-sm text-neutral-900 dark:text-white border border-indigo-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gallery */}
                    {project.galeria && project.galeria.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                          {t("projects.gallery")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.galeria.map((imagen, index) => (
                            <div
                              key={index}
                              className="relative w-full h-48 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800"
                            >
                              <Image
                                src={imagen}
                                alt={`${project.titulo} - ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      {project.linkDemo && (
                        <a
                          href={project.linkDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
                        >
                          <FiExternalLink />
                          {t("projects.viewDemo")}
                        </a>
                      )}
                      {project.linkGitHub && (
                        <a
                          href={project.linkGitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-white font-medium hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-all border border-neutral-700"
                        >
                          <FiGithub />
                          {t("projects.viewCode")}
                        </a>
                      )}
                    </div>
                  </ModalContent>
                </ModalBody>
              </Modal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
