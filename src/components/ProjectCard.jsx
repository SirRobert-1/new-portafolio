import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <CardContainer className="inter-var" containerClassName="py-10">
      <CardBody className="bg-neutral-100 dark:bg-neutral-900 relative group/card border-2 border-neutral-200 dark:border-neutral-800 w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          {project.titulo}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm mt-2"
        >
          {project.descripcionCorta}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <div className="relative w-full h-60 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            {project.imagenPrincipal ? (
              <Image
                src={project.imagenPrincipal}
                alt={project.titulo}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                No image
              </div>
            )}
          </div>
        </CardItem>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tecnologias?.map((tech, index) => (
            <CardItem
              key={index}
              translateZ="50"
              as="span"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-xs text-neutral-900 dark:text-white border border-indigo-500/30"
            >
              {tech}
            </CardItem>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="div"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold hover:from-indigo-600 hover:to-purple-600 transition-all text-center"
          >
            Ver más →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
