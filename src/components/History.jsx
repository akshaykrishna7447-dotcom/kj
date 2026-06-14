import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        year: '~800 CE',
        title: 'The Sacred Origin',
        body: 'Kottivattam Illam was established by a lineage of revered Namboothiri Brahmins who carried the undying flame of Vedic knowledge from the ancient heartlands of Kerala. The founding patriarch was a celebrated scholar of the Rigveda, entrusted with performing the most sacred of all Kerala temple rituals — the Ashtamangala Devaprasnam.',
        img: '/temple.png',
    },
    {
        year: 'Generations Past',
        title: 'Heritage of Ritual',
        body: 'For over a millennium, the Illam served as the spiritual anchor of the surrounding community in Calicut. Generation after generation, the sacred thread of Vedic tradition was passed father to son — unbroken. The Illam became renowned across northern Kerala as a centre of authentic Brahminic learning, ritual mastery, and selfless divine service.',
        img: '/hero.png',
    },
    {
        year: 'Architecture',
        title: 'The Sacred Spaces',
        body: 'Constructed in the traditional Kerala Nalukettu style, the Illam is a masterpiece of sacred architecture. Intricately carved wooden pillars frame the central courtyard — the Nadumuttam — open to the sky as both a ritual space and a place of contemplation. A sacred Tulasi garden, a consecrated Nirmalya kund, and hand-painted temple murals complete this living sanctuary.',
        img: '/lamps.png',
    },
    {
        year: 'Living Tradition',
        title: 'Continuity of the Sacred',
        body: 'Today, under the devoted stewardship of Jayarajan Namboothiri, every ancient practice continues with the same unwavering fidelity as it did a thousand years ago. Daily rituals, seasonal festivals, and the great fire sacrifices bind the past to the present. The sacred fire of Kottivattam Illam has never once been extinguished — not through flood, famine, or the passage of empires.',
        img: '/pooja.png',
    },
];

export default function History() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const imgRefs = useRef([]);
    const textRefs = useRef([]);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const getScrollAmount = () => -(containerRef.current.scrollWidth - window.innerWidth);
            const endScroll = () => `+=${containerRef.current.scrollWidth - window.innerWidth}`;

            // Progress fraction per card transition
            const cardCount = timelineData.length;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: endScroll,
                    pin: true,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Ken Burns: each image gets slightly different parallax speed
                        imgRefs.current.forEach((img, i) => {
                            if (!img) return;
                            const cardProgress = self.progress * (cardCount - 1) - i;
                            const clamped = Math.max(-1, Math.min(1, cardProgress));
                            gsap.set(img, { xPercent: clamped * -8, scale: 1.12 - Math.abs(clamped) * 0.06 });
                        });

                        // Large number depth parallax
                        numberRefs.current.forEach((num, i) => {
                            if (!num) return;
                            const cardProgress = self.progress * (cardCount - 1) - i;
                            const clamped = Math.max(-1, Math.min(1, cardProgress));
                            gsap.set(num, { xPercent: clamped * 15, opacity: 0.08 + Math.max(0, 1 - Math.abs(clamped)) * 0.04 });
                        });
                    }
                }
            });

            // Horizontal translate and progress bar sync
            tl.to(containerRef.current, {
                x: getScrollAmount,
                ease: 'none',
                duration: cardCount - 1,
            }, 0);

            tl.to('.history-progress', {
                width: '100%',
                ease: 'none',
                duration: cardCount - 1,
            }, 0);

            // Text reveal per card as it enters
            textRefs.current.forEach((textEl, i) => {
                if (!textEl) return;
                const children = Array.from(textEl.children);
                // Cards 0,1,2,3 enter at progress 0, 1/(n-1), 2/(n-1), etc.
                const enterAt = i / (cardCount - 1);
                const leaveAt = (i + 1) / (cardCount - 1);
                gsap.fromTo(children,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `top+=${enterAt * (containerRef.current?.scrollWidth - window.innerWidth || 2000)} top`,
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="illam" ref={sectionRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#140502', position: 'relative' }}>

            {/* Pinned Title */}
            <div style={{ position: 'absolute', top: '10vh', left: '0', width: '100vw', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
                <span className="section-eyebrow" style={{ marginBottom: '12px', letterSpacing: '0.5em', color: 'rgba(212,175,55,0.6)' }}>✦ Lineage ✦</span>
                <h2 className="section-title text-gold-gradient" style={{ paddingBottom: '8px', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>History & Heritage</h2>
                <div className="divider-gold" style={{ width: '120px', margin: '16px auto 0', height: '1px' }} />
            </div>

            {/* Horizontal strip */}
            <div ref={containerRef} style={{ display: 'flex', width: `${timelineData.length * 100}vw`, height: '100vh', alignItems: 'center', willChange: 'transform' }}>
                {timelineData.map((item, i) => (
                    <div key={i} style={{ width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', marginTop: '12vh' }}>
                        <div style={{
                            display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1280px',
                            height: '62vh', overflow: 'hidden',
                            border: '1px solid rgba(212,175,55,0.15)',
                            boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
                        }}>
                            {/* Image col with Ken Burns */}
                            <div style={{ flex: '1.3', position: 'relative', overflow: 'hidden' }}>
                                <div
                                    ref={el => imgRefs.current[i] = el}
                                    style={{
                                        position: 'absolute', inset: '-10%',
                                        backgroundImage: `url(${item.img})`,
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        willChange: 'transform',
                                        transform: 'scale(1.12)',
                                    }}
                                />
                                {/* Right fade */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, #140502 100%)' }} />
                                {/* Large number */}
                                <div ref={el => numberRefs.current[i] = el} style={{
                                    position: 'absolute', bottom: '16px', left: '24px',
                                    fontFamily: "'Cinzel', serif", fontWeight: 700,
                                    fontSize: 'clamp(5rem, 10vw, 9rem)',
                                    color: '#ff9933', opacity: 0.08, lineHeight: 1,
                                    userSelect: 'none',
                                }}>
                                    0{i + 1}
                                </div>
                            </div>

                            {/* Text col */}
                            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px', position: 'relative', background: '#140502' }}>
                                <div ref={el => textRefs.current[i] = el}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff9933', boxShadow: '0 0 12px rgba(255,153,51,0.9)', flexShrink: 0 }} />
                                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.4em', color: '#d4af37' }}>{item.year}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fdf5e6', marginBottom: '20px', lineHeight: 1.15 }}>
                                        {item.title}
                                    </h3>
                                    <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #ff9933, transparent)', marginBottom: '20px' }} />
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(253,245,230,0.75)', maxWidth: '420px' }}>
                                        {item.body}
                                    </p>
                                </div>

                                {/* Card counter */}
                                <div style={{ position: 'absolute', bottom: '32px', right: '40px', fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(212,175,55,0.4)' }}>
                                    {String(i + 1).padStart(2, '0')} / {String(timelineData.length).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Horizontal progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(212,175,55,0.1)', zIndex: 20 }}>
                <div className="history-progress" style={{ height: '100%', background: 'linear-gradient(90deg, #ff9933, #d4af37)', width: '0%', transition: 'none' }} />
            </div>
        </section>
    );
}
