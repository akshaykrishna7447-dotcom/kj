import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
        });

        // Wire Lenis into GSAP ticker — single RAF loop, no double-pumping
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's own lag smoothing to prevent stutter compensation
        gsap.ticker.lagSmoothing(0);

        // Keep ScrollTrigger in sync with Lenis scroll position
        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, []);
}
