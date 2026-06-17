import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations() {
    useEffect(() => {
        // Batch .reveal-up
        const b1 = ScrollTrigger.batch('.reveal-up', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: 50, scale: 0.98 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.6, stagger: 0.1, ease: 'expo.out', overwrite: true }
                );
            },
            onEnterBack: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, y: -50, scale: 0.98 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.6, stagger: 0.1, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 90%'
        });

        // Batch .reveal-left
        const b2 = ScrollTrigger.batch('.reveal-left', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, x: -60 },
                    { opacity: 1, x: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 92%'
        });

        // Batch .reveal-right
        const b3 = ScrollTrigger.batch('.reveal-right', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, x: 60 },
                    { opacity: 1, x: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 92%'
        });

        // Batch .reveal-scale
        const b4 = ScrollTrigger.batch('.reveal-scale', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, scale: 0.85 },
                    { opacity: 1, scale: 1, duration: 1.8, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            onEnterBack: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, scale: 0.85 },
                    { opacity: 1, scale: 1, duration: 1.8, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 92%'
        });

        // Cleanup ONLY our own triggers, not Hero/Storytelling pins
        return () => {
            const all = [...(b1||[]), ...(b2||[]), ...(b3||[]), ...(b4||[])];
            all.forEach(t => t.kill());
        };
    }, []);
}
