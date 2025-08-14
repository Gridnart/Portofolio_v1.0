// app/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
// import Projects from '@/components/Projects'; // Temporarily commented out
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        {/* <Projects /> */}
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}