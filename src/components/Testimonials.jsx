import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    { name: 'Priya Shankar', location: 'Kozhikode', quote: 'The Ganapathi Homam performed by Jayarajan Namboothiri was an experience of profound divinity. Every moment felt sacred.', ritual: 'Ganapathi Homam' },
    { name: 'Suresh Menon', location: 'Thrissur', quote: 'The atmosphere at Kottivattam Illam is unlike any other. The authenticity of the tradition is palpable in every chant and every flame.', ritual: 'Navagraha Pooja' },
    { name: 'Meera Krishnaswamy', location: 'Bangalore', quote: 'We travelled from Bangalore specifically for the Sudarshana Homam. The precision and devotion with which Namboothiriji performs is deeply moving.', ritual: 'Sudarshana Homam' },
    { name: 'Ramakrishnan Nair', location: 'Kochi', quote: 'Generations of our family have sought the blessings of Kottivattam Illam. There is a sacred energy here that words cannot capture.', ritual: 'Bhagavathy Pooja' },
];

// Duplicate for seamless marquee
const TRACK = [...testimonials, ...testimonials];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const track1Ref = useRef(null);
    const track2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Two rows scrolling opposite directions
            gsap.to(track1Ref.current, {
                xPercent: -50,
                ease: 'none',
                duration: 28,
                repeat: -1,
            });
            gsap.to(track2Ref.current, {
                xPercent: -50,
                ease: 'none',
                duration: 32,
                repeat: -1,
                // Start offset so rows feel staggered
                delay: -8,
            });

            // Ambient pulse
            gsap.to('.test-glow', {
                scale: 1.4, opacity: 0.06,
                duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });

            // Section header reveal
            gsap.fromTo('.test-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const Card = ({ t, flipped = false }) => (
        <div style={{
            flexShrink: 0,
            width: '420px',
            background: flipped ? 'rgba(30, 10, 5, 0.9)' : 'rgba(22, 7, 3, 0.92)',
            border: `1px solid rgba(${flipped ? '255,153,51' : '212,175,55'},0.12)`,
            padding: '32px 36px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 60px rgba(0,0,0,0.4)',
        }}>
            {/* Large quote mark */}
            <div style={{ position: 'absolute', top: '10px', left: '20px', fontFamily: "'Playfair Display', serif", fontSize: '6rem', color: 'rgba(255,153,51,0.07)', lineHeight: 1, userSelect: 'none' }}>"</div>

            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#ff9933', opacity: 0.7, display: 'block', marginBottom: '16px' }}>{t.ritual}</span>

            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(253,245,230,0.85)', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                "{t.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #cc4400, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cinzel', serif", fontSize: '0.8rem', color: '#140502', fontWeight: 700 }}>
                    {t.name[0]}
                </div>
                <div>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', color: '#d4af37', fontWeight: 700 }}>{t.name}</p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(253,245,230,0.4)', marginTop: '2px' }}>{t.location}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: '#ff9933', fontSize: '0.9rem' }}>✦</span>
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} id="testimonials" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden', background: '#0b0201' }}>
            <div className="test-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '400px', background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            {/* Header */}
            <div className="test-header" style={{ textAlign: 'center', marginBottom: '72px', padding: '0 32px' }}>
                <span className="section-eyebrow" style={{ letterSpacing: '0.5em', marginBottom: '12px' }}>✦ Voices of Devotees ✦</span>
                <h2 className="section-title text-gold-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>Sacred Testimonies</h2>
                <div className="devotional-divider"><span className="om-ornament"></span></div>
            </div>

            {/* Row 1 — left scrolling */}
            <div style={{ overflow: 'hidden', marginBottom: '20px' }}>
                <div ref={track1Ref} style={{ display: 'flex', gap: '20px', width: 'max-content' }}>
                    {TRACK.map((t, i) => <Card key={i} t={t} />)}
                </div>
            </div>

            {/* Row 2 — also left (slight offset creates depth illusion) */}
            <div style={{ overflow: 'hidden' }}>
                <div ref={track2Ref} style={{ display: 'flex', gap: '20px', width: 'max-content' }}>
                    {[...TRACK].reverse().map((t, i) => <Card key={i} t={t} flipped />)}
                </div>
            </div>
        </section>
    );
}
