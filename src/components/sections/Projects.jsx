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
  console.log("Projects component received projects:", projects);
  const { t } = useLanguage();
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

                    {/* Main Image */}
                    {project.imagenPrincipal && (
                      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-neutral-200 dark:bg-neutral-800">
                        <Image
                          src={
                            getProjectCardImageUrl(
                              project.imagenPrincipal,
                              800,
                              400
                            ) || project.imagenPrincipal
                          }
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
                                src={getGalleryImageUrl(imagen) || imagen}
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
