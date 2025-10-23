import Head from 'next/head';
import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Technologies from '@/components/sections/Technologies';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import sanityClient from '@/lib/sanity';
import { getTechnologiesQuery, getFeaturedProjectsQuery } from '@/lib/sanityQueries';

export default function Home({ technologies, projects }) {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta name="author" content="Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:site_name" content={t('meta.title')} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.title')} />
        <meta name="twitter:description" content={t('meta.description')} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Hero />
        <About />
        <Technologies technologies={technologies} />
        <Projects projects={projects} />
        <Contact />
      </div>
    </>
  );
}

/**
 * Fetch data from Sanity CMS at build time
 * This runs on the server and fetches technologies and featured projects
 */
export async function getStaticProps() {
  try {
    // Fetch technologies and projects in parallel
    const [technologies, projects] = await Promise.all([
      sanityClient.fetch(getTechnologiesQuery),
      sanityClient.fetch(getFeaturedProjectsQuery),
    ]);

    return {
      props: {
        technologies: technologies || [],
        projects: projects || [],
      },
      // Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);

    // Return empty arrays as fallback
    return {
      props: {
        technologies: [],
        projects: [],
      },
      revalidate: 60,
    };
  }
}
