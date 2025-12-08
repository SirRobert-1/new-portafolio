import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

export default function About() {
  const { t } = useLanguage();

  const specialties = [
    t("about.specialty1"),
    t("about.specialty2"),
    t("about.specialty3"),
    t("about.specialty4"),
    t("about.specialty5"),
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("about.title")}
        </motion.h2>

        <motion.p
          className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("about.subtitle")}
        </motion.p>

        <motion.p
          className="text-center text--xl md:text-2xl text-neutral-700 dark:text-neutral-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("about.intro")}
        </motion.p>

        <motion.p
          className="text-center text-lg text-neutral-600 dark:text-neutral-400 mt-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t("about.description")}
        </motion.p>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold mb-2 text-indigo-500 dark:text-indigo-400">
              {t("about.stats.experience.value")}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {t("about.stats.experience.label")}
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold mb-2 text-purple-500 dark:text-purple-400">
              {t("about.stats.projects.value")}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {t("about.stats.projects.label")}
            </p>
          </div>

          <div className="p-6 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold mb-2 text-pink-500 dark:text-pink-400">
              {t("about.stats.technologies.value")}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {t("about.stats.technologies.label")}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
            {t("about.specialties")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-neutral-900 dark:text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {specialty}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
