import { useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
    { src: '/hero.png', caption: 'Kottivattam Illam at Twilight', tall: true },
    { src: '/temple.png', caption: 'Sacred Temple Architecture' },
    { src: '/lamps.png', caption: 'The Sacred Oil Lamps', tall: true },
    { src: '/pooja.png', caption: 'Ritual Ceremony' },
    { src: '/homam.png', caption: 'The Sacred Fire — Homam', tall: true },
    { src: '/portrait.png', caption: 'Jayarajan Namboothiri' },
];

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);

    return (
        <section id="gallery" style={{ padding: '100px 0', background: '#140502', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <span className="reveal-up section-eyebrow" style={{ marginBottom: '16px', letterSpacing: '0.4em' }}>✦ Sacred Visuals ✦</span>
                    <h2 className="reveal-up section-title text-gold-gradient">The Divine Frame</h2>
                    <div className="devotional-divider reveal-up">
                        <span className="om-ornament"></span>
                    </div>
                </div>

                {/* Masonry */}
                <div className="reveal-scale masonry-grid">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="masonry-item"
                            onClick={() => setLightbox(img)}
                            style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,153,51,0.18)', cursor: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', willChange: 'transform', transform: 'translateZ(0)' }}
                        >
                            <img src={img.src} alt={img.caption}
                                style={{ width: '100%', display: 'block', objectFit: 'cover', height: img.tall ? '380px' : '220px', transition: 'transform 0.6s ease' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(20,5,2,0.95) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.35s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = 1; }} onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
                            >
                                <p style={{ position: 'absolute', bottom: '16px', left: '16px', fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '0.12em', color: '#d4af37' }}>{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#ff9933', cursor: 'none', zIndex: 10 }}>
                        <X size={32} />
                    </button>
                    <div style={{ position: 'relative', maxWidth: '900px', maxHeight: '85vh', overflow: 'hidden', border: '1px solid rgba(255,153,51,0.4)', boxShadow: '0 20px 80px rgba(255,69,0,0.15)' }} onClick={e => e.stopPropagation()}>
                        <img src={lightbox.src} alt={lightbox.caption} style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px', background: 'rgba(20,5,2,0.95)' }}>
                            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.15em', color: '#d4af37' }}>{lightbox.caption}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
