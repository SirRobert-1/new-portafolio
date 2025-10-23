import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Esquema de validación con Zod
  const contactSchema = z.object({
    name: z
      .string()
      .min(3, { message: t("contact.validation.nameMin") })
      .max(50, { message: t("contact.validation.nameMax") }),
    email: z
      .string()
      .email({ message: t("contact.validation.emailInvalid") }),
    message: z
      .string()
      .min(10, { message: t("contact.validation.messageMin") })
      .max(500, { message: t("contact.validation.messageMax") }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Enviar datos a la API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");

      // Ocultar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-neutral-50 dark:bg-neutral-900/50"
    >
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-neutral-900 dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12">
            {t("contact.subtitle")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-900 dark:text-white mb-2"
              >
                {t("contact.form.name.label")}
              </label>
              <Input
                id="name"
                type="text"
                placeholder={t("contact.form.name.placeholder")}
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-900 dark:text-white mb-2"
              >
                {t("contact.form.email.label")}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact.form.email.placeholder")}
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-900 dark:text-white mb-2"
              >
                {t("contact.form.message.label")}
              </label>
              <motion.div
                className="group/input rounded-lg p-[2px] transition duration-300 bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-indigo-500/20"
              >
                <textarea
                  id="message"
                  rows="6"
                  placeholder={t("contact.form.message.placeholder")}
                  {...register("message")}
                  className={`shadow-input dark:placeholder-text-neutral-600 flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600 resize-none ${
                    errors.message ? "border-red-500" : ""
                  }`}
                ></textarea>
              </motion.div>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                isSubmitting
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-center"
              >
                {t("contact.success")}
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-center"
              >
                {t("contact.error")}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
