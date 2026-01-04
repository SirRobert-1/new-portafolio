import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ProjectCard({ project }) {
  // Obtener el nombre de la tecnología (puede ser string, objeto, o null)
  const getTechName = (tech) => {
    if (!tech) return "";
    return typeof tech === "string" ? tech : tech.nombre || "";
  };

  return (
    <CardContainer className="inter-var" containerClassName="pt-5">
        <CardBody className="bg-neutral-100 dark:bg-neutral-900 relative group/card border-2 border-neutral-200 dark:border-neutral-800 w-full h-60 rounded-xl p-5">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-900 dark:text-white"
          >
            {project.titulo}
          </CardItem>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tecnologias
              ?.filter((tech) => tech)
              .slice(0, 5)
              .map((tech, index) => (
                <CardItem
                  key={tech._id || index}
                  translateZ="50"
                  as="span"
                  className="px-3 py-1 rounded-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-xs text-neutral-900 dark:text-white border border-indigo-500/30"
                >
                  {getTechName(tech)}
                </CardItem>
              ))}
            {project.tecnologias?.filter((tech) => tech).length > 5 && (
              <CardItem
                translateZ="50"
                as="span"
                className="px-3 py-1 rounded-full bg-neutral-300 dark:bg-neutral-700 text-xs text-neutral-900 dark:text-white"
              >
                +{project.tecnologias.filter((tech) => tech).length - 5}
              </CardItem>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <CardItem
              translateZ={20}
              as="div"
              className="px-4 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold hover:from-indigo-600 hover:to-purple-600 transition-all text-center"
            >
              Ver más →
            </CardItem>
          </div>
        </CardBody>
    </CardContainer>
  );
}
