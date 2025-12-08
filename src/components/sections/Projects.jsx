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
import { getProjectCardImageUrl, getGalleryImageUrl } from "@/lib/imageUrl";
import PortableText from "@/components/PortableText";
import { Badge } from "@/components/ui/badge";

export default function Projects({ projects = [] }) {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("projects.title")}
        </motion.h2>

        <motion.p
          className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("projects.subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                        Description
                      </h3>
                      <div className="text-neutral-700 dark:text-neutral-300 space-y-2">
                        {/* Si descripcionLarga es portable text, usar el componente */}
                        {Array.isArray(project.descripcionLarga) ? (
                          <PortableText content={project.descripcionLarga} />
                        ) : (
                          <p>
                            {project.descripcionLarga ||
                              project.descripcionCorta}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    {project.tecnologias && project.tecnologias.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                          {t("projects.technologies")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tecnologias.map((tech, index) => {
                            // Manejar si tech es un objeto (con referencia expandida), string, o null
                            if (!tech) return null;

                            const techName =
                              typeof tech === "string" ? tech : tech.nombre;

                            return (
                              <Badge
                                key={tech._id || index}
                                variant="secondary"
                                className="text-sm"
                              >
                                {techName}
                              </Badge>
                            );
                          })}
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
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
                        >
                          <FiExternalLink />
                          {t("projects.viewDemo")}
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
