import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/sections/Hero';
import sanityClient from '@/lib/sanity';
import { getTechnologiesQuery, getFeaturedProjectsQuery } from '@/lib/sanityQueries';

// Lazy load non-critical sections for better performance
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-neutral-500">Loading...</div></div>,
});

const Technologies = dynamic(() => import('@/components/sections/Technologies'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-neutral-500">Loading...</div></div>,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-neutral-500">Loading...</div></div>,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-neutral-500">Loading...</div></div>,
});

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
