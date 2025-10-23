import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectModal({ project, trigger }) {
  const { t } = useLanguage();

  return (
    <Modal>
      <ModalTrigger className="hidden">{trigger}</ModalTrigger>
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
              {t("projects.description")}
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
                    {tech.nombre}
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
  );
}
