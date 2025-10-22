import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Technologies from '@/components/sections/Technologies';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import sanityClient from '@/lib/sanity';
import { getTechnologiesQuery, getFeaturedProjectsQuery } from '@/lib/sanityQueries';

export default function Home({ technologies, projects }) {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Technologies technologies={technologies} />
      <Projects projects={projects} />
      <Contact />
    </div>
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
