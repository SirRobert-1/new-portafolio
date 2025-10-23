import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

export default function Technologies({ technologies = [] }) {
  const { t } = useLanguage();

  // Agrupar tecnologías por categoría
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    const category = tech.categoria || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: tech._id,
      name: tech.nombre,
      designation: tech.descripcion || "",
      color: tech.color || "from-gray-500 to-gray-600",
      icon: tech.icono,
    });
    return acc;
  }, {});

  const TechnologyIcon = ({ name, designation, color, icon }) => (
    <motion.div
      className="group relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="p-4 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 dark:border-indigo-500/30 group-hover:border-indigo-500/50 transition-all duration-300">
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg overflow-hidden p-2`}
          >
            {icon ? (
              <img
                src={icon}
                alt={name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-white font-bold text-lg md:text-xl">
                {name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-neutral-900 dark:bg-neutral-800 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
            <div className="text-sm font-bold">{name}</div>
            <div className="text-xs text-neutral-400">{designation}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 dark:bg-neutral-800 rotate-45 -mt-1"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="technologies"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-neutral-50 dark:bg-neutral-900/50"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("technologies.title")}
        </motion.h2>

        <motion.p
          className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("technologies.subtitle")}
        </motion.p>

        {/* Renderizar categorías dinámicamente */}
        {Object.entries(groupedTechnologies).map(([category, techs], categoryIndex) => (
          <div
            key={category}
            className={
              categoryIndex < Object.keys(groupedTechnologies).length - 1 ? "mb-16" : ""
            }
          >
            <div className="flex flex-wrap justify-center gap-8">
              {techs.map((tech, index) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TechnologyIcon
                    name={tech.name}
                    designation={tech.designation}
                    color={tech.color}
                    icon={tech.icon}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
