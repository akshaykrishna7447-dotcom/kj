import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagnetic(options = { strength: 0.5, radius: 100 }) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            
            // Calculate center of element
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            // Distance from mouse to center
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            
            // If within radius, attract
            if (Math.abs(distanceX) < options.radius && Math.abs(distanceY) < options.radius) {
                xTo(distanceX * options.strength);
                yTo(distanceY * options.strength);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [options.strength, options.radius]);

    return ref;
}
