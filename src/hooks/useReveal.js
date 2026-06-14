import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations() {
    useEffect(() => {
        // Keep refs to only the triggers we create so cleanup is scoped
        const triggers = [];

        const createBatch = (selector, vars, start = 'top 90%') => {
            ScrollTrigger.batch(selector, {
                ...vars,
                start,
                // Store each trigger as it's created
                onToggle: (self) => triggers.push(self),
            });
        };

        // Batch .reveal-up
        ScrollTrigger.batch('.reveal-up', {
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
            start: 'top 90%',
            onToggle: (self) => triggers.push(self),
        });

        // Batch .reveal-left
        ScrollTrigger.batch('.reveal-left', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, x: -60 },
                    { opacity: 1, x: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 92%',
            onToggle: (self) => triggers.push(self),
        });

        // Batch .reveal-right
        ScrollTrigger.batch('.reveal-right', {
            onEnter: (elements) => {
                gsap.fromTo(elements,
                    { opacity: 0, x: 60 },
                    { opacity: 1, x: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out', overwrite: true }
                );
            },
            start: 'top 92%',
            onToggle: (self) => triggers.push(self),
        });

        // Batch .reveal-scale
        ScrollTrigger.batch('.reveal-scale', {
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
            start: 'top 92%',
            onToggle: (self) => triggers.push(self),
        });

        // Cleanup ONLY our own triggers, not Hero/Storytelling pins
        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);
}
