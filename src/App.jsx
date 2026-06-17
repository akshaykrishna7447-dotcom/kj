import { useEffect, useRef, useState } from 'react';
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

// Gold cursor follower — fully ref-based, zero state, zero re-renders
function GoldenCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const particles = useRef([]);
  const particleContainer = useRef(null);

  useEffect(() => {
    let rafId = null;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      
      // Throttle DOM updates to requestAnimationFrame
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (dotRef.current) {
            const scale = isHovering.current ? 3.5 : 1;
            dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;
            dotRef.current.style.mixBlendMode = isHovering.current ? 'difference' : 'normal';
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    // Use GSAP ticker for the lagging ring — synced with the main animation loop
    const tickerFn = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        const scale = isHovering.current ? 0 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${scale})`;
      }
    };
    gsap.ticker.add(tickerFn);

    // Hover detection using event delegation (single listener, not per-element)
    const handleMouseOver = (e) => {
      const wasHovering = isHovering.current;
      isHovering.current = !!e.target.closest('a, button, .masonry-item, .glass-card');
      // Only update dot if state changed to avoid redundant style writes
      if (wasHovering !== isHovering.current && dotRef.current) {
        const scale = isHovering.current ? 3.5 : 1;
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;
        dotRef.current.style.mixBlendMode = isHovering.current ? 'difference' : 'normal';
      }
    };
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(tickerFn);
    };
  }, []); // empty deps — no re-registration ever

  return (
    <>
      <div id="cursor-particle-container" ref={particleContainer} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999998 }} />
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

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
      <GoldenCursor />
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
