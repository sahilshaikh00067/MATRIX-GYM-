import { useState, useEffect, useRef, useCallback } from 'react'

// ── Image URLs (premium set) ────────────────────────────────────────────────
const IMGS = {
  hero1:    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=90',
  hero2:    'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=1920&q=90',
  hero3:    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=90',
  about:    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=90',
  about2:   'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=90',
  trainer1: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=90',
  trainer2: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=90',
  trainer3: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=90',
  trainer4: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=90',
  class1:   'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=90',
  class2:   'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=700&q=90',
  class3:   'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=90',
  class4:   'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=700&q=90',
  class5:   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=90',
  class6:   'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?w=700&q=90',
  gallery1: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=90',
  gallery2: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=90',
  gallery3: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=90',
  gallery4: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=800&q=90',
  gallery5: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=90',
  gallery6: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=90',
  gallery7: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=90',
  gallery8: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=90',
  equip1:   'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?w=700&q=90',
  equip2:   'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=700&q=90',
  cta:      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=90',
  showcase1:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=900&q=90',
  showcase2:'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&q=90',
}

// ── Global ultra-premium styles ─────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap');

      :root{
        --bg:#040509; --bg2:#080a10; --bg3:#0c0f16; --bg4:#11141c;
        --blue:#0ea5e9; --blue-dark:#0284c7; --blue-glow:rgba(14,165,233,0.4);
        --gold:#d4af6a; --gold-dim:#b08d4f; --gold-glow:rgba(212,175,106,0.4);
        --plat:#eef0f5; --plat-dim:#c3c8d4; --plat-muted:#8b93a3;
        --txt-muted:#94a0b3; --txt-dim:#4c5566;
        --border:rgba(255,255,255,0.07); --border-blue:rgba(14,165,233,0.35); --border-gold:rgba(212,175,106,0.32);
        --glass:rgba(18,21,30,0.55);
        --radius-sm:8px; --radius-lg:16px; --radius-xl:26px;
        --ease:cubic-bezier(.16,1,.3,1);
      }
      *{box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:var(--bg); color:var(--plat); margin:0; overflow-x:hidden;}
      ::selection{background:var(--gold); color:#000;}
      .font-bebas{font-family:'Bebas Neue',sans-serif;}
      .font-rajdhani{font-family:'Rajdhani',sans-serif;}
      .font-orbitron{font-family:'Orbitron',sans-serif;}
      .container{max-width:1280px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:2;}
      .section-py{padding:6.5rem 0;}
      @media(max-width:768px){.section-py{padding:3.75rem 0;}}
      .hero-title{font-size:clamp(48px,9vw,124px); letter-spacing:0.01em;}
      .section-title{font-size:clamp(36px,5.5vw,66px); letter-spacing:0.01em;}
      .text-center{text-align:center;} .text-glow-blue{text-shadow:0 0 44px var(--blue-glow);}
      .hidden{display:none;} .hide-xs{display:flex;}
      @media(min-width:1024px){.lg\\:flex{display:flex !important;} .lg\\:hidden{display:none !important;}}
      @media(max-width:1023px){.lg\\:flex{display:none !important;}}
      @media(max-width:640px){.hide-xs{display:none !important;}}

      /* ── Aurora / mesh backdrop ── */
      .aurora-field{position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none;}
      .aurora-blob{position:absolute; border-radius:50%; filter:blur(90px); opacity:0.28; will-change:transform;}
      .aurora-1{width:520px; height:520px; background:var(--blue); top:-10%; left:-8%; animation:auroraFloat1 22s ease-in-out infinite;}
      .aurora-2{width:460px; height:460px; background:var(--gold); top:35%; right:-10%; animation:auroraFloat2 26s ease-in-out infinite;}
      .aurora-3{width:400px; height:400px; background:#7c3aed; opacity:0.14; bottom:-8%; left:20%; animation:auroraFloat3 30s ease-in-out infinite;}
      @keyframes auroraFloat1{0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(60px,80px) scale(1.15);}}
      @keyframes auroraFloat2{0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-70px,50px) scale(1.1);}}
      @keyframes auroraFloat3{0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(40px,-60px) scale(1.2);}}
      .noise-overlay{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:0.035; mix-blend-mode:overlay;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

      /* ── Preloader ── */
      .preloader{position:fixed; inset:0; z-index:200; background:var(--bg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.25rem; transition:opacity .7s ease, visibility .7s ease;}
      .preloader.hide{opacity:0; visibility:hidden; pointer-events:none;}
      .preloader-mark{width:64px; height:64px; position:relative;}
      .preloader-mark::before{content:''; position:absolute; inset:0; border:2px solid rgba(212,175,106,0.18); border-top-color:var(--gold); border-radius:50%; animation:spin 0.9s linear infinite;}
      @keyframes spin{to{transform:rotate(360deg);}}
      .preloader-text{font-family:'Orbitron',monospace; font-size:11px; letter-spacing:0.35em; color:var(--txt-muted); text-transform:uppercase;}

      /* ── Scroll progress ── */
      .scroll-progress{position:fixed; top:0; left:0; height:2px; background:linear-gradient(90deg,var(--blue),var(--gold)); z-index:100; transition:width .1s linear;}

      /* ── Nav ── */
      .nav-glass{background:rgba(4,5,9,0.72); backdrop-filter:blur(20px) saturate(160%); -webkit-backdrop-filter:blur(20px) saturate(160%); border-bottom:1px solid var(--border); box-shadow:0 8px 32px rgba(0,0,0,0.25);}
      .mobile-menu{position:fixed; top:0; right:0; height:100vh; width:min(320px,85vw); background:rgba(6,7,12,0.92); backdrop-filter:blur(24px); z-index:40; transform:translateX(100%); transition:transform 0.45s var(--ease); border-left:1px solid var(--border-gold);}
      .mobile-menu.open{transform:translateX(0);}

      /* ── Magnetic buttons ── */
      .btn-primary{position:relative; font-family:'Orbitron',monospace; font-weight:700; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; padding:0.95rem 1.9rem; border-radius:var(--radius-sm); border:none; cursor:pointer; color:#05060a; background:linear-gradient(120deg,var(--blue) 0%,var(--blue-dark) 100%); box-shadow:0 10px 30px rgba(14,165,233,0.34); transition:transform .35s var(--ease), box-shadow .35s var(--ease); will-change:transform;}
      .btn-primary:hover{box-shadow:0 16px 40px rgba(14,165,233,0.5);}
      .btn-outline{position:relative; font-family:'Orbitron',monospace; font-weight:700; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; padding:0.95rem 1.9rem; border-radius:var(--radius-sm); cursor:pointer; color:#fff; background:rgba(255,255,255,0.02); backdrop-filter:blur(6px); border:1px solid var(--border-gold); transition:transform .35s var(--ease), border-color .3s ease, background .3s ease; will-change:transform;}
      .btn-outline:hover{border-color:var(--gold); background:rgba(212,175,106,0.1);}
      .btn-sm{padding:0.58rem 1.15rem; font-size:0.62rem;}

      /* ── Section label ── */
      .section-label{display:flex; align-items:center; justify-content:center; gap:0.75rem; margin-bottom:0.9rem;}
      .section-label-line{height:1px; width:32px; background:linear-gradient(90deg,transparent,var(--gold));}
      .section-label-line:last-child{background:linear-gradient(90deg,var(--gold),transparent);}
      .section-label-text{font-family:'Orbitron',monospace; font-size:11px; letter-spacing:0.34em; color:var(--gold); text-transform:uppercase;}

      /* ── Glass cards ── */
      .card-base{background:var(--glass); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid var(--border); border-radius:var(--radius-lg); transition:transform .4s var(--ease), border-color .3s ease, box-shadow .4s var(--ease);}
      .hover-scale:hover{transform:translateY(-6px); border-color:var(--border-blue); box-shadow:0 22px 50px rgba(0,0,0,0.45);}
      .neon-border{border:1px solid var(--border-gold); box-shadow:0 0 0 1px rgba(212,175,106,0.08), 0 24px 64px rgba(0,0,0,0.55);}

      /* ── Cursor ── */
      .cursor{position:fixed; width:10px; height:10px; border-radius:50%; background:var(--gold); pointer-events:none; z-index:9999; transition:transform .15s ease; mix-blend-mode:difference;}
      .cursor.active{transform:scale(2.2);}
      .cursor-follower{position:fixed; width:40px; height:40px; border-radius:50%; border:1px solid var(--border-blue); pointer-events:none; z-index:9998; transition:all .22s var(--ease);}
      @media(max-width:1023px){.cursor,.cursor-follower{display:none;}}

      /* ── Ticker ── */
      .ticker-wrap{overflow:hidden; white-space:nowrap;}
      .ticker{display:inline-flex; animation:scrollTicker 28s linear infinite;}
      @keyframes scrollTicker{from{transform:translateX(0);} to{transform:translateX(-50%);}}

      /* ── Progress bars ── */
      .progress-track{height:5px; border-radius:99px; background:rgba(255,255,255,0.07); overflow:hidden;}
      .progress-fill{height:100%; border-radius:99px; background:linear-gradient(90deg,var(--blue),var(--gold)); transition:width 1.4s var(--ease); box-shadow:0 0 12px var(--blue-glow);}

      /* ── About (premium 3D) ── */
      .about-badge{position:absolute; background:var(--glass); backdrop-filter:blur(14px); border:1px solid var(--border-gold); border-radius:var(--radius-lg); padding:1.1rem 1.4rem; box-shadow:0 18px 46px rgba(0,0,0,0.6), 0 0 30px var(--gold-glow); z-index:3; animation:badgeFloat 4.2s ease-in-out infinite;}
      @keyframes badgeFloat{0%,100%{transform:translateY(0) rotate(-2deg);} 50%{transform:translateY(-10px) rotate(1deg);}}
      .about-grid{display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;}
      @media(max-width:900px){.about-grid{grid-template-columns:1fr; gap:5rem 0;}}
      .about-media{position:relative;}
      .about-media::before{content:''; position:absolute; inset:-18px; border:1px solid var(--border-gold); border-radius:calc(var(--radius-lg) + 18px); opacity:0.5; animation:ringSpin 30s linear infinite;}
      .about-media::after{content:''; position:absolute; inset:-34px; border:1px dashed rgba(14,165,233,0.2); border-radius:calc(var(--radius-lg) + 34px); animation:ringSpin 46s linear infinite reverse;}
      @keyframes ringSpin{from{transform:rotate(0deg);} to{transform:rotate(360deg);}}
      .about-img-main{position:relative; border-radius:var(--radius-lg); overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,0.6);}
      .about-img-sub{position:absolute; bottom:-28px; right:-20px; width:170px; height:170px; border-radius:var(--radius-lg); overflow:hidden; box-shadow:0 24px 54px rgba(0,0,0,0.65); animation:subFloat 5s ease-in-out infinite;}
      @keyframes subFloat{0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);}}
      .feature-grid{display:grid; grid-template-columns:1fr 1fr; gap:0.9rem;}
      .feature-card{position:relative; background:var(--glass); backdrop-filter:blur(12px); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1.2rem; overflow:hidden; transform-style:preserve-3d; transition:border-color .35s ease, box-shadow .35s ease;}
      .feature-card:hover{border-color:var(--border-blue); box-shadow:0 20px 46px rgba(0,0,0,0.5);}
      .feature-icon-wrap{width:44px; height:44px; border-radius:12px; background:radial-gradient(circle at 30% 20%,rgba(14,165,233,0.18),rgba(255,255,255,0.02)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem; font-size:20px; transition:transform .5s var(--ease);}
      .feature-card:hover .feature-icon-wrap{transform:rotateY(360deg) scale(1.1); border-color:var(--border-blue);}
      .progress-track{height:6px; border-radius:99px; background:rgba(255,255,255,0.06); overflow:hidden; position:relative;}
      .progress-fill{height:100%; border-radius:99px; background:linear-gradient(90deg,var(--blue),var(--gold)); transition:width 1.6s var(--ease); box-shadow:0 0 14px var(--blue-glow); position:relative; overflow:hidden;}
      .progress-fill::after{content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent); animation:progressShine 2.2s ease-in-out infinite;}
      @keyframes progressShine{0%{transform:translateX(-100%);} 100%{transform:translateX(200%);}}

      /* ── Grids ── */
      .grid-2{display:grid; grid-template-columns:1fr 1fr; gap:1rem;}
      .grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;}
      .grid-4{display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;}
      @media(max-width:900px){.grid-3{grid-template-columns:1fr 1fr;} .grid-4{grid-template-columns:1fr 1fr;}}
      @media(max-width:560px){.grid-2{grid-template-columns:1fr;} .grid-3{grid-template-columns:1fr;} .grid-4{grid-template-columns:1fr;}}
      .stats-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:2rem;}
      @media(max-width:700px){.stats-grid{grid-template-columns:1fr 1fr;}}

      /* ── Services (large premium boxes) ── */
      .services-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem;}
      @media(max-width:1100px){.services-grid{grid-template-columns:1fr 1fr;}}
      @media(max-width:640px){.services-grid{grid-template-columns:1fr;}}
      .service-card{position:relative; background:linear-gradient(160deg,rgba(255,255,255,0.035) 0%,rgba(255,255,255,0.01) 100%),linear-gradient(160deg,var(--bg4) 0%,var(--bg3) 100%); border:1px solid var(--border); border-radius:var(--radius-xl); padding:2.6rem 2.2rem; overflow:hidden; cursor:pointer; transform-style:preserve-3d; min-height:280px; display:flex; flex-direction:column;}
      .service-card:hover{border-color:var(--border-gold); box-shadow:0 32px 70px rgba(0,0,0,0.55);}
      .service-card:hover .service-glow{opacity:1;}
      .service-card:hover .service-icon-wrap{transform:scale(1.08) rotate(-4deg); border-color:var(--gold); box-shadow:0 0 32px var(--gold-glow);}
      .service-glow{position:absolute; inset:0; background:radial-gradient(circle at 25% 0%,rgba(212,175,106,0.2),transparent 62%); opacity:0; transition:opacity .4s ease; pointer-events:none;}
      .service-num{position:absolute; top:1.6rem; right:1.9rem; font-family:'Orbitron',monospace; font-size:13px; color:var(--txt-dim); letter-spacing:0.12em;}
      .service-icon-wrap{width:72px; height:72px; border-radius:20px; background:radial-gradient(circle at 30% 20%,rgba(212,175,106,0.14),rgba(255,255,255,0.02)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; margin-bottom:1.6rem; transition:all .5s var(--ease); perspective:600px; position:relative; animation:iconFloat 3.6s ease-in-out infinite;}
      .service-card:nth-child(2n) .service-icon-wrap{animation-delay:.4s;}
      .service-card:nth-child(3n) .service-icon-wrap{animation-delay:.8s;}
      @keyframes iconFloat{0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);}}
      .service-icon-wrap::after{content:''; position:absolute; inset:-6px; border-radius:24px; border:1px solid var(--border-gold); opacity:0; transition:opacity .4s ease, transform .4s ease; transform:scale(0.85);}
      .service-card:hover .service-icon-wrap{border-color:var(--gold); box-shadow:0 0 36px var(--gold-glow);}
      .service-card:hover .service-icon-wrap::after{opacity:1; transform:scale(1);}
      .service-icon-svg{width:34px; height:34px; color:var(--gold); transition:transform .7s var(--ease); transform-style:preserve-3d;}
      .service-card:hover .service-icon-svg{transform:rotateY(360deg) rotateX(8deg) scale(1.12);}

      /* ── Flip trainer cards ── */
      .flip-wrap{perspective:1400px; position:relative;}
      .flip-inner{position:relative; width:100%; height:100%; transition:transform .8s var(--ease); transform-style:preserve-3d;}
      .flip-wrap:hover .flip-inner{transform:rotateY(180deg);}
      .flip-front,.flip-back{position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden;}
      .flip-back{transform:rotateY(180deg); background:var(--bg4); padding:1.4rem; display:flex; flex-direction:column;}

      /* ── Schedule ── */
      .day-tabs{display:flex; gap:0.5rem; overflow-x:auto; padding-bottom:4px;}
      .day-tab{font-family:'Orbitron',monospace; font-size:11px; letter-spacing:0.12em; padding:0.62rem 1.15rem; border-radius:var(--radius-sm); border:1px solid var(--border); background:var(--bg4); color:var(--txt-muted); cursor:pointer; transition:all .3s var(--ease); white-space:nowrap;}
      .day-tab.active{background:var(--blue); border-color:var(--blue); color:#fff; box-shadow:0 8px 24px rgba(14,165,233,0.35);}
      .schedule-item{border-bottom:1px solid var(--border); transition:background .3s ease;}
      .schedule-item:hover{background:rgba(255,255,255,0.02);}

      /* ── Pricing ── */
      .pricing-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem; align-items:start;}
      @media(max-width:900px){.pricing-grid{grid-template-columns:1fr; max-width:420px; margin:0 auto;}}
      .plan-card{background:var(--glass); backdrop-filter:blur(14px); border:1px solid var(--border); border-radius:var(--radius-xl); padding:2.1rem; transform-style:preserve-3d; transition:box-shadow .4s var(--ease);}
      .plan-card.featured{border:1px solid var(--border-gold); background:linear-gradient(165deg,rgba(18,21,30,0.7) 0%,rgba(19,23,32,0.75) 100%); box-shadow:0 28px 70px rgba(14,165,233,0.16);}
      .plan-card:hover{box-shadow:0 30px 70px rgba(0,0,0,0.5);}

      /* ── Gallery ── */
      .gallery-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:0.9rem;}
      @media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,1fr);}}
      .gallery-item{position:relative; border-radius:var(--radius-lg); overflow:hidden; aspect-ratio:1; cursor:pointer;}
      .gallery-item img{width:100%; height:100%; object-fit:cover; transition:transform .6s var(--ease);}
      .gallery-item:hover img{transform:scale(1.15) rotate(1deg);}
      .gallery-overlay{position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(4,5,9,0.6); opacity:0; transition:opacity .35s ease;}
      .gallery-item:hover .gallery-overlay{opacity:1;}

      /* ── Testimonial 3D carousel ── */
      .tcarousel{position:relative; height:340px; display:flex; align-items:center; justify-content:center; perspective:1600px;}
      .tcard{position:absolute; width:min(640px,88vw); background:var(--glass); backdrop-filter:blur(16px); border:1px solid var(--border); border-radius:var(--radius-xl); padding:clamp(1.5rem,4vw,2.75rem); text-align:center; transition:transform .6s var(--ease), opacity .6s var(--ease), filter .6s var(--ease);}

      /* ── Contact ── */
      .contact-grid{display:grid; grid-template-columns:1fr 1.1fr; gap:3rem;}
      @media(max-width:900px){.contact-grid{grid-template-columns:1fr;}}
      .input-field{width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:var(--radius-sm); padding:0.85rem 1rem; color:#fff; font-family:'Rajdhani',sans-serif; font-size:15px; outline:none; transition:border-color .25s ease, background .25s ease;}
      .input-field:focus{border-color:var(--blue); background:rgba(14,165,233,0.05);}
      .social-btn{font-family:'Orbitron',monospace; font-size:10px; letter-spacing:0.1em; padding:0.55rem 1rem; border-radius:var(--radius-sm); border:1px solid var(--border); background:var(--bg4); color:var(--txt-muted); cursor:pointer; transition:all .3s var(--ease);}
      .social-btn:hover{border-color:var(--gold); color:var(--gold); transform:translateY(-2px);}

      /* ── Text effects ── */
      .shimmer-text{background:linear-gradient(90deg,var(--blue) 0%,var(--gold) 50%,var(--blue) 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:shimmer 4s linear infinite;}
      @keyframes shimmer{to{background-position:-200% center;}}
      .pulse-ring{position:relative;}
      .pulse-ring::after{content:'';position:absolute; inset:-8px; border-radius:50%; border:1px solid var(--gold); animation:pulseRing 1.8s ease-out infinite;}
      @keyframes pulseRing{0%{opacity:.7; transform:scale(0.9);} 100%{opacity:0; transform:scale(1.5);}}

      /* ── Animations ── */
      .transition-all{transition-property:all;} .duration-700{transition-duration:700ms;} .duration-1000{transition-duration:1000ms;} .delay-200{transition-delay:200ms;}
      .opacity-0{opacity:0;}
      @keyframes fadeUp{from{opacity:0; transform:translateY(32px) rotateX(-6deg);} to{opacity:1; transform:translateY(0) rotateX(0);}}
      @keyframes fadeLeft{from{opacity:0; transform:translateX(-36px);} to{opacity:1; transform:translateX(0);}}
      @keyframes fadeRight{from{opacity:0; transform:translateX(36px);} to{opacity:1; transform:translateX(0);}}
      @keyframes scaleIn{from{opacity:0; transform:scale(0.92);} to{opacity:1; transform:scale(1);}}
      .animate-fadeUp{animation:fadeUp .85s var(--ease) forwards;}
      .animate-fadeLeft{animation:fadeLeft .85s var(--ease) forwards;}
      .animate-fadeRight{animation:fadeRight .85s var(--ease) forwards;}
      .animate-scaleIn{animation:scaleIn .75s var(--ease) forwards;}

      .w-full{width:100%;} .h-full{height:100%;}
    `}</style>
  )
}

// ── Preloader ────────────────────────────────────────────────────────────────
function Preloader() {
  const [hide, setHide] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHide(true), 900); return () => clearTimeout(t) }, [])
  return (
    <div className={`preloader ${hide ? 'hide' : ''}`}>
      <div className="preloader-mark" />
      <div className="preloader-text font-orbitron">A.MATERRIX GYM</div>
    </div>
  )
}

// ── Scroll progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100
      setPct(scrolled || 0)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

// ── Aurora backdrop ──────────────────────────────────────────────────────────
function AuroraField() {
  return (
    <div className="aurora-field">
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
    </div>
  )
}

// ── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ── Counter ─────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()
  useEffect(() => {
    if (!inView) return
    let val = 0
    const step = end / (duration / 16)
    const t = setInterval(() => { val += step; if (val >= end) { setCount(end); clearInterval(t) } else setCount(Math.floor(val)) }, 16)
    return () => clearInterval(t)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

// ── Custom Cursor ───────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(() => {
    const move = e => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 5 + 'px'; dotRef.current.style.top = e.clientY - 5 + 'px' }
      if (ringRef.current) { ringRef.current.style.left = e.clientX - 20 + 'px'; ringRef.current.style.top = e.clientY - 20 + 'px' }
    }
    const over = () => dotRef.current?.classList.add('active')
    const out = () => dotRef.current?.classList.remove('active')
    document.addEventListener('mousemove', move)
    const attach = () => document.querySelectorAll('a,button,.hover-scale,.tilt-card').forEach(el => { el.addEventListener('mouseenter', over); el.addEventListener('mouseleave', out) })
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])
  return (<><div className="cursor" ref={dotRef} /><div className="cursor-follower" ref={ringRef} /></>)
}

// ── Tilt Card (stronger 3D depth) ────────────────────────────────────────────
function TiltCard({ children, className = '', style = {}, strength = 12 }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)' }
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ transition: 'transform 0.2s ease', transformStyle: 'preserve-3d', ...style }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  )
}

// ── Magnetic wrapper for buttons ─────────────────────────────────────────────
function Magnetic({ children, strength = 18 }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / r.width
    const y = (e.clientY - r.top - r.height / 2) / r.height
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }
  return (
    <span ref={ref} style={{ display: 'inline-block', transition: 'transform .3s var(--ease)' }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </span>
  )
}

// ── Premium Service Icons (SVG line-art, 3D animated) ────────────────────────
const SERVICE_ICONS = {
  slimming: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6c9 3 15 11 14 20-9 2-17-3-20-11-3 7-1 15 5 19" />
      <path d="M18 34c2-6 4-11 9-15" strokeDasharray="1 5" />
    </svg>
  ),
  mma: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 22c0-6 4-10 10-10s10 4 10 9v9c0 6-5 10-11 10h-2c-5 0-9-3-10-8l-3-9c-1-3 1-6 4-5" />
      <path d="M20 20v6M26 19v8" />
    </svg>
  ),
  pilates: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="10" r="3.4" />
      <path d="M24 14v10l-8 6M24 24l8 6M16 40l6-10M32 40l-6-10" />
    </svg>
  ),
  hybrid: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="20" width="6" height="8" rx="1.5" /><rect x="36" y="20" width="6" height="8" rx="1.5" />
      <path d="M12 24h4M32 24h4" /><rect x="16" y="17" width="4" height="14" rx="1" /><rect x="28" y="17" width="4" height="14" rx="1" />
      <path d="M20 24h8" />
    </svg>
  ),
  bhangra: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="9" r="3.4" />
      <path d="M24 13v12M24 15l-10-6M24 15l10-6M24 25l-8 12M24 25l8 12" />
    </svg>
  ),
  zumba: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 30V10l14-3v20" />
      <circle cx="16" cy="32" r="4" /><circle cx="30" cy="27" r="4" />
    </svg>
  ),
  gymnastics: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M24 6l3.6 8.4L36 16l-6.6 6.1L31 31l-7-4.6-7 4.6 1.6-8.9L12 16l8.4-1.6z" />
    </svg>
  ),
  aerobics: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="9" r="3.4" />
      <path d="M24 13v11M24 15l-9-4M24 15l9-4M24 24l-9 11M24 24l9 11" />
    </svg>
  ),
  yoga: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="10" r="3.4" />
      <path d="M24 14v8M24 16c-4 0-8 4-8 9M24 16c4 0 8 4 8 9M16 25c-2 4-2 8 2 10M32 25c2 4 2 8-2 10M18 35h12" />
    </svg>
  ),
}

// ── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (<div className="section-label"><div className="section-label-line" /><span className="section-label-text">{text}</span><div className="section-label-line" /></div>)
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['Home', 'About', 'Services', 'Classes', 'Trainers', 'Pricing', 'Gallery', 'Contact']
  const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }

  return (
    <>
      <nav className={`transition-all duration-500 ${scrolled ? 'nav-glass py-2' : 'py-5'}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }} onClick={() => go('home')}>
            <div style={{ width: 38, height: 38, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--gold)', transform: 'rotate(45deg)', borderRadius: 4, boxShadow: '0 0 18px var(--gold-glow)' }} />
              <span className="font-orbitron" style={{ fontWeight: 900, color: 'var(--gold)', fontSize: 13, position: 'relative', zIndex: 1 }}>A</span>
            </div>
            <div className="font-bebas" style={{ fontSize: 21, color: '#fff', letterSpacing: '0.06em', lineHeight: 1, whiteSpace: 'nowrap' }}>
              A.MATERRIX <span style={{ color: 'var(--blue)' }}>GYM</span>
            </div>
          </div>

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '1.85rem' }}>
            {links.map(l => (
              <button key={l} onClick={() => go(l)} className="font-rajdhani"
                style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--txt-muted)', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--txt-muted)'}>{l}</button>
            ))}
          </div>

          <div className="hidden lg:flex"><Magnetic><button className="btn-outline btn-sm">Join Now</button></Magnetic></div>

          <button className="lg:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: 'block', height: 2, borderRadius: 2, background: i === 1 ? 'var(--gold)' : '#fff', width: 24, transformOrigin: 'center', transition: 'all 0.3s ease',
                  transform: open ? (i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)') : 'none', opacity: open && i === 1 ? 0 : 1 }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', padding: '5rem 2rem 2rem' }}>
          {links.map((l, i) => (
            <button key={l} onClick={() => go(l)} className="font-bebas"
              style={{ fontSize: 26, color: 'var(--txt-muted)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--txt-muted)'}>
              <span className="font-orbitron" style={{ fontSize: 11, color: 'var(--blue)', marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>{l}
            </button>
          ))}
          <button className="btn-primary" style={{ marginTop: '1rem' }}>JOIN NOW</button>
        </div>
      </div>
      {open && <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setOpen(false)} />}
    </>
  )
}

