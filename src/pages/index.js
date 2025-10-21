import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/translations';

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            {t.hero.greeting}
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-neutral-200">
            {t.hero.title}
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            {t.hero.description}
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.about.title}
          </h2>
          <p className="text-xl text-neutral-300 text-center">
            {t.about.content}
          </p>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.technologies.title}
          </h2>
          <p className="text-xl text-neutral-300 text-center">
            {t.technologies.categories.frontend} | {t.technologies.categories.backend} | {t.technologies.categories.database}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t.projects.title}
          </h2>
          <p className="text-xl text-neutral-300 text-center">
            Projects section coming soon...
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {t.contact.title}
          </h2>
          <p className="text-xl text-neutral-300 text-center mb-8">
            {t.contact.subtitle}
          </p>
          <p className="text-neutral-400 text-center">
            Contact form coming soon...
          </p>
        </div>
      </section>
    </div>
  );
}
