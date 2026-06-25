import { useEffect, useRef, useState } from 'react';
import '@fontsource/noto-serif-malayalam/400.css';
import '@fontsource/noto-serif-malayalam/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import './index.css';
import { useLenis } from './hooks/useLenis';
import { useRevealAnimations } from './hooks/useReveal';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import History from './components/History';
import About from './components/About';
import Poojas from './components/Poojas';
import Storytelling from './components/Storytelling';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useLenis();
  useRevealAnimations();

  // Fix Lenis/GSAP scroll physics after preloader completes
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoaded]);

  return (
    <>
      <div style={{ position: 'relative', backgroundColor: '#0d0202', minHeight: '100vh' }}>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <Navbar />
      <main>
        <Hero isLoaded={isLoaded} />
        <History />
        <About />
        <Poojas />
        <Storytelling />
        <Gallery />
        <Booking />
      </main>
      <Footer />
      </div>
    </>
  );
}