// ── Hero (3D parallax + smooth slider) ───────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const slides = [
    { img: IMGS.hero1, tag: 'Premium Fitness Club', title: 'BREAK YOUR', sub2: 'LIMITS', sub: 'Luxury facilities · Elite coaches · Proven results' },
    { img: IMGS.hero2, tag: 'Elite Coaching', title: 'TRANSFORM', sub2: 'YOUR BODY', sub: 'World-class equipment · Personal training · 24/7 access' },
    { img: IMGS.hero3, tag: 'Signature Experience', title: 'FORGE YOUR', sub2: 'LEGACY', sub: "Punjab's most advanced premium fitness destination" },
  ]
  useEffect(() => { const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 6000); return () => clearInterval(t) }, [])

  const onMove = e => {
    const r = heroRef.current?.getBoundingClientRect(); if (!r) return
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }

  return (
    <section id="home" ref={heroRef} onMouseMove={onMove} style={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden' }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: 'absolute', inset: '-3%', transition: 'opacity 1.3s ease, transform 8s ease', opacity: i === slide ? 1 : 0, transform: `scale(${i === slide ? 1.06 : 1}) translate(${mouse.x * -14}px, ${mouse.y * -14}px)` }}>
          <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg,rgba(4,5,9,0.94) 10%,rgba(4,5,9,0.55) 55%,rgba(4,5,9,0.25) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,var(--bg) 0%,transparent 100%)' }} />
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', zIndex: 10, transform: `translate(${mouse.x * 10}px, ${mouse.y * 6}px)`, transition: 'transform .3s ease-out' }}>
        <div className="container">
          <div key={slide} className="animate-fadeLeft">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 40, background: 'var(--gold)', flexShrink: 0 }} />
              <span className="font-orbitron" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{slides[slide].tag}</span>
            </div>
            <h1 className="font-bebas hero-title" style={{ color: '#fff', display: 'block', marginBottom: 4 }}>{slides[slide].title}</h1>
            <h1 className="font-bebas hero-title shimmer-text" style={{ display: 'block', marginBottom: '1.5rem' }}>{slides[slide].sub2}</h1>
            <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 'clamp(14px,2vw,18px)', letterSpacing: '0.08em', marginBottom: '2rem', maxWidth: 480 }}>{slides[slide].sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Magnetic><button className="btn-primary" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>START YOUR JOURNEY</button></Magnetic>
              <Magnetic><button className="btn-outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE MORE</button></Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
            style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', width: i === slide ? 28 : 8, background: i === slide ? 'var(--gold)' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '2.5rem', right: '1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} className="hide-xs">
        <span className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  )
}

