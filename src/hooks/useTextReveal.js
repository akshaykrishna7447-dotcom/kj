import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal() {
    const textRef = useRef(null);
    const charsRef = useRef([]);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        // Simple text splitting (if text is plain text)
        const text = el.innerText;
        el.innerHTML = ''; // clear
        
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px) rotateX(-50deg)';
            span.style.transformOrigin = 'bottom center';
            span.style.willChange = 'transform, opacity';
            charsRef.current[i] = span;
            wrapper.appendChild(span);
            return span;
        });
        
        el.appendChild(wrapper);

        const ctx = gsap.context(() => {
            gsap.to(charsRef.current, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            });
        }, textRef);

        return () => ctx.revert();
    }, []);

    return textRef;
}
