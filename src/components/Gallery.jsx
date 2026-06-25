import { useState, useRef } from 'react';
import { X } from 'lucide-react';
const galleryImages = [
    { src: '/hero.png',     caption: 'സന്ധ്യാ സമയത്ത് കൊട്ടിവട്ടം ഇല്ലം', tall: true },
    { src: '/temple.png',   caption: 'ക്ഷേത്ര വാസ്തുവിദ്യ' },
    { src: '/lamps.png',    caption: 'പവിത്രമായ നിലവിളക്കുകൾ', tall: true },
    { src: '/pooja.png',    caption: 'പൂജാകർമ്മം' },
    { src: '/homam.png',    caption: 'ഹോമാഗ്നി', tall: true },
    { src: '/portrait.png', caption: 'ജയരാജൻ നമ്പൂതിരി' },
];

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);
    const sectionRef = useRef(null);

    return (
        <section id="gallery" ref={sectionRef} style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--cream)', position: 'relative', overflow: 'hidden', width: '100%' }}>
            <div className="parchment-texture" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-border-hi), transparent)' }} />
            {/* Warm ambient centre glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(181,149,86,0.06) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '14px' }}>✦ പവിത്ര ദൃശ്യങ്ങൾ ✦</span>
                    <h2 className="reveal-up section-title text-brown-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '10px', marginBottom: '24px' }}>ദിവ്യമായ കാഴ്ചകൾ</h2>
                    <div className="temple-divider reveal-up"><span className="temple-ornament">✦</span></div>
                </div>

                {/* Masonry */}
                <div className="reveal-scale masonry-grid">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="masonry-item"
                            onClick={() => setLightbox(img)}
                            style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--gold-border)', cursor: 'none', boxShadow: '0 8px 30px rgba(21,12,7,0.08)', willChange: 'transform', transform: 'translateZ(0)' }}>
                            {/* Corner ornaments */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '18px', height: '18px', borderTop: '1px solid var(--gold-border-hi)', borderLeft: '1px solid var(--gold-border-hi)', zIndex: 3 }} />
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '18px', height: '18px', borderBottom: '1px solid var(--gold-border-hi)', borderRight: '1px solid var(--gold-border-hi)', zIndex: 3 }} />
                            <img src={img.src} alt={img.caption}
                                style={{ width: '100%', display: 'block', objectFit: 'cover', height: img.tall ? '360px' : '210px', transition: 'transform 0.6s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(21,12,7,0.85) 0%, rgba(21,12,7,0.2) 50%, transparent 100%)', opacity: 0, transition: 'opacity 0.35s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = 1; }} onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}>
                                <p style={{ position: 'absolute', bottom: '14px', left: '14px', fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.76rem', letterSpacing: '0.15em', color: 'var(--gold-light)', textTransform: 'uppercase' }}>{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--gold-light)', cursor: 'none', zIndex: 10 }}>
                        <X size={30} />
                    </button>
                    <div style={{ position: 'relative', maxWidth: '900px', maxHeight: '85vh', overflow: 'hidden', border: '1px solid var(--gold-border-hi)', boxShadow: '0 20px 80px rgba(0,0,0,0.8)' }} onClick={e => e.stopPropagation()}>
                        <img src={lightbox.src} alt={lightbox.caption} style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 18px', background: 'rgba(21,12,7,0.95)', borderTop: '1px solid var(--gold-border)', textAlign: 'center' }}>
                            <p style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--gold-light)', textTransform: 'uppercase' }}>{lightbox.caption}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
