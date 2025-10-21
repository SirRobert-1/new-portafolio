import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

export default function Technologies() {
  const { t } = useLanguage();

  // Mock data - En la Fase 4 esto vendrá de Sanity
  const technologies = {
    frontend: [
      { id: 1, name: "Next.js", designation: "React Framework", color: "from-blue-500 to-cyan-500" },
      { id: 2, name: "React", designation: "UI Library", color: "from-cyan-500 to-blue-400" },
      { id: 3, name: "Tailwind CSS", designation: "CSS Framework", color: "from-sky-500 to-indigo-500" },
      { id: 4, name: "TypeScript", designation: "Programming Language", color: "from-blue-600 to-blue-400" },
      { id: 5, name: "JavaScript", designation: "Programming Language", color: "from-yellow-500 to-yellow-600" },
    ],
    backend: [
      { id: 6, name: "Node.js", designation: "Runtime Environment", color: "from-green-600 to-green-400" },
      { id: 7, name: "Express", designation: "Web Framework", color: "from-gray-600 to-gray-400" },
    ],
    database: [
      { id: 8, name: "Supabase", designation: "Backend Platform", color: "from-emerald-500 to-green-500" },
      { id: 9, name: "MongoDB", designation: "NoSQL Database", color: "from-green-600 to-lime-500" },
      { id: 10, name: "PostgreSQL", designation: "SQL Database", color: "from-blue-700 to-blue-500" },
    ],
    tools: [
      { id: 11, name: "Git", designation: "Version Control", color: "from-orange-600 to-red-500" },
      { id: 12, name: "Docker", designation: "Containerization", color: "from-blue-600 to-cyan-600" },
      { id: 13, name: "Figma", designation: "Design Tool", color: "from-purple-500 to-pink-500" },
      { id: 14, name: "VS Code", designation: "Code Editor", color: "from-blue-600 to-sky-500" },
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

        {/* Frontend */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("technologies.categories.frontend")}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {technologies.frontend.map((tech, index) => (
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

        {/* Backend */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("technologies.categories.backend")}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {technologies.backend.map((tech, index) => (
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

        {/* Database */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("technologies.categories.database")}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {technologies.database.map((tech, index) => (
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

        {/* Tools */}
        <div>
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("technologies.categories.tools")}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {technologies.tools.map((tech, index) => (
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
      </div>
    </section>
  );
}