// ── Ticker ──────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ['STRENGTH', 'ENDURANCE', 'POWER', 'SPEED', 'AGILITY', 'FLEXIBILITY', 'PERFORMANCE', 'EXCELLENCE']
  return (
    <div className="ticker-wrap" style={{ padding: '0.875rem 0', borderTop: '1px solid rgba(212,175,106,0.15)', borderBottom: '1px solid rgba(212,175,106,0.15)', background: 'rgba(212,175,106,0.03)' }}>
      <div className="ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-bebas" style={{ fontSize: 18, letterSpacing: '0.2em', margin: '0 2rem', color: 'var(--plat-muted)' }}>{item} <span style={{ color: 'var(--gold)' }}>◆</span></span>
        ))}
      </div>
    </div>
  )
}

// ── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const [ref, inView] = useInView()
  const stats = [{ num: 15, suffix: '+', label: 'Years Experience' }, { num: 5000, suffix: '+', label: 'Members Strong' }, { num: 50, suffix: '+', label: 'Expert Trainers' }, { num: 98, suffix: '%', label: 'Success Rate' }]
  return (
    <section ref={ref} className="section-py">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <TiltCard key={i} strength={8} className={`text-center transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s`, padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
              <div className="font-bebas text-glow-blue" style={{ fontSize: 'clamp(56px,8vw,88px)', lineHeight: 1, color: 'var(--blue)' }}>{inView ? <Counter end={s.num} suffix={s.suffix} /> : '0'}</div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView()
  const features = [
    { icon: '⚡', title: 'Premium Equipment', desc: 'Latest Technogym & Life Fitness gear maintained daily.' },
    { icon: '🏆', title: 'Championship Results', desc: '200+ regional and national competition wins by members.' },
    { icon: '🔬', title: 'Science-Based Training', desc: 'Programs by certified exercise physiologists.' },
    { icon: '🎯', title: 'Personalized Plans', desc: 'Custom programs built around your goals and body type.' },
  ]
  const bars = [['Cardio Zone', 90], ['Strength Training', 95], ['Nutrition Support', 85], ['Recovery Programs', 88]]

  return (
    <section id="about" ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="about-grid">
          <TiltCard strength={6} className={`about-media transition-all duration-1000 ${inView ? 'animate-fadeLeft' : 'opacity-0'}`}>
            <div className="about-img-main">
              <img src={IMGS.about} alt="Inside A.Materrix Gym" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,175,106,0.12) 0%, transparent 60%)' }} />
            </div>
            <div className="about-img-sub neon-border">
              <img src={IMGS.about2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="about-badge" style={{ top: -16, left: -16 }}>
              <div className="font-bebas" style={{ fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>15+</div>
              <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-muted)', letterSpacing: '0.15em' }}>YEARS OF EXCELLENCE</div>
            </div>
          </TiltCard>

          <div className={`transition-all duration-1000 delay-200 ${inView ? 'animate-fadeRight' : 'opacity-0'}`}>
            <SectionLabel text="About Us" />
            <h2 className="font-bebas section-title" style={{ color: '#fff', lineHeight: 0.95, marginBottom: '1.25rem' }}>WHERE LEGENDS<br /><span style={{ color: 'var(--blue)' }}>ARE MADE</span></h2>
            <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 17, lineHeight: 1.7, marginBottom: '1.75rem' }}>
              A.Materrix Gym is a premium fitness destination built for those who demand more than ordinary. Since 2009, we've transformed thousands of bodies and mindsets with our elite training ecosystem.
            </p>
            <div style={{ marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {bars.map(([label, val]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="font-rajdhani" style={{ color: 'var(--plat)', fontSize: 14, letterSpacing: '0.1em' }}>{label}</span>
                    <span className="font-rajdhani" style={{ color: 'var(--gold)', fontSize: 14 }}>{val}%</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: inView ? `${val}%` : '0%' }} /></div>
                </div>
              ))}
            </div>
            <div className="feature-grid">
              {features.map((f, i) => (
                <TiltCard key={i} strength={10} className="feature-card">
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                  <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{f.desc}</div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView()
  const services = [
    { icon: 'slimming', title: 'Face & Body Slimming', desc: 'Advanced contouring therapy for face and body.' },
    { icon: 'mma', title: 'MMA', desc: 'Mixed martial arts striking, clinch & ground work.' },
    { icon: 'pilates', title: 'Pilates', desc: 'Core-focused control, posture and flexibility.' },
    { icon: 'hybrid', title: 'Hybrid Workouts', desc: 'Strength and conditioning blended into one session.' },
    { icon: 'bhangra', title: 'Bhangra', desc: 'High-energy Punjabi folk dance fitness.' },
    { icon: 'zumba', title: 'Zumba', desc: 'Dance-cardio fusion set to Latin rhythms.' },
    { icon: 'gymnastics', title: 'Gymnastics', desc: 'Strength, balance and body-control training.' },
    { icon: 'aerobics', title: 'Aerobics', desc: 'High-tempo cardio sets for stamina and burn.' },
    { icon: 'yoga', title: 'Yoga', desc: 'Breath-led movement for mobility and calm.' },
  ]

  return (
    <section id="services" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="What We Offer" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>OUR <span style={{ color: 'var(--gold)' }}>SERVICES</span></h2>
          <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 17, marginTop: 12 }}>A complete ecosystem for strength, recovery and performance</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <TiltCard key={i} strength={9} className={`service-card transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="service-glow" />
              <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-icon-wrap"><span className="service-icon-svg">{SERVICE_ICONS[s.icon]}</span></div>
              <div className="font-bebas" style={{ color: '#fff', fontSize: 26, letterSpacing: '0.01em', marginBottom: 10 }}>{s.title}</div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 'auto' }}>{s.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }}>
                <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,var(--border-gold),transparent)' }} />
                <span className="font-orbitron" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.14em' }}>LEARN MORE →</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Classes ─────────────────────────────────────────────────────────────────
function Classes() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)
  const classes = [
    { img: IMGS.class1, name: 'POWERLIFTING', tag: 'Strength', duration: '90 MIN', level: 'Advanced' },
    { img: IMGS.class2, name: 'HIIT EXTREME', tag: 'Cardio', duration: '45 MIN', level: 'All Levels' },
    { img: IMGS.class3, name: 'CROSSFIT', tag: 'Functional', duration: '60 MIN', level: 'Intermediate' },
    { img: IMGS.class4, name: 'BOXING PRO', tag: 'Combat', duration: '75 MIN', level: 'Beginner+' },
    { img: IMGS.class5, name: 'YOGA FUSION', tag: 'Recovery', duration: '60 MIN', level: 'All Levels' },
    { img: IMGS.class6, name: 'CYCLE BLAST', tag: 'Cardio', duration: '45 MIN', level: 'All Levels' },
  ]
  return (
    <section id="classes" ref={ref} className="section-py" style={{ background: 'rgba(255,255,255,0.012)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Programs" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>OUR <span style={{ color: 'var(--blue)' }}>CLASSES</span></h2>
          <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 17, marginTop: 12 }}>Elite programs for every fitness goal</p>
        </div>
        <div className="grid-3">
          {classes.map((c, i) => (
            <TiltCard key={i} strength={8} className={`hover-scale transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 300, position: 'relative', cursor: 'pointer' }}>
              <div onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ position: 'absolute', inset: 0 }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: active === i ? 'scale(1.1)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, transition: 'all 0.4s ease', background: active === i ? 'linear-gradient(to top, rgba(14,165,233,0.7) 0%, rgba(0,0,0,0.6) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="font-orbitron" style={{ fontSize: 10, padding: '3px 10px', borderRadius: 4, background: 'var(--gold)', color: '#000', letterSpacing: '0.1em' }}>{c.tag}</span>
                    <span className="font-rajdhani" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>{c.level}</span>
                  </div>
                  <div>
                    <h3 className="font-bebas" style={{ fontSize: 28, color: '#fff', marginBottom: 6 }}>{c.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="font-rajdhani" style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>⏱ {c.duration}</span>
                      <button className="btn-outline btn-sm" style={{ transition: 'all 0.3s', ...(active === i ? { background: '#fff', color: '#000', borderColor: '#fff' } : {}) }}>BOOK CLASS</button>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Facility Showcase ────────────────────────────────────────────────────────
function Showcase() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Experience" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>FEEL THE <span style={{ color: 'var(--gold)' }}>POWER</span></h2>
        </div>
        <div className="about-grid" style={{ alignItems: 'stretch' }}>
          <TiltCard strength={5} className={`neon-border transition-all duration-1000 ${inView ? 'animate-fadeLeft' : 'opacity-0'}`} style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <img src={IMGS.showcase1} alt="Facility" style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }} />
          </TiltCard>
          <TiltCard strength={5} className={`neon-border transition-all duration-1000 delay-200 ${inView ? 'animate-fadeRight' : 'opacity-0'}`} style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <img src={IMGS.showcase2} alt="Facility" style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }} />
          </TiltCard>
        </div>
        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {[['🔥', 'High Intensity', 'Programs designed to maximize calorie burn'], ['💪', 'Expert Coaching', 'World-class trainers guiding every rep'], ['🏆', 'Real Results', 'Proven transformation system']].map(([icon, title, desc], i) => (
            <div key={i} className="card-base" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Trainers ────────────────────────────────────────────────────────────────
function Trainers() {
  const [ref, inView] = useInView()
  const trainers = [
    { img: IMGS.trainer1, name: 'Alex Rodriguez', role: 'Head Strength Coach', exp: '12 Years', spec: 'Powerlifting & Hypertrophy', certs: 'NSCA-CSCS, NASM-CPT' },
    { img: IMGS.trainer2, name: 'Priya Sharma', role: 'HIIT Specialist', exp: '8 Years', spec: 'Metabolic Conditioning', certs: 'ACE-CPT, CrossFit L2' },
    { img: IMGS.trainer3, name: 'Marcus Chen', role: 'Combat Coach', exp: '15 Years', spec: 'Boxing & MMA Fitness', certs: 'USA Boxing, NASM' },
    { img: IMGS.trainer4, name: 'Zara Khan', role: 'Wellness Director', exp: '10 Years', spec: 'Yoga & Recovery', certs: 'E-RYT 500, NASM-CES' },
  ]
  return (
    <section id="trainers" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Team" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>ELITE <span style={{ color: 'var(--blue)' }}>TRAINERS</span></h2>
        </div>
        <div className="grid-4">
          {trainers.map((t, i) => (
            <TiltCard key={i} strength={10} className={`transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s`, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div className="flip-wrap" style={{ height: 300 }}>
                <div className="flip-inner">
                  <div className="flip-front">
                    <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,5,9,0.95) 0%, rgba(0,0,0,0.1) 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                      <h3 className="font-bebas" style={{ fontSize: 22, color: '#fff' }}>{t.name}</h3>
                      <p className="font-rajdhani" style={{ color: 'var(--gold)', fontSize: 13, letterSpacing: '0.1em' }}>{t.role}</p>
                    </div>
                  </div>
                  <div className="flip-back">
                    <h3 className="font-bebas" style={{ fontSize: 18, color: 'var(--gold)', marginBottom: 16 }}>{t.name}</h3>
                    {[['EXPERIENCE', t.exp], ['SPECIALIZATION', t.spec], ['CERTIFICATIONS', t.certs]].map(([label, val]) => (
                      <div key={label} style={{ marginBottom: 12 }}>
                        <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.14em', marginBottom: 3 }}>{label}</div>
                        <div className="font-rajdhani" style={{ color: '#fff', fontSize: 14 }}>{val}</div>
                      </div>
                    ))}
                    <button className="btn-primary btn-sm" style={{ marginTop: 'auto', width: '100%' }}>BOOK SESSION</button>
                  </div>
                </div>
              </div>
              <div style={{ padding: '0.875rem 1rem', background: 'var(--bg4)', borderTop: '1px solid var(--border)' }}>
                <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700 }}>{t.name}</div>
                <div className="font-rajdhani" style={{ color: 'var(--gold)', fontSize: 13 }}>{t.role}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Schedule ────────────────────────────────────────────────────────────────
function Schedule() {
  const [ref, inView] = useInView()
  const [day, setDay] = useState(0)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const schedule = {
    0: [{ time: '06:00', name: 'Morning HIIT', trainer: 'Priya Sharma', spots: 3 }, { time: '08:00', name: 'Powerlifting', trainer: 'Alex Rodriguez', spots: 5 }, { time: '11:00', name: 'Yoga Fusion', trainer: 'Zara Khan', spots: 8 }, { time: '17:00', name: 'CrossFit', trainer: 'Alex Rodriguez', spots: 2 }, { time: '19:00', name: 'Boxing Pro', trainer: 'Marcus Chen', spots: 6 }],
    1: [{ time: '07:00', name: 'Cycle Blast', trainer: 'Priya Sharma', spots: 4 }, { time: '09:00', name: 'Strength 101', trainer: 'Alex Rodriguez', spots: 7 }, { time: '12:00', name: 'Core Blast', trainer: 'Zara Khan', spots: 9 }, { time: '18:00', name: 'HIIT Extreme', trainer: 'Priya Sharma', spots: 1 }],
    2: [{ time: '06:00', name: 'CrossFit', trainer: 'Alex Rodriguez', spots: 5 }, { time: '10:00', name: 'Boxing Pro', trainer: 'Marcus Chen', spots: 3 }, { time: '13:00', name: 'Yoga Fusion', trainer: 'Zara Khan', spots: 10 }, { time: '17:00', name: 'Powerlifting', trainer: 'Alex Rodriguez', spots: 4 }, { time: '20:00', name: 'Evening HIIT', trainer: 'Priya Sharma', spots: 7 }],
    3: [{ time: '07:00', name: 'Morning Power', trainer: 'Alex Rodriguez', spots: 6 }, { time: '11:00', name: 'Cycle Blast', trainer: 'Priya Sharma', spots: 3 }, { time: '16:00', name: 'Boxing Pro', trainer: 'Marcus Chen', spots: 5 }],
    4: [{ time: '06:00', name: 'HIIT Extreme', trainer: 'Priya Sharma', spots: 2 }, { time: '09:00', name: 'Yoga Fusion', trainer: 'Zara Khan', spots: 8 }, { time: '12:00', name: 'Powerlifting', trainer: 'Alex Rodriguez', spots: 4 }, { time: '17:00', name: 'CrossFit', trainer: 'Alex Rodriguez', spots: 6 }, { time: '19:00', name: 'Cycle Blast', trainer: 'Priya Sharma', spots: 9 }],
    5: [{ time: '07:00', name: 'Saturday Slam', trainer: 'All Trainers', spots: 12 }, { time: '10:00', name: 'Yoga & Recovery', trainer: 'Zara Khan', spots: 15 }, { time: '14:00', name: 'Boxing Workshop', trainer: 'Marcus Chen', spots: 8 }],
    6: [{ time: '08:00', name: 'Sunday Reset', trainer: 'Zara Khan', spots: 20 }, { time: '11:00', name: 'Active Recovery', trainer: 'Priya Sharma', spots: 15 }],
  }
  return (
    <section ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Schedule" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>CLASS <span style={{ color: 'var(--blue)' }}>TIMETABLE</span></h2>
        </div>
        <div className="day-tabs" style={{ marginBottom: '1.75rem' }}>{days.map((d, i) => <button key={i} className={`day-tab ${day === i ? 'active' : ''}`} onClick={() => setDay(i)}>{d}</button>)}</div>
        <div className="card-base" style={{ padding: '0.5rem 1.25rem' }}>
          {(schedule[day] || []).map((item, i) => (
            <div key={i} className="schedule-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="font-orbitron" style={{ color: 'var(--gold)', fontSize: 13, minWidth: 50 }}>{item.time}</span>
                <div>
                  <div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{item.name}</div>
                  <div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{item.trainer}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span className="font-rajdhani" style={{ fontSize: 13, color: item.spots <= 3 ? '#f87171' : '#4ade80' }}>{item.spots} spots left</span>
                <button className="btn-outline btn-sm">BOOK</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ─────────────────────────────────────────────────────────────────
function Pricing() {
  const [ref, inView] = useInView()
  const [annual, setAnnual] = useState(false)
  const plans = [
    { name: 'STARTER', nameColor: 'var(--txt-muted)', price: annual ? 1999 : 2499, features: ['Full Gym Access', 'Locker Room', '2 Group Classes/mo', 'Basic App Access', 'Nutrition Guide'], missing: ['Personal Training', 'Spa Access', 'Priority Booking'] },
    { name: 'ELITE', nameColor: 'var(--blue)', featured: true, price: annual ? 4499 : 5499, features: ['Full Gym Access', 'Locker Room', 'Unlimited Classes', 'Full App Access', 'Nutrition Coaching', '4 PT Sessions/mo', 'Priority Booking'], missing: ['Spa Access'] },
    { name: 'PLATINUM', nameColor: 'var(--gold)', price: annual ? 7999 : 9999, features: ['Full Gym Access', 'Premium Locker', 'Unlimited Classes', 'Full App Access', 'Custom Meal Plans', 'Unlimited PT Sessions', 'Priority Booking', 'Spa & Recovery Access', 'Guest Passes x4/mo'] },
  ]
  return (
    <section id="pricing" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Membership" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>CHOOSE YOUR <span style={{ color: 'var(--gold)' }}>PLAN</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
            <span className="font-rajdhani" style={{ fontSize: 13, letterSpacing: '0.12em', color: !annual ? '#fff' : 'var(--txt-dim)' }}>MONTHLY</span>
            <button onClick={() => setAnnual(!annual)} aria-label="Toggle annual billing" style={{ width: 48, height: 26, borderRadius: 99, background: annual ? 'var(--gold)' : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.3s', left: annual ? 24 : 4 }} />
            </button>
            <span className="font-rajdhani" style={{ fontSize: 13, letterSpacing: '0.12em', color: annual ? '#fff' : 'var(--txt-dim)' }}>ANNUAL <span style={{ color: 'var(--gold)' }}>-20%</span></span>
          </div>
        </div>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <TiltCard key={i} strength={7} className={`plan-card ${p.featured ? 'featured' : ''} transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s`, transform: p.featured ? 'scale(1.03)' : 'none' }}>
              {p.featured && <div className="font-orbitron" style={{ fontSize: 10, textAlign: 'center', padding: '5px 0', borderRadius: 4, background: 'var(--blue)', color: '#fff', letterSpacing: '0.12em', marginBottom: 20, marginTop: -4 }}>MOST POPULAR</div>}
              <div className="font-orbitron" style={{ fontSize: 12, color: p.nameColor, marginBottom: 8, letterSpacing: '0.12em' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                <span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 18 }}>₹</span>
                <span className="font-bebas" style={{ fontSize: 'clamp(48px,6vw,64px)', color: p.nameColor, lineHeight: 1 }}>{p.price.toLocaleString()}</span>
              </div>
              <div className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 13, marginBottom: '1.75rem' }}>{annual ? '/mo billed annually' : '/month'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                {p.features.map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: p.nameColor, flexShrink: 0 }}>✓</span><span className="font-rajdhani" style={{ color: 'var(--plat)', fontSize: 14 }}>{f}</span></div>)}
                {(p.missing || []).map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.35 }}><span>✗</span><span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 14, textDecoration: 'line-through' }}>{f}</span></div>)}
              </div>
              <Magnetic strength={8}><button className={p.featured ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', padding: '0.875rem' }}>GET STARTED</button></Magnetic>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)
  const images = [IMGS.gallery1, IMGS.gallery2, IMGS.gallery3, IMGS.gallery4, IMGS.gallery5, IMGS.gallery6, IMGS.gallery7, IMGS.gallery8, IMGS.equip1, IMGS.equip2, IMGS.class1, IMGS.class4]
  return (
    <section id="gallery" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Gallery" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>INSIDE <span style={{ color: 'var(--gold)' }}>A.MATERRIX</span></h2>
        </div>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={i} className={`gallery-item transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.04}s` }} onClick={() => setActive(i)}>
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
              <div className="gallery-overlay"><span style={{ color: '#fff', fontSize: 32, fontWeight: 300 }}>+</span></div>
            </div>
          ))}
        </div>
      </div>
      {active !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setActive(null)}>
          <div className="animate-scaleIn" style={{ maxWidth: 900, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src={images[active]} alt="" style={{ width: '100%', borderRadius: 'var(--radius-lg)', maxHeight: '80vh', objectFit: 'contain' }} />
            <button onClick={() => setActive(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            {[{ side: 'left', symbol: '‹', action: () => setActive((active - 1 + images.length) % images.length) }, { side: 'right', symbol: '›', action: () => setActive((active + 1) % images.length) }].map(({ side, symbol, action }) => (
              <button key={side} onClick={action} style={{ position: 'absolute', [side]: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(212,175,106,0.3)', border: '1px solid var(--border-gold)', color: '#fff', cursor: 'pointer', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{symbol}</button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Testimonials (3D card carousel) ──────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInView()
  const [idx, setIdx] = useState(0)
  const testimonials = [
    { name: 'Rohit Verma', role: 'Software Engineer', text: "A.Materrix Gym completely transformed my physique in 6 months. The trainers are world-class and the equipment is unmatched. Best investment I've ever made.", avatar: 'RV' },
    { name: 'Ananya Patel', role: 'Marketing Manager', text: 'From 82kg to 63kg in one year. The nutrition coaching combined with HIIT classes was exactly what I needed. Priya is an absolute rockstar trainer!', avatar: 'AP' },
    { name: 'Karan Singh', role: 'Business Owner', text: 'The Platinum membership is worth every rupee. Unlimited PT sessions and the spa access make recovery seamless. I feel 10 years younger.', avatar: 'KS' },
    { name: 'Meera Shah', role: 'Doctor', text: 'As a healthcare professional, I appreciate the scientific approach at A.Materrix. Programs are evidence-based and the staff is incredibly knowledgeable.', avatar: 'MS' },
    { name: 'Arjun Mehta', role: 'Competitive Athlete', text: 'Won my first regional powerlifting competition after training at A.Materrix for just 8 months. Coach Alex is a genius. No other gym comes close.', avatar: 'AM' },
  ]
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4500); return () => clearInterval(t) }, [])

  const offsetOf = i => {
    let d = i - idx
    if (d > testimonials.length / 2) d -= testimonials.length
    if (d < -testimonials.length / 2) d += testimonials.length
    return d
  }

  return (
    <section ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Testimonials" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>SUCCESS <span style={{ color: 'var(--gold)' }}>STORIES</span></h2>
        </div>

        <div className="tcarousel">
          {testimonials.map((t, i) => {
            const off = offsetOf(i)
            const abs = Math.abs(off)
            if (abs > 2) return null
            return (
              <div key={i} className="tcard" style={{
                transform: `translateX(${off * 62}%) scale(${1 - abs * 0.14}) rotateY(${off * -14}deg) translateZ(${-abs * 80}px)`,
                opacity: abs > 1 ? 0 : 1 - abs * 0.35,
                filter: abs === 0 ? 'none' : 'blur(1.5px)',
                zIndex: 10 - abs,
                pointerEvents: abs === 0 ? 'auto' : 'none',
              }}>
                <div className="font-bebas" style={{ fontSize: 48, color: 'var(--gold)', lineHeight: 0.8, marginBottom: 16 }}>"</div>
                <p className="font-rajdhani" style={{ fontSize: 'clamp(15px,2vw,19px)', color: 'var(--plat-dim)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="font-orbitron" style={{ fontSize: 12, color: '#000', fontWeight: 700 }}>{t.avatar}</span></div>
                  <div style={{ textAlign: 'left' }}><div className="font-rajdhani" style={{ color: '#fff', fontWeight: 700 }}>{t.name}</div><div className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13 }}>{t.role}</div></div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {testimonials.map((_, i) => <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.18)', width: i === idx ? 24 : 8 }} />)}
        </div>
      </div>
    </section>
  )
}

// ── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      <img src={IMGS.cta} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,5,9,0.9)' }} />
      <div className={`container transition-all duration-1000 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ position: 'relative', textAlign: 'center' }}>
        <SectionLabel text="Limited Time" />
        <h2 className="font-bebas" style={{ lineHeight: 0.92, marginBottom: '1.25rem', fontSize: 'clamp(52px,9vw,110px)' }}>
          <span style={{ color: '#fff' }}>START YOUR</span><br /><span className="shimmer-text">TRANSFORMATION</span><br /><span style={{ color: '#fff' }}>TODAY</span>
        </h2>
        <p className="font-rajdhani" style={{ color: 'var(--plat-dim)', fontSize: 'clamp(15px,2vw,20px)', marginBottom: '2.5rem', lineHeight: 1.6 }}>Join 5,000+ members who chose excellence.<br />First month 50% off — no contracts, no excuses.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Magnetic><button className="btn-primary" style={{ padding: '1rem 2.5rem' }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>CLAIM YOUR OFFER NOW</button></Magnetic>
          <Magnetic><button className="btn-outline" style={{ padding: '1rem 2.5rem' }} onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>VIEW PLANS</button></Magnetic>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          {['No Hidden Fees', 'Cancel Anytime', 'Free Trial Class', '24/7 Access'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: 'var(--gold)', fontSize: 16 }}>✓</span><span className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 13, letterSpacing: '0.1em' }}>{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' })
  const [sent, setSent] = useState(false)
  const submit = () => { setSent(true); setTimeout(() => setSent(false), 3500) }
  const info = [
    { icon: '📍', label: 'Address', val: 'G-Block Sarabha Nagar Road, Ludhiana, Punjab, India 141001' },
    { icon: '📞', label: 'Phone', val: '+91 90568 88978, +91 90560 65011' },
    { icon: '📧', label: 'Email', val: 'info@amaterrixgym.com' },
    { icon: '🕐', label: 'Hours', val: 'Mon–Fri: 5AM–11PM | Sat–Sun: 6AM–9PM' },
  ]
  return (
    <section id="contact" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Contact" />
          <h2 className="font-bebas section-title" style={{ color: '#fff' }}>GET IN <span style={{ color: 'var(--gold)' }}>TOUCH</span></h2>
        </div>
        <div className="contact-grid">
          <div className={inView ? 'animate-fadeLeft' : 'opacity-0'}>
            <h3 className="font-bebas" style={{ fontSize: 28, color: '#fff', marginBottom: '1.75rem' }}>VISIT A.MATERRIX GYM</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
              {info.map((item, i) => (
                <div key={i} className="card-base hover-scale" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div><div className="font-orbitron" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.16em', marginBottom: 4 }}>{item.label}</div><div className="font-rajdhani" style={{ color: 'var(--plat-dim)', fontSize: 15 }}>{item.val}</div></div>
                </div>
              ))}
            </div>
            <div>
              <div className="font-orbitron" style={{ fontSize: 9, color: 'var(--txt-dim)', letterSpacing: '0.16em', marginBottom: 12 }}>FOLLOW US</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>{['Instagram', 'YouTube', 'Facebook', 'Twitter'].map(s => <button key={s} className="social-btn">{s}</button>)}</div>
            </div>
          </div>
          <div className={inView ? 'animate-fadeRight' : 'opacity-0'}>
            <div className="card-base" style={{ padding: 'clamp(1.25rem,4vw,2.25rem)', borderColor: 'rgba(212,175,106,0.18)' }}>
              <h3 className="font-bebas" style={{ fontSize: 24, color: '#fff', marginBottom: '1.5rem' }}>START YOUR FREE TRIAL</h3>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <input className="input-field" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="input-field" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <input className="input-field" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ marginBottom: '1rem' }} />
              <select className="input-field" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} style={{ marginBottom: '1rem' }}>
                <option value="">Select Your Goal</option>
                {['Weight Loss', 'Muscle Building', 'Athletic Performance', 'General Fitness', 'Rehabilitation'].map(o => <option key={o}>{o}</option>)}
              </select>
              <textarea className="input-field" rows={4} placeholder="Tell us about yourself…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'none', marginBottom: '1.25rem' }} />
              <Magnetic strength={6}>
                <button onClick={submit} style={{ width: '100%', padding: '0.9375rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.3s', background: sent ? '#22c55e' : 'var(--gold)', color: '#000', boxShadow: sent ? '0 8px 24px rgba(34,197,94,0.3)' : '0 8px 24px rgba(212,175,106,0.3)' }}>
                  {sent ? "✓ MESSAGE SENT — WE'LL CALL YOU SOON!" : 'CLAIM FREE TRIAL CLASS'}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Legal Modal ──────────────────────────────────────────────────────────────
const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: July 2026',
    sections: [
      { h: '1. Information We Collect', b: 'When you join A.Materrix Gym or use our website, we may collect your name, email, phone number, date of birth, address, payment details, and fitness goals shared during sign-up, consultations, or class bookings.' },
      { h: '2. How We Use Your Information', b: 'We use your information to manage your membership, process payments, schedule classes and personal training sessions, send updates about your account, and improve our facilities and services.' },
      { h: '3. Data Sharing', b: 'We do not sell your personal data. Information may be shared with trainers and staff strictly for delivering your training programs, and with payment processors to complete transactions securely.' },
      { h: '4. Data Security', b: 'We use reasonable administrative and technical safeguards to protect your data from unauthorized access, loss, or misuse. Payment details are handled through secure, encrypted channels.' },
      { h: '5. Cookies', b: 'Our website may use cookies to remember your preferences and improve browsing experience. You can disable cookies through your browser settings at any time.' },
      { h: '6. Your Rights', b: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us at info@amaterrixgym.com.' },
      { h: '7. Changes to This Policy', b: 'We may update this Privacy Policy periodically. Continued use of our services after changes are posted constitutes acceptance of the revised policy.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated: July 2026',
    sections: [
      { h: '1. Membership', b: 'Membership is personal and non-transferable. Members must be in suitable physical condition to participate in gym activities and classes offered at A.Materrix Gym.' },
      { h: '2. Payments & Billing', b: 'Membership fees are billed according to the plan selected (monthly or annual). Fees are non-refundable except where required by law. Annual plans are billed upfront at the discounted rate shown at checkout.' },
      { h: '3. Cancellations', b: 'Monthly memberships may be cancelled with 30 days\u2019 written notice. Annual memberships are binding for the full term selected at sign-up.' },
      { h: '4. Class & Session Bookings', b: 'Class spots are reserved on a first-come basis. Members are requested to cancel bookings at least 2 hours in advance to free up spots for others.' },
      { h: '5. Health & Safety', b: 'Members participate in all training activities at their own risk. We recommend consulting a physician before beginning any new exercise program. A.Materrix Gym is not liable for injuries resulting from improper use of equipment or failure to follow trainer guidance.' },
      { h: '6. Code of Conduct', b: 'Members are expected to treat staff, trainers, and fellow members with respect. A.Materrix Gym reserves the right to suspend or terminate membership for conduct that violates gym policies.' },
      { h: '7. Facility Use', b: 'Equipment, locker rooms, and premium amenities (spa, sauna, pool) are provided as per your membership tier and are subject to operating hours and scheduled maintenance.' },
      { h: '8. Governing Law', b: 'These terms are governed by the laws of India, with jurisdiction in Ludhiana, Punjab.' },
    ],
  },
}

function LegalModal({ type, onClose }) {
  const data = LEGAL_CONTENT[type]
  if (!data) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(4,5,9,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }} onClick={onClose}>
      <div className="animate-scaleIn card-base" style={{ maxWidth: 720, width: '100%', maxHeight: '82vh', overflowY: 'auto', padding: 'clamp(1.5rem,4vw,2.5rem)', borderColor: 'rgba(212,175,106,0.22)', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        <SectionLabel text="Legal" />
        <h2 className="font-bebas" style={{ fontSize: 'clamp(30px,4vw,42px)', color: '#fff', marginBottom: 4 }}>{data.title}</h2>
        <p className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 13, marginBottom: '1.75rem' }}>{data.updated}</p>
        {data.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '1.4rem' }}>
            <div className="font-orbitron" style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 6 }}>{s.h}</div>
            <p className="font-rajdhani" style={{ color: 'var(--txt-muted)', fontSize: 15, lineHeight: 1.7 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const [legalOpen, setLegalOpen] = useState(null)
  const cols = [
    { title: 'Quick Links', links: ['Home', 'About', 'Services', 'Classes', 'Trainers', 'Pricing', 'Gallery'] },
    { title: 'Programs', links: ['Powerlifting', 'HIIT Training', 'CrossFit', 'Boxing Pro', 'Yoga Fusion', 'Cycle Blast'] },
    { title: 'Support', links: ['FAQs', 'Membership Policy', 'Privacy Policy', 'Terms of Service', 'Contact Us'] },
  ]
  const legalKeyFor = l => l === 'Privacy Policy' ? 'privacy' : l === 'Terms of Service' ? 'terms' : null

  return (
    <footer style={{ background: 'rgba(2,3,4,0.6)', borderTop: '1px solid rgba(212,175,106,0.15)', position: 'relative', zIndex: 2 }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, border: '2px solid var(--gold)', transform: 'rotate(45deg)', borderRadius: 3 }} />
                <span className="font-orbitron" style={{ fontWeight: 900, color: 'var(--gold)', fontSize: 12, position: 'relative' }}>A</span>
              </div>
              <div className="font-bebas" style={{ fontSize: 18, color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>A.MATERRIX <span style={{ color: 'var(--blue)' }}>GYM</span></div>
            </div>
            <p className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 14, lineHeight: 1.65 }}>A premium fitness destination. Where ordinary people become extraordinary athletes.</p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="font-orbitron" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: 0, margin: 0 }}>
                {col.links.map(l => {
                  const key = legalKeyFor(l)
                  return (
                    <li key={l}>
                      <a href="#" onClick={e => { if (key) { e.preventDefault(); setLegalOpen(key) } }} className="font-rajdhani"
                        style={{ color: 'var(--txt-dim)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
                        onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = 'var(--txt-dim)'}>{l}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <p className="font-rajdhani" style={{ color: 'var(--txt-dim)', fontSize: 13 }}>© 2024 A.Materrix Gym. All rights reserved. Punjab, India.</p>
          <p className="font-orbitron" style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.16em' }}>BUILT FOR CHAMPIONS</p>
        </div>
      </div>
      {legalOpen && <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />}
    </footer>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Preloader />
      <ScrollProgress />
      <AuroraField />
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <About />
      <Services />
      <Classes />
      <Showcase />
      <Trainers />
      <Schedule />
      <Pricing />
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </>
  )
}