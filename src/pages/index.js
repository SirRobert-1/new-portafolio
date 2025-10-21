import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Technologies from '@/components/sections/Technologies';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Contact />
    </div>
  );
}
