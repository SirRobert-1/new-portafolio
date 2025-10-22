import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

export default function Technologies({ technologies = [] }) {
  const { t } = useLanguage();

  // Agrupar tecnologías por categoría
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    const category = tech.categoria || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: tech._id,
      name: tech.nombre,
      designation: tech.descripcion || '',
      color: tech.color || 'from-gray-500 to-gray-600',
    });
    return acc;
  }, {});

  // Si no hay datos de Sanity, usar datos mock como fallback
  const techData = Object.keys(groupedTechnologies).length > 0
    ? groupedTechnologies
    : {
        frontend: [
          { id: 1, name: "Next.js", designation: "React Framework", color: "from-blue-500 to-cyan-500" },
          { id: 2, name: "React", designation: "UI Library", color: "from-cyan-500 to-blue-400" },
          { id: 3, name: "Tailwind CSS", designation: "CSS Framework", color: "from-sky-500 to-indigo-500" },
        ],
        backend: [
          { id: 6, name: "Node.js", designation: "Runtime Environment", color: "from-green-600 to-green-400" },
        ],
      };

  // Función para obtener las iniciales de una tecnología
  const getInitials = (name) => {
    const words = name.split(/[\s.]/);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const TechnologyIcon = ({ name, designation, color }) => (
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
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg`}>
            {getInitials(name)}
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
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("technologies.title")}
        </motion.h2>

        {/* Renderizar categorías dinámicamente */}
        {Object.entries(techData).map(([category, techs], categoryIndex) => (
          <div key={category} className={categoryIndex < Object.keys(techData).length - 1 ? "mb-16" : ""}>
            <motion.h3
              className="text-2xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t(`technologies.categories.${category}`)}
            </motion.h3>
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
