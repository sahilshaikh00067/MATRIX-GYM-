import { useState, useEffect, useRef } from 'react'

// ── Images ──────────────────────────────────────────────────────────────────
const IMGS = {
  hero1:    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80',
  hero2:    'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=1920&q=80',
  hero3:    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80',
  about:    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80',
  about2:   'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
  trainer1: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
  trainer2: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
  trainer3: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
  trainer4: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
  class1:   'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80',
  class2:   'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=700&q=80',
  class3:   'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80',
  class4:   'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=700&q=80',
  class5:   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80',
  class6:   'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?w=700&q=80',
  gallery1: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  gallery2: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
  gallery3: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80',
  gallery4: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
  gallery5: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
  gallery6: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  gallery7: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
  gallery8: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
  equip1:   'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?w=700&q=80',
  equip2:   'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=700&q=80',
  cta:      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=80',
  showcase1:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=900&q=80',
  showcase2:'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=900&q=80',
}

const WHATSAPP_NUMBER = '918558855435'
const PHONE_DISPLAY = '+91 85588 55435'
const EMAIL = 'ambikacelebrations94@gmail.com'
const ADDRESS = 'G-Block Sarabha Nagar Road, Ludhiana, Punjab, India 141001'
// Social links yaha daalo. Khali rahe to WhatsApp khulega.
const SOCIALS = { Instagram: '', YouTube: '', Facebook: '', Twitter: '' }

const waLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
function openWA(msg, label = 'Opening WhatsApp…') {
  window.dispatchEvent(new CustomEvent('wa-toast', { detail: label }))
  window.open(waLink(msg), '_blank', 'noopener')
}
const scrollToId = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ── LOGO: apni logo image public/logo.png me rakh do ya URL daal do ─────────
const LOGO_URL = '/logo.png'      // khali ('') rakhoge to built-in emblem dikhega
const LOGO_SHOW_TEXT = true       // agar logo image me naam already hai to false kar do

const ICON_PATHS = {
  bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
}
function Icon({ name, size = 20, stroke = 1.8, style, className }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', ...style }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }} />
}
function WaIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.6 4.6 1.8 6.6L3 29l7.1-2.3c1.9 1 4 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.2 1.4 1.4-4.1-.2-.4c-1.1-1.7-1.7-3.7-1.7-5.7 0-5.8 4.7-10.5 10.5-10.5S26.5 9.7 26.5 15.5 21.8 25.7 16 25.7zm5.8-7.9c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z" /></svg>
}
function LogoMark({ size = 44 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs><linearGradient id="lgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d4ff24" /><stop offset="1" stopColor="#2f78ff" /></linearGradient></defs>
      <path d="M24 3 42 13.5v21L24 45 6 34.5v-21z" stroke="url(#lgGrad)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M13 32V17l11 9 11-9v15" stroke="url(#lgGrad)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 21v6M45.5 21v6" stroke="#d4ff24" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
function Logo({ onClick }) {
  const [failed, setFailed] = useState(false)
  const useImg = LOGO_URL && !failed
  return (
    <div className="logo" onClick={onClick}>
      {useImg ? <img className="logo-img" src={LOGO_URL} alt="A.Materrix Gym logo" onError={() => setFailed(true)} /> : <LogoMark size={44} />}
      {(LOGO_SHOW_TEXT || !useImg) && (
        <div style={{ lineHeight: 1 }}>
          <div className="font-display logo-name">A.MATERRIX <span style={{ color: 'var(--cbl)' }}>GYM</span></div>
          <div className="logo-sub">Fitness Club</div>
        </div>
      )}
    </div>
  )
}

// ── Global styles ───────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

      :root{
        --bg:#030407; --bg2:#070a12; --bg3:#0a0e19; --bg4:#0e1322;
        --cb:#1558c9; --cbl:#4d8dff; --cb-glow:rgba(21,88,201,0.55);
        --lime:#d4ff24; --lime-glow:rgba(212,255,36,0.38);
        --plat:#eef2fb; --plat-dim:#c1c9db; --muted:#93a0ba; --dim:#4a5670;
        --border:rgba(255,255,255,0.07); --border-cb:rgba(77,141,255,0.38); --border-lime:rgba(212,255,36,0.32);
        --glass:rgba(10,14,25,0.62);
        --r-sm:8px; --r-lg:16px; --r-xl:26px;
        --ease:cubic-bezier(.16,1,.3,1);
        --wa:#25D366; --wa-dark:#128C7E;
      }
      *{box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{background:var(--bg); color:var(--plat); margin:0; overflow-x:hidden;}
      ::selection{background:var(--lime); color:#000;}
      ::-webkit-scrollbar{width:8px;} ::-webkit-scrollbar-track{background:var(--bg);} ::-webkit-scrollbar-thumb{background:linear-gradient(var(--cb),var(--lime)); border-radius:8px;}
      .font-display{font-family:'Barlow Condensed',sans-serif; font-weight:700; text-transform:uppercase;}
      .font-body{font-family:'Manrope',sans-serif;}
      .font-label{font-family:'Space Grotesk',sans-serif;}
      .container{max-width:1280px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:2;}
      .section-py{padding:6.5rem 0; position:relative;}
      @media(max-width:768px){.section-py{padding:3.75rem 0;}}
      .hero-title{font-size:clamp(48px,9vw,124px); letter-spacing:0.01em;}
      .section-title{font-size:clamp(36px,5.5vw,66px); letter-spacing:0.01em; display:inline-block;}
      .section-title::after{content:''; display:block; height:3px; width:0; margin:10px auto 0; background:linear-gradient(90deg,var(--cb),var(--lime)); border-radius:4px; animation:titleLine 1.2s var(--ease) .4s forwards;}
      @keyframes titleLine{to{width:64px;}}
      .text-center{text-align:center;}
      .hidden{display:none;} .hide-xs{display:flex;}
      @media(min-width:1024px){.lg\\:flex{display:flex !important;} .lg\\:hidden{display:none !important;}}
      @media(max-width:1023px){.lg\\:flex{display:none !important;}}
      @media(max-width:640px){.hide-xs{display:none !important;}}

      /* ── Light backdrop (no blur filters = fast) ── */
      .backdrop{position:fixed; inset:0; z-index:0; pointer-events:none;
        background:
          radial-gradient(700px 500px at 8% 4%, rgba(21,88,201,0.22), transparent 70%),
          radial-gradient(600px 460px at 95% 45%, rgba(212,255,36,0.07), transparent 70%),
          radial-gradient(700px 500px at 30% 100%, rgba(21,88,201,0.14), transparent 70%);}
      .backdrop-dots{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.5;
        background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size:34px 34px;}

      /* ── Preloader ── */
      .preloader{position:fixed; inset:0; z-index:200; background:var(--bg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.4rem; transition:opacity .7s ease, visibility .7s ease;}
      .preloader.hide{opacity:0; visibility:hidden; pointer-events:none;}
      .pl-cube{width:54px; height:54px; position:relative; transform-style:preserve-3d; animation:plSpin 1.8s linear infinite;}
      .pl-cube i{position:absolute; inset:0; border:2px solid var(--lime); background:rgba(212,255,36,0.05);}
      .pl-cube i:nth-child(1){transform:translateZ(27px);} .pl-cube i:nth-child(2){transform:rotateY(90deg) translateZ(27px);}
      .pl-cube i:nth-child(3){transform:rotateY(180deg) translateZ(27px);} .pl-cube i:nth-child(4){transform:rotateY(-90deg) translateZ(27px);}
      @keyframes plSpin{from{transform:rotateX(-20deg) rotateY(0);} to{transform:rotateX(-20deg) rotateY(360deg);}}
      .preloader-text{font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.35em; color:var(--muted); text-transform:uppercase;}

      .scroll-progress{position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,var(--cb),var(--lime)); z-index:100; box-shadow:0 0 14px var(--lime-glow);}

      /* ── Nav ── */
      .nav-glass{background:rgba(3,4,7,0.78); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-bottom:1px solid var(--border);}
      .nav-link{position:relative; font-size:13px; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); background:none; border:none; cursor:pointer; padding:6px 0; transition:color .25s ease;}
      .nav-link::after{content:''; position:absolute; left:0; bottom:0; height:2px; width:100%; background:linear-gradient(90deg,var(--cb),var(--lime)); transform:scaleX(0); transform-origin:right; transition:transform .4s var(--ease);}
      .nav-link:hover,.nav-link.active{color:var(--lime);}
      .nav-link:hover::after,.nav-link.active::after{transform:scaleX(1); transform-origin:left;}
      .mobile-menu{position:fixed; top:0; right:0; height:100vh; width:min(320px,85vw); background:rgba(5,7,12,0.96); z-index:40; transform:translateX(100%); transition:transform .45s var(--ease); border-left:1px solid var(--border-lime);}
      .mobile-menu.open{transform:translateX(0);}
      .mobile-menu.open .mm-item{animation:fadeLeft .6s var(--ease) both;}

      /* ── Buttons ── */
      .btn-primary,.btn-outline{position:relative; overflow:hidden; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; padding:0.95rem 1.9rem; border-radius:var(--r-sm); cursor:pointer;}
      .btn-primary{border:none; color:#030407; background:linear-gradient(120deg,var(--lime) 0%,#b8e60f 100%); box-shadow:0 10px 30px var(--lime-glow); transition:transform .35s var(--ease), box-shadow .35s var(--ease);}
      .btn-primary:hover{box-shadow:0 16px 42px rgba(212,255,36,0.55);}
      .btn-outline{color:#fff; background:rgba(21,88,201,0.12); border:1px solid var(--border-cb); transition:transform .35s var(--ease), border-color .3s ease, background .3s ease, color .3s ease;}
      .btn-outline:hover{border-color:var(--lime); background:rgba(212,255,36,0.1); color:var(--lime);}
      .btn-primary::after,.btn-outline::after{content:''; position:absolute; top:0; left:-130%; width:60%; height:100%; background:linear-gradient(100deg,transparent,rgba(255,255,255,0.4),transparent); transform:skewX(-20deg); transition:left .8s var(--ease); pointer-events:none;}
      .btn-primary:hover::after,.btn-outline:hover::after{left:150%;}
      .btn-primary:active,.btn-outline:active{transform:scale(.96);}
      .btn-sm{padding:0.58rem 1.15rem; font-size:0.62rem;}
      .btn-glow{animation:btnGlow 2.6s ease-in-out infinite;}
      @keyframes btnGlow{0%,100%{box-shadow:0 10px 30px var(--lime-glow);} 50%{box-shadow:0 10px 46px rgba(212,255,36,0.7), 0 0 0 6px rgba(212,255,36,0.08);}}

      /* ── Section label ── */
      .section-label{display:flex; align-items:center; justify-content:center; gap:0.75rem; margin-bottom:0.9rem;}
      .section-label-line{height:1px; width:32px; background:linear-gradient(90deg,transparent,var(--lime));}
      .section-label-line:last-child{background:linear-gradient(90deg,var(--lime),transparent);}
      .section-label-text{font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.34em; color:var(--lime); text-transform:uppercase;}

      /* ── Cards + 3D glare ── */
      .card-base{background:var(--glass); border:1px solid var(--border); border-radius:var(--r-lg); transition:transform .4s var(--ease), border-color .3s ease, box-shadow .4s var(--ease);}
      .hover-scale:hover{transform:translateY(-6px); border-color:var(--border-cb); box-shadow:0 22px 50px rgba(0,0,0,0.5), 0 0 30px rgba(21,88,201,0.18);}
      .neon-border{border:1px solid var(--border-lime); box-shadow:0 0 0 1px rgba(212,255,36,0.06), 0 24px 64px rgba(0,0,0,0.6);}
      .tilt-card{position:relative; will-change:transform;}
      .tilt-card::after{content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; z-index:6; opacity:0; transition:opacity .3s ease; background:radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.16), transparent 55%);}
      .tilt-card:hover::after{opacity:1;}

      /* ── Cursor ── */
      .cursor{position:fixed; width:10px; height:10px; border-radius:50%; background:var(--lime); pointer-events:none; z-index:9999; transition:transform .15s ease; mix-blend-mode:difference;}
      .cursor.active{transform:scale(2.4);}
      .cursor-follower{position:fixed; width:38px; height:38px; border-radius:50%; border:1px solid var(--border-cb); pointer-events:none; z-index:9998; transition:left .18s var(--ease), top .18s var(--ease);}
      @media(max-width:1023px){.cursor,.cursor-follower{display:none;}}

      /* ── Ticker ── */
      .ticker-wrap{overflow:hidden; white-space:nowrap;}
      .ticker{display:inline-flex; animation:scrollTicker 28s linear infinite;}
      .ticker-wrap:hover .ticker{animation-play-state:paused;}
      @keyframes scrollTicker{from{transform:translateX(0);} to{transform:translateX(-50%);}}

      /* ── Progress ── */
      .progress-track{height:6px; border-radius:99px; background:rgba(255,255,255,0.06); overflow:hidden;}
      .progress-fill{height:100%; border-radius:99px; background:linear-gradient(90deg,var(--cb),var(--lime)); transition:width 1.6s var(--ease); position:relative; overflow:hidden;}
      .progress-fill::after{content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent); animation:progressShine 2.2s ease-in-out infinite;}
      @keyframes progressShine{0%{transform:translateX(-100%);} 100%{transform:translateX(200%);}}

      /* ── 3D HERO SCENE ── */
      .grid-floor{position:absolute; left:-50%; right:-50%; bottom:0; height:46%; z-index:3; pointer-events:none; transform:perspective(520px) rotateX(64deg); transform-origin:bottom;
        background-image:linear-gradient(rgba(21,88,201,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(21,88,201,0.5) 1px,transparent 1px); background-size:64px 64px; animation:gridMove 3.2s linear infinite;
        -webkit-mask-image:linear-gradient(to top,#000 10%,transparent 90%); mask-image:linear-gradient(to top,#000 10%,transparent 90%);}
      @keyframes gridMove{to{background-position:0 64px;}}
      .scene-wrap{position:absolute; right:7%; top:50%; width:380px; height:380px; margin-top:-190px; z-index:9; perspective:1100px; pointer-events:none;}
      .scene{position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .25s ease-out;}
      .cube{position:absolute; left:110px; top:110px; width:160px; height:160px; transform-style:preserve-3d; animation:cubeSpin 20s linear infinite;}
      .cube .face{position:absolute; inset:0; display:flex; align-items:center; justify-content:center; border:1px solid var(--lime); background:linear-gradient(135deg,rgba(212,255,36,0.1),rgba(21,88,201,0.14)); font-family:'Space Grotesk',sans-serif; font-size:12px; letter-spacing:0.22em; color:var(--lime); box-shadow:inset 0 0 28px rgba(212,255,36,0.12);}
      .cube .f1{transform:translateZ(80px);} .cube .f2{transform:rotateY(90deg) translateZ(80px);} .cube .f3{transform:rotateY(180deg) translateZ(80px);}
      .cube .f4{transform:rotateY(-90deg) translateZ(80px);} .cube .f5{transform:rotateX(90deg) translateZ(80px);} .cube .f6{transform:rotateX(-90deg) translateZ(80px);}
      @keyframes cubeSpin{from{transform:rotateX(-25deg) rotateY(0deg);} to{transform:rotateX(-25deg) rotateY(360deg);}}
      .ring{position:absolute; inset:0; border-radius:50%; border:1px solid rgba(77,141,255,0.55); box-shadow:0 0 22px rgba(21,88,201,0.35), inset 0 0 22px rgba(21,88,201,0.2);}
      .ring.r1{animation:ringA 12s linear infinite;} .ring.r2{inset:36px; border-color:rgba(212,255,36,0.5); animation:ringB 16s linear infinite;} .ring.r3{inset:-30px; border-style:dashed; animation:ringC 24s linear infinite;}
      @keyframes ringA{from{transform:rotateX(72deg) rotateZ(0);} to{transform:rotateX(72deg) rotateZ(360deg);}}
      @keyframes ringB{from{transform:rotateY(72deg) rotateZ(0);} to{transform:rotateY(72deg) rotateZ(-360deg);}}
      @keyframes ringC{from{transform:rotateX(55deg) rotateY(35deg) rotateZ(0);} to{transform:rotateX(55deg) rotateY(35deg) rotateZ(360deg);}}
      .orb{position:absolute; width:14px; height:14px; border-radius:50%; background:var(--lime); box-shadow:0 0 22px var(--lime), 0 0 50px var(--lime-glow); left:50%; top:50%; margin:-7px; animation:orbit 6s linear infinite;}
      .orb.o2{background:var(--cbl); box-shadow:0 0 22px var(--cbl); animation-duration:9s; animation-direction:reverse;}
      @keyframes orbit{from{transform:rotateZ(0) translateX(190px) rotateZ(0) translateZ(30px);} to{transform:rotateZ(360deg) translateX(190px) rotateZ(-360deg) translateZ(30px);}}
      @media(max-width:1100px){.scene-wrap{display:none;}}
      .hero-chip{display:inline-flex; align-items:center; gap:8px; padding:0.5rem 1rem; border-radius:99px; background:rgba(21,88,201,0.12); border:1px solid var(--border-cb); font-family:'Manrope',sans-serif; font-weight:600; font-size:13px; letter-spacing:0.08em; color:var(--plat-dim); animation:fadeUp .8s var(--ease) both;}
      .hero-chip b{color:var(--lime); font-family:'Space Grotesk',sans-serif; font-size:12px;}
      .scroll-hint{animation:bounceY 1.8s ease-in-out infinite;}
      @keyframes bounceY{0%,100%{transform:translateY(0);} 50%{transform:translateY(10px);}}

      /* ── About ── */
      .about-badge{position:absolute; background:var(--glass); border:1px solid var(--border-lime); border-radius:var(--r-lg); padding:1.1rem 1.4rem; box-shadow:0 18px 46px rgba(0,0,0,0.6), 0 0 30px var(--lime-glow); z-index:3; animation:badgeFloat 4.2s ease-in-out infinite;}
      @keyframes badgeFloat{0%,100%{transform:translateY(0) rotate(-2deg);} 50%{transform:translateY(-10px) rotate(1deg);}}
      .about-grid{display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;}
      @media(max-width:900px){.about-grid{grid-template-columns:1fr; gap:5rem 0;}}
      .about-media{position:relative;}
      .about-media::before{content:''; position:absolute; inset:-18px; border:1px solid var(--border-lime); border-radius:calc(var(--r-lg) + 18px); opacity:0.5; animation:ringSpin 30s linear infinite;}
      .about-media::after{content:''; position:absolute; inset:-34px; border:1px dashed rgba(77,141,255,0.3); border-radius:calc(var(--r-lg) + 34px); animation:ringSpin 46s linear infinite reverse;}
      @keyframes ringSpin{from{transform:rotate(0);} to{transform:rotate(360deg);}}
      .about-img-main{position:relative; border-radius:var(--r-lg); overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,0.6);}
      .about-img-sub{position:absolute; bottom:-28px; right:-20px; width:170px; height:170px; border-radius:var(--r-lg); overflow:hidden; box-shadow:0 24px 54px rgba(0,0,0,0.65); animation:subFloat 5s ease-in-out infinite; z-index:4;}
      @keyframes subFloat{0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-8px) rotate(-3deg);}}
      .feature-grid{display:grid; grid-template-columns:1fr 1fr; gap:0.9rem;}
      .feature-card{background:var(--glass); border:1px solid var(--border); border-radius:var(--r-lg); padding:1.2rem; overflow:hidden; transition:border-color .35s ease, box-shadow .35s ease;}
      .feature-card:hover{border-color:var(--border-cb); box-shadow:0 20px 46px rgba(0,0,0,0.5);}
      .feature-icon-wrap{width:44px; height:44px; border-radius:12px; background:radial-gradient(circle at 30% 20%,rgba(21,88,201,0.3),rgba(255,255,255,0.02)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem; font-size:20px; transition:transform .5s var(--ease);}
      .feature-card:hover .feature-icon-wrap{transform:rotateY(360deg) scale(1.1); border-color:var(--lime);}

      /* ── Grids ── */
      .grid-2{display:grid; grid-template-columns:1fr 1fr; gap:1rem;}
      .grid-3{display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;}
      .grid-4{display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;}
      @media(max-width:900px){.grid-3{grid-template-columns:1fr 1fr;} .grid-4{grid-template-columns:1fr 1fr;}}
      @media(max-width:560px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr;}}
      .stats-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;}
      @media(max-width:700px){.stats-grid{grid-template-columns:1fr 1fr;}}
      .stat-card{padding:1.6rem 1rem; border-radius:var(--r-lg); background:var(--glass); border:1px solid var(--border); text-align:center;}
      .persp{perspective:1600px;}

      /* ── Services ── */
      .services-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem; perspective:1800px;}
      @media(max-width:1100px){.services-grid{grid-template-columns:1fr 1fr;}}
      @media(max-width:640px){.services-grid{grid-template-columns:1fr;}}
      .service-card{background:linear-gradient(160deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01)),linear-gradient(160deg,var(--bg4),var(--bg3)); border:1px solid var(--border); border-radius:var(--r-xl); padding:2.6rem 2.2rem; overflow:hidden; cursor:pointer; min-height:280px; display:flex; flex-direction:column;}
      .service-card:hover{border-color:var(--border-lime); box-shadow:0 32px 70px rgba(0,0,0,0.55), 0 0 40px rgba(21,88,201,0.18);}
      .service-glow{position:absolute; inset:0; background:radial-gradient(circle at 25% 0%,rgba(212,255,36,0.16),transparent 62%); opacity:0; transition:opacity .4s ease; pointer-events:none;}
      .service-card:hover .service-glow{opacity:1;}
      .service-num{position:absolute; top:1.6rem; right:1.9rem; font-family:'Space Grotesk',sans-serif; font-size:13px; color:var(--dim); letter-spacing:0.12em;}
      .service-icon-wrap{width:72px; height:72px; border-radius:20px; background:radial-gradient(circle at 30% 20%,rgba(21,88,201,0.35),rgba(255,255,255,0.02)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; margin-bottom:1.6rem; transition:all .5s var(--ease); position:relative; animation:iconFloat 3.6s ease-in-out infinite;}
      .service-card:nth-child(2n) .service-icon-wrap{animation-delay:.4s;} .service-card:nth-child(3n) .service-icon-wrap{animation-delay:.8s;}
      @keyframes iconFloat{0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-7px) rotate(3deg);}}
      .service-card:hover .service-icon-wrap{border-color:var(--lime); box-shadow:0 0 36px var(--lime-glow);}
      .service-icon-svg{width:34px; height:34px; color:var(--lime); transition:transform .7s var(--ease); display:inline-block;}
      .service-card:hover .service-icon-svg{transform:rotateY(360deg) scale(1.12);}
      .learn-more{transition:letter-spacing .35s var(--ease), color .3s ease;}
      .service-card:hover .learn-more{letter-spacing:0.22em; color:#fff;}

      /* ── Flip ── */
      .flip-wrap{perspective:1400px; position:relative; cursor:pointer;}
      .flip-inner{position:relative; width:100%; height:100%; transition:transform .8s var(--ease); transform-style:preserve-3d;}
      .flip-wrap:hover .flip-inner,.flip-wrap.flipped .flip-inner{transform:rotateY(180deg);}
      .flip-front,.flip-back{position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden;}
      .flip-back{transform:rotateY(180deg); background:var(--bg4); padding:1.4rem; display:flex; flex-direction:column;}

      /* ── Schedule ── */
      .day-tabs{display:flex; gap:0.5rem; overflow-x:auto; padding-bottom:4px;}
      .day-tab{font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.12em; padding:0.62rem 1.15rem; border-radius:var(--r-sm); border:1px solid var(--border); background:var(--bg4); color:var(--muted); cursor:pointer; transition:all .3s var(--ease); white-space:nowrap;}
      .day-tab:hover{border-color:var(--border-cb); color:#fff; transform:translateY(-2px);}
      .day-tab.active{background:var(--cb); border-color:var(--cbl); color:#fff; box-shadow:0 8px 24px var(--cb-glow);}
      .schedule-item{border-bottom:1px solid var(--border); transition:background .3s ease, padding-left .3s var(--ease); animation:fadeUp .6s var(--ease) both;}
      .schedule-item:hover{background:rgba(21,88,201,0.08); padding-left:1rem !important;}

      /* ── Pricing ── */
      .pricing-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem; align-items:start; perspective:1600px;}
      @media(max-width:900px){.pricing-grid{grid-template-columns:1fr; max-width:420px; margin:0 auto;}}
      .plan-card{background:var(--glass); border:1px solid var(--border); border-radius:var(--r-xl); padding:2.1rem;}
      .plan-card.featured{border:1px solid var(--border-lime); box-shadow:0 28px 70px rgba(21,88,201,0.25);}

      /* ── Gallery ── */
      .gallery-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:0.9rem;}
      @media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,1fr);}}
      .gallery-item{position:relative; border-radius:var(--r-lg); overflow:hidden; aspect-ratio:1; cursor:pointer; border:1px solid var(--border); transition:border-color .3s ease, box-shadow .4s var(--ease);}
      .gallery-item:hover{border-color:var(--lime); box-shadow:0 18px 44px rgba(0,0,0,0.55), 0 0 24px var(--lime-glow);}
      .gallery-item img{width:100%; height:100%; object-fit:cover; transition:transform .6s var(--ease);}
      .gallery-item:hover img{transform:scale(1.15) rotate(1deg);}
      .gallery-overlay{position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(3,4,7,0.6); opacity:0; transition:opacity .35s ease;}
      .gallery-item:hover .gallery-overlay{opacity:1;}

      /* ── Testimonials ── */
      .tcarousel{position:relative; height:340px; display:flex; align-items:center; justify-content:center; perspective:1600px;}
      .tcard{position:absolute; width:min(640px,88vw); background:var(--glass); border:1px solid var(--border); border-radius:var(--r-xl); padding:clamp(1.5rem,4vw,2.75rem); text-align:center; transition:transform .6s var(--ease), opacity .6s var(--ease), filter .6s var(--ease);}

      /* ── Contact ── */
      .contact-grid{display:grid; grid-template-columns:1fr 1.1fr; gap:3rem;}
      @media(max-width:900px){.contact-grid{grid-template-columns:1fr;}}
      .input-field{width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:var(--r-sm); padding:0.85rem 1rem; color:#fff; font-family:'Manrope',sans-serif; font-size:15px; outline:none; transition:border-color .25s ease, background .25s ease, box-shadow .25s ease;}
      .input-field:focus{border-color:var(--cbl); background:rgba(21,88,201,0.08); box-shadow:0 0 0 4px rgba(21,88,201,0.18);}
      .input-field option{background:#0a0e19; color:#fff;}
      .social-btn{font-family:'Space Grotesk',sans-serif; font-size:10px; letter-spacing:0.1em; padding:0.55rem 1rem; border-radius:var(--r-sm); border:1px solid var(--border); background:var(--bg4); color:var(--muted); cursor:pointer; transition:all .3s var(--ease);}
      .social-btn:hover{border-color:var(--lime); color:var(--lime); transform:translateY(-3px); box-shadow:0 10px 24px var(--lime-glow);}
      .info-card{text-decoration:none; color:inherit; cursor:pointer;}

      .shimmer-text{background:linear-gradient(90deg,var(--lime) 0%,var(--cbl) 50%,var(--lime) 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:shimmer 4s linear infinite;}
      @keyframes shimmer{to{background-position:-200% center;}}

      /* ── WhatsApp float, toast, top ── */
      .wa-float{position:fixed; right:1.4rem; bottom:1.4rem; z-index:80; display:flex; align-items:center; gap:0.7rem;}
      .wa-btn{position:relative; width:60px; height:60px; border-radius:50%; background:linear-gradient(145deg,var(--wa),var(--wa-dark)); display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; box-shadow:0 14px 34px rgba(18,140,126,0.55); transition:transform .35s var(--ease); animation:waFloat 3s ease-in-out infinite;}
      .wa-btn:hover{transform:scale(1.1) translateY(-4px);}
      @keyframes waFloat{0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);}}
      .wa-btn::before{content:''; position:absolute; inset:-6px; border-radius:50%; border:1.5px solid var(--wa); opacity:0.55; animation:waPulse 2.2s ease-out infinite;}
      @keyframes waPulse{0%{transform:scale(0.85); opacity:.55;} 100%{transform:scale(1.5); opacity:0;}}
      .wa-tooltip{font-family:'Manrope',sans-serif; font-weight:700; font-size:13px; color:#fff; background:rgba(10,12,17,0.92); border:1px solid rgba(37,211,102,0.35); padding:0.55rem 0.9rem; border-radius:10px; white-space:nowrap; opacity:0; transform:translateX(8px); transition:all .3s var(--ease); pointer-events:none;}
      .wa-float:hover .wa-tooltip{opacity:1; transform:translateX(0);}
      @media(max-width:640px){.wa-float{right:1rem; bottom:1rem;} .wa-btn{width:52px; height:52px;} .wa-tooltip{display:none;}}
      .wa-toast{position:fixed; left:50%; bottom:1.8rem; z-index:150; transform:translate(-50%,30px); opacity:0; pointer-events:none; display:flex; align-items:center; gap:10px; padding:0.8rem 1.4rem; border-radius:99px; background:rgba(8,10,16,0.95); border:1px solid rgba(37,211,102,0.45); box-shadow:0 16px 40px rgba(0,0,0,0.6); font-family:'Manrope',sans-serif; font-weight:700; letter-spacing:0.06em; font-size:14px; color:#fff; transition:all .5s var(--ease);}
      .wa-toast.show{transform:translate(-50%,0); opacity:1;}
      .wa-toast i{width:9px; height:9px; border-radius:50%; background:var(--wa); box-shadow:0 0 12px var(--wa); animation:waPulse 1.2s ease-out infinite;}
      .to-top{position:fixed; left:1.4rem; bottom:1.4rem; z-index:80; width:46px; height:46px; border-radius:50%; background:var(--glass); border:1px solid var(--border-lime); color:var(--lime); cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; opacity:0; transform:translateY(20px) scale(.8); pointer-events:none; transition:all .45s var(--ease);}
      .to-top.show{opacity:1; transform:none; pointer-events:auto;}
      .to-top:hover{background:var(--lime); color:#000; transform:translateY(-4px);}


      /* ── Logo, icons, typography polish ── */
      .logo{display:flex; align-items:center; gap:.7rem; cursor:pointer;}
      .logo-mark{display:block; filter:drop-shadow(0 0 14px rgba(212,255,36,.35)); transition:transform .7s var(--ease);}
      .logo:hover .logo-mark{transform:rotateY(180deg) scale(1.06);}
      .logo-img{height:46px; width:auto; object-fit:contain; display:block; transition:transform .5s var(--ease);}
      .logo:hover .logo-img{transform:scale(1.05);}
      .logo-name{font-size:24px; color:#fff; letter-spacing:.06em; font-weight:800; white-space:nowrap;}
      .logo-sub{font-family:'Space Grotesk',sans-serif; font-size:8.5px; letter-spacing:.46em; color:var(--lime); margin-top:5px; text-transform:uppercase; font-weight:600;}
      .pl-logo{animation:logoPulse 1.6s ease-in-out infinite;}
      @keyframes logoPulse{0%,100%{transform:scale(1); filter:drop-shadow(0 0 10px rgba(212,255,36,.25));} 50%{transform:scale(1.1); filter:drop-shadow(0 0 28px rgba(212,255,36,.6));}}
      .icon-badge{width:58px; height:58px; margin:0 auto 14px; border-radius:16px; display:flex; align-items:center; justify-content:center; color:var(--lime); background:radial-gradient(circle at 30% 20%,rgba(21,88,201,.38),rgba(255,255,255,.02)); border:1px solid var(--border); transition:all .6s var(--ease);}
      .card-base:hover .icon-badge{border-color:var(--lime); box-shadow:0 0 28px var(--lime-glow); transform:translateY(-4px) rotateY(360deg);}
      .info-icon{width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--lime); background:rgba(21,88,201,.18); border:1px solid var(--border-cb); transition:all .4s var(--ease);}
      .info-icon.wa{color:var(--wa); background:rgba(37,211,102,.1); border-color:rgba(37,211,102,.3);}
      .card-base:hover .info-icon{transform:scale(1.1) rotate(-6deg); border-color:var(--lime);}
      .stat-icon{width:46px; height:46px; margin:0 auto 12px; border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--cbl); background:rgba(21,88,201,.16); border:1px solid var(--border-cb); transform:translateZ(20px); transition:all .4s var(--ease);}
      .stat-card:hover .stat-icon{color:var(--lime); border-color:var(--lime);}
      .social-btn{display:inline-flex; align-items:center; gap:8px;}
      .nav-link{font-size:12px; font-weight:700;}
      .hero-title{font-weight:800; line-height:.92; letter-spacing:.005em;}
      .section-title{font-weight:800; letter-spacing:.01em;}
      .font-body{font-weight:700;}
      /* ── Animations ── */
      .transition-all{transition-property:all;} .duration-500{transition-duration:500ms;} .duration-700{transition-duration:700ms;} .duration-1000{transition-duration:1000ms;} .delay-200{transition-delay:200ms;}
      .opacity-0{opacity:0;}
      @keyframes fadeUp{from{opacity:0; transform:perspective(900px) translateY(34px) rotateX(-12deg);} to{opacity:1; transform:perspective(900px) translateY(0) rotateX(0);}}
      @keyframes fadeLeft{from{opacity:0; transform:perspective(900px) translateX(-40px) rotateY(10deg);} to{opacity:1; transform:perspective(900px) translateX(0) rotateY(0);}}
      @keyframes fadeRight{from{opacity:0; transform:perspective(900px) translateX(40px) rotateY(-10deg);} to{opacity:1; transform:perspective(900px) translateX(0) rotateY(0);}}
      @keyframes scaleIn{from{opacity:0; transform:perspective(900px) scale(0.9) rotateX(10deg);} to{opacity:1; transform:perspective(900px) scale(1) rotateX(0);}}
      .animate-fadeUp{animation:fadeUp .85s var(--ease) forwards;}
      .animate-fadeLeft{animation:fadeLeft .85s var(--ease) forwards;}
      .animate-fadeRight{animation:fadeRight .85s var(--ease) forwards;}
      .animate-scaleIn{animation:scaleIn .75s var(--ease) forwards;}
      @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important;}}
    `}</style>
  )
}

export function PremiumStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500&family=Manrope:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500&display=swap');
 
      @property --ang{syntax:'<angle>'; inherits:false; initial-value:0deg;}
      @keyframes spinAng{to{--ang:360deg;}}
      @keyframes heroIn{from{opacity:0; filter:blur(14px); transform:perspective(900px) translateY(40px) rotateX(-18deg);} to{opacity:1; filter:blur(0); transform:perspective(900px) translateY(0) rotateX(0);}}
      @keyframes auroraMove{0%{transform:translate3d(-6%,-4%,0) rotate(0deg) scale(1);} 50%{transform:translate3d(6%,5%,0) rotate(180deg) scale(1.15);} 100%{transform:translate3d(-6%,-4%,0) rotate(360deg) scale(1);}}
      @keyframes sceneBob{0%,100%{margin-top:-190px;} 50%{margin-top:-205px;}}
 
      /* ── Typography: lighter, thinner, premium ── */
      body{font-family:'Manrope',sans-serif; font-weight:300; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:optimizeLegibility;}
      html{overflow-x:clip;}
      .font-display{font-family:'Outfit',sans-serif !important; font-weight:200 !important; letter-spacing:0.09em !important;}
      .font-body{font-family:'Manrope',sans-serif !important; font-weight:300 !important; letter-spacing:0.03em;}
      .font-label{font-family:'Space Grotesk',sans-serif !important; font-weight:400 !important;}
      .hero-title{font-weight:200 !important; line-height:1 !important; letter-spacing:0.08em !important; font-size:clamp(38px,8vw,112px) !important; text-shadow:0 0 60px rgba(77,141,255,0.25); animation:heroIn 1.2s var(--ease) both;}
      .hero-title.shimmer-text{text-shadow:none; animation:heroIn 1.2s var(--ease) .15s both, shimmer 4s linear infinite;}
      .section-title{font-weight:200 !important; letter-spacing:0.09em !important; font-size:clamp(30px,5vw,60px) !important; line-height:1.05;}
      .section-title span{font-weight:300;}
      .logo-name{font-weight:300 !important; letter-spacing:0.22em !important; font-size:20px !important;}
      .logo-sub{font-weight:400 !important; letter-spacing:0.5em !important;}
      .nav-link{font-weight:400 !important; letter-spacing:0.2em !important; font-size:11px !important;}
      .btn-primary,.btn-outline{font-weight:500 !important; letter-spacing:0.2em !important; border-radius:999px !important;}
      .btn-primary{box-shadow:0 10px 34px var(--lime-glow), inset 0 1px 0 rgba(255,255,255,0.45);}
      .font-body[style*="font-weight: 700"], [style*="fontWeight: 700"]{font-weight:500 !important;}
      p.font-body, .font-body{color:inherit;}
      .section-label-text{font-weight:400; letter-spacing:0.4em;}
 
      /* ── Premium depth: aurora, glass, rotating borders ── */
      .backdrop::before{content:''; position:absolute; width:90vmax; height:90vmax; left:-25vmax; top:-30vmax; border-radius:50%;
        background:conic-gradient(from 0deg, rgba(21,88,201,0.22), rgba(212,255,36,0.06), rgba(77,141,255,0.18), rgba(21,88,201,0.22)); opacity:.55; animation:auroraMove 38s linear infinite; will-change:transform;}
      .card-base,.service-card,.plan-card,.feature-card,.stat-card{-webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); box-shadow:0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 60px rgba(0,0,0,0.38); border-radius:22px;}
      .service-card::before,.stat-card::before{content:''; position:absolute; left:12%; right:12%; top:0; height:1px; background:linear-gradient(90deg,transparent,rgba(212,255,36,0.7),transparent); opacity:.6;}
      .stat-card{position:relative;}
      .neon-border,.plan-card.featured{position:relative; border:1px solid transparent;}
      .neon-border::before,.plan-card.featured::before{content:''; position:absolute; inset:0; border-radius:inherit; padding:1px; pointer-events:none; z-index:5;
        background:conic-gradient(from var(--ang), transparent 0 55%, var(--lime) 75%, var(--cbl) 90%, transparent 100%);
        -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask:linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); animation:spinAng 7s linear infinite;}
      .service-icon-wrap,.icon-badge{box-shadow:0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12); transform-style:preserve-3d;}
      .gallery-item,.hover-scale{transform-style:preserve-3d;}
      .gallery-item:hover{transform:perspective(900px) translateZ(26px) rotateX(2deg); z-index:3;}
      .cube .face{font-weight:300; letter-spacing:0.4em; border-color:rgba(212,255,36,0.55); backdrop-filter:blur(3px);}
      .scene-wrap{animation:sceneBob 7s ease-in-out infinite;}
      .grid-floor{opacity:.75;}
      .progress-track{height:3px;}
      .particle-field{position:fixed; inset:0; z-index:1; pointer-events:none;}
 
      /* ── Touch devices: no hover-tilt, keep it smooth ── */
      @media (hover:none){
        .tilt-card{transform:none !important;}
        .cursor,.cursor-follower{display:none !important;}
        .gallery-item:hover{transform:none;}
      }
 
      /* ── Tablet ── */
      @media (min-width:641px) and (max-width:1023px){
        .container{padding:0 2rem;}
        .gallery-grid{grid-template-columns:repeat(3,1fr);}
        .service-card{min-height:250px; padding:2rem 1.6rem;}
        .tcarousel{height:360px;}
        .about-grid{gap:4.5rem 0;}
        .hero-title{font-size:clamp(46px,9vw,88px) !important;}
      }
 
      /* ── Phones & small tablets ── */
      @media (max-width:900px){
        .about-media::before,.about-media::after{display:none;}
        .about-badge{top:8px !important; left:8px !important; padding:.7rem 1rem;}
        .about-img-sub{width:120px; height:120px; right:-6px; bottom:-18px;}
        .about-img-main img{height:340px !important;}
        .tcarousel{overflow:hidden; height:400px;}
        .tcard{width:86vw;}
        .contact-grid{gap:2rem;}
        .grid-floor{height:34%;}
      }
      @media (max-width:640px){
        .container{padding:0 1.1rem;}
        .section-py{padding:3.25rem 0;}
        .logo-name{font-size:15px !important; letter-spacing:.14em !important;}
        .logo-img{height:36px;}
        .logo-sub{font-size:7px; letter-spacing:.36em;}
        .hero-title{font-size:clamp(34px,11.5vw,58px) !important; letter-spacing:.02em !important;}
        .btn-primary,.btn-outline{padding:.85rem 1.4rem; font-size:.66rem; letter-spacing:.14em !important;}
        .feature-grid{grid-template-columns:1fr;}
        .stats-grid{gap:.8rem;}
        .stat-card{padding:1.2rem .6rem;}
        .service-card{min-height:0; padding:1.8rem 1.4rem;}
        .gallery-grid{gap:.5rem;}
        .tcarousel{height:430px;}
        .schedule-item{padding:.9rem 0 !important;}
        .day-tab{padding:.55rem .9rem;}
        .plan-card{padding:1.6rem;}
        .to-top{left:.9rem; bottom:.9rem; width:40px; height:40px;}
        .input-field{font-size:16px;}
        .mobile-menu{width:min(300px,88vw);}
        .about-img-main img{height:280px !important;}
        .card-base,.service-card,.plan-card,.feature-card,.stat-card{-webkit-backdrop-filter:none; backdrop-filter:none;}
      }
      @media (max-width:380px){ .hero-title{font-size:32px !important;} .btn-primary,.btn-outline{width:100%;} }
      @media (max-height:520px) and (orientation:landscape){ #home{min-height:640px;} }
      @media (min-width:1600px){ .container{max-width:1440px;} }
      @media (prefers-reduced-motion:reduce){ .backdrop::before,.scene-wrap,.neon-border::before{animation:none !important;} }
    `}</style>
  )
}
 
// ── Floating 3D-depth particles (parallax with mouse) ───────────────────────
export function ParticleField() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = c.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const N = window.innerWidth < 768 ? 26 : 64
    let w = 0, h = 0, mx = 0, my = 0, raf
    const P = []
    const resize = () => {
      w = c.width = window.innerWidth * dpr; h = c.height = window.innerHeight * dpr
      c.style.width = window.innerWidth + 'px'; c.style.height = window.innerHeight + 'px'
    }
    resize()
    for (let i = 0; i < N; i++) P.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1, v: Math.random() * 0.25 + 0.08, c: Math.random() > 0.5 ? '212,255,36' : '77,141,255' })
    const mv = e => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5 }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of P) {
        p.y -= p.v * p.z * dpr
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        ctx.beginPath()
        ctx.arc(p.x + mx * 60 * p.z * dpr, p.y + my * 40 * p.z * dpr, p.z * 2.2 * dpr, 0, 6.283)
        ctx.fillStyle = `rgba(${p.c},${0.12 + p.z * 0.5})`
        ctx.shadowColor = `rgba(${p.c},0.8)`; ctx.shadowBlur = 8 * p.z * dpr
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', mv, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="particle-field" aria-hidden="true" />
}

// ── Small utilities ─────────────────────────────────────────────────────────
function Preloader() {
  const [hide, setHide] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHide(true), 900); return () => clearTimeout(t) }, [])
  return (
    <div className={`preloader ${hide ? 'hide' : ''}`}>
      <div className="pl-logo"><LogoMark size={76} /></div>
      <div className="preloader-text font-label">A.MATERRIX GYM</div>
    </div>
  )
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => { const h = document.documentElement; setPct(h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

function Toast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  useEffect(() => {
    let t
    const fn = e => { setMsg(e.detail); setShow(true); clearTimeout(t); t = setTimeout(() => setShow(false), 2600) }
    window.addEventListener('wa-toast', fn)
    return () => { window.removeEventListener('wa-toast', fn); clearTimeout(t) }
  }, [])
  return <div className={`wa-toast ${show ? 'show' : ''}`}><i />{msg}</div>
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <button className={`to-top ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Icon name="arrow-up" size={18} /></button>
}

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

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(() => {
    const move = e => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 5 + 'px'; dotRef.current.style.top = e.clientY - 5 + 'px' }
      if (ringRef.current) { ringRef.current.style.left = e.clientX - 19 + 'px'; ringRef.current.style.top = e.clientY - 19 + 'px' }
      dotRef.current?.classList.toggle('active', !!e.target.closest?.('a,button,.service-card,.hover-scale'))
    }
    document.addEventListener('mousemove', move, { passive: true })
    return () => document.removeEventListener('mousemove', move)
  }, [])
  return (<><div className="cursor" ref={dotRef} /><div className="cursor-follower" ref={ringRef} /></>)
}

// 3D tilt + glare
function TiltCard({ children, className = '', style = {}, strength = 12, onClick }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * strength}deg) rotateX(${-(y - 0.5) * strength}deg) translateZ(10px)`
    el.style.setProperty('--gx', `${x * 100}%`); el.style.setProperty('--gy', `${y * 100}%`)
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)' }
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={{ transition: 'transform 0.25s ease', transformStyle: 'preserve-3d', ...style }} onMouseMove={onMove} onMouseLeave={reset} onClick={onClick}>
      {children}
    </div>
  )
}

function Magnetic({ children, strength = 18 }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) / r.width * strength}px, ${(e.clientY - r.top - r.height / 2) / r.height * strength}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }
  return <span ref={ref} style={{ display: 'inline-block', transition: 'transform .3s var(--ease)' }} onMouseMove={onMove} onMouseLeave={reset}>{children}</span>
}

const SERVICE_ICONS = {
  slimming: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M24 6c9 3 15 11 14 20-9 2-17-3-20-11-3 7-1 15 5 19" /><path d="M18 34c2-6 4-11 9-15" strokeDasharray="1 5" /></svg>),
  mma: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22c0-6 4-10 10-10s10 4 10 9v9c0 6-5 10-11 10h-2c-5 0-9-3-10-8l-3-9c-1-3 1-6 4-5" /><path d="M20 20v6M26 19v8" /></svg>),
  pilates: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="10" r="3.4" /><path d="M24 14v10l-8 6M24 24l8 6M16 40l6-10M32 40l-6-10" /></svg>),
  hybrid: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="20" width="6" height="8" rx="1.5" /><rect x="36" y="20" width="6" height="8" rx="1.5" /><path d="M12 24h4M32 24h4" /><rect x="16" y="17" width="4" height="14" rx="1" /><rect x="28" y="17" width="4" height="14" rx="1" /><path d="M20 24h8" /></svg>),
  bhangra: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="9" r="3.4" /><path d="M24 13v12M24 15l-10-6M24 15l10-6M24 25l-8 12M24 25l8 12" /></svg>),
  zumba: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 30V10l14-3v20" /><circle cx="16" cy="32" r="4" /><circle cx="30" cy="27" r="4" /></svg>),
  gymnastics: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M24 6l3.6 8.4L36 16l-6.6 6.1L31 31l-7-4.6-7 4.6 1.6-8.9L12 16l8.4-1.6z" /></svg>),
  aerobics: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="9" r="3.4" /><path d="M24 13v11M24 15l-9-4M24 15l9-4M24 24l-9 11M24 24l9 11" /></svg>),
  yoga: (<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="10" r="3.4" /><path d="M24 14v8M24 16c-4 0-8 4-8 9M24 16c4 0 8 4 8 9M16 25c-2 4-2 8 2 10M32 25c2 4 2 8-2 10M18 35h12" /></svg>),
}

function SectionLabel({ text }) {
  return (<div className="section-label"><div className="section-label-line" /><span className="section-label-text">{text}</span><div className="section-label-line" /></div>)
}

function WhatsAppFloat() {
  return (
    <div className="wa-float">
      <div className="wa-tooltip">Chat with us on WhatsApp</div>
      <button className="wa-btn" onClick={() => openWA("Hi A.Materrix Gym! I'd like to know more about memberships and classes.")} aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.6 4.6 1.8 6.6L3 29l7.1-2.3c1.9 1 4 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.2 1.4 1.4-4.1-.2-.4c-1.1-1.7-1.7-3.7-1.7-5.7 0-5.8 4.7-10.5 10.5-10.5S26.5 9.7 26.5 15.5 21.8 25.7 16 25.7zm5.8-7.9c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
      </button>
    </div>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const links = ['Home', 'About', 'Services', 'Classes', 'Trainers', 'Pricing', 'Gallery', 'Contact']
  const joinMsg = 'Hi A.Materrix Gym! I want to join the gym. Please share membership details.'

  useEffect(() => {
    const ids = ['home', 'about', 'services', 'classes', 'trainers', 'gallery', 'contact']
    const fn = () => {
      setScrolled(window.scrollY > 60)
      let cur = 'home'
      ids.forEach(id => { const el = document.getElementById(id); if (el && el.offsetTop - 160 <= window.scrollY) cur = id })
      setActiveId(cur)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = l => {
    setOpen(false)
    if (l === 'Pricing') return openWA('Hi A.Materrix Gym! Please share your membership plans & pricing.')
    scrollToId(l.toLowerCase())
  }

  return (
    <>
      <nav className={`transition-all duration-500 ${scrolled ? 'nav-glass py-2' : 'py-5'}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo onClick={() => go('Home')} />

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '1.85rem' }}>
            {links.map(l => <button key={l} onClick={() => go(l)} className={`nav-link font-body ${activeId === l.toLowerCase() ? 'active' : ''}`}>{l}</button>)}
          </div>

          <div className="hidden lg:flex"><Magnetic><button className="btn-primary btn-sm" onClick={() => openWA(joinMsg)}>Join Now</button></Magnetic></div>

          <button className="lg:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: 'block', height: 2, borderRadius: 2, background: i === 1 ? 'var(--lime)' : '#fff', width: 24, transition: 'all 0.3s ease',
                  transform: open ? (i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)') : 'none', opacity: open && i === 1 ? 0 : 1 }} />
              ))}
            </div>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', padding: '5rem 2rem 2rem' }}>
          {links.map((l, i) => (
            <button key={l} onClick={() => go(l)} className="font-display mm-item"
              style={{ fontSize: 26, color: activeId === l.toLowerCase() ? 'var(--lime)' : 'var(--muted)', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', animationDelay: `${i * 0.05}s` }}>
              <span className="font-label" style={{ fontSize: 11, color: 'var(--cbl)', marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>{l}
            </button>
          ))}
          <button className="btn-primary btn-glow" style={{ marginTop: '1rem' }} onClick={() => { setOpen(false); openWA(joinMsg) }}>JOIN NOW</button>
        </div>
      </div>
      {open && <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setOpen(false)} />}
    </>
  )
}

// ── Hero with 3D scene ──────────────────────────────────────────────────────
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
    <section id="home" ref={heroRef} onMouseMove={onMove} style={{ position: 'relative', height: '100svh', minHeight: 580, overflow: 'hidden' }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: 'absolute', inset: '-3%', transition: 'opacity 1.3s ease, transform 8s ease', opacity: i === slide ? 1 : 0, transform: `scale(${i === slide ? 1.06 : 1}) translate(${mouse.x * -14}px, ${mouse.y * -14}px)` }}>
          <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg,rgba(3,4,7,0.95) 10%,rgba(3,4,7,0.7) 55%,rgba(21,88,201,0.22) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,var(--bg) 0%,transparent 100%)' }} />
        </div>
      ))}

      <div className="grid-floor" />

      <div className="scene-wrap">
        <div className="scene" style={{ transform: `rotateX(${mouse.y * -16}deg) rotateY(${mouse.x * 22}deg)` }}>
          <div className="ring r3" /><div className="ring r1" /><div className="ring r2" />
          <div className="cube">
            {['POWER', 'FORCE', 'GRIT', 'FOCUS', 'LEVEL', 'UP'].map((t, i) => <div key={t} className={`face f${i + 1}`}>{t}</div>)}
          </div>
          <div className="orb" /><div className="orb o2" />
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', zIndex: 10, transform: `translate(${mouse.x * 10}px, ${mouse.y * 6}px)`, transition: 'transform .3s ease-out', pointerEvents: 'none' }}>
        <div className="container" style={{ pointerEvents: 'auto' }}>
          <div key={slide} className="animate-fadeLeft">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 40, background: 'var(--lime)', flexShrink: 0 }} />
              <span className="font-label" style={{ color: 'var(--lime)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{slides[slide].tag}</span>
            </div>
            <h1 className="font-display hero-title" style={{ color: '#fff', display: 'block', marginBottom: 4, margin: 0 }}>{slides[slide].title}</h1>
            <h1 className="font-display hero-title shimmer-text" style={{ display: 'block', marginBottom: '1.5rem', marginTop: 0 }}>{slides[slide].sub2}</h1>
            <p className="font-body" style={{ color: 'var(--muted)', fontSize: 'clamp(14px,2vw,18px)', letterSpacing: '0.08em', marginBottom: '2rem', maxWidth: 480 }}>{slides[slide].sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <Magnetic><button className="btn-primary btn-glow" onClick={() => openWA('Hi A.Materrix Gym! I want to start my fitness journey. Please share membership details & free trial info.')}>START YOUR JOURNEY</button></Magnetic>
              <Magnetic><button className="btn-outline" onClick={() => scrollToId('about')}>EXPLORE MORE</button></Magnetic>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }} className="hide-xs">
              {[['users', '500+', 'Members'], ['dumbbell', '20+', 'Trainers'], ['award', '15+', 'Years']].map(([ic, n, l], i) => <span key={l} className="hero-chip" style={{ animationDelay: `${0.5 + i * 0.15}s` }}><Icon name={ic} size={15} style={{ color: 'var(--cbl)' }} /><b>{n}</b>{l}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
            style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', width: i === slide ? 28 : 8, background: i === slide ? 'var(--lime)' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '2.5rem', right: '1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} className="hide-xs">
        <span className="font-label" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="scroll-hint" style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, var(--lime), transparent)' }} />
      </div>
    </section>
  )
}

function Ticker() {
  const items = ['STRENGTH', 'ENDURANCE', 'POWER', 'SPEED', 'AGILITY', 'FLEXIBILITY', 'PERFORMANCE', 'EXCELLENCE']
  return (
    <div className="ticker-wrap" style={{ padding: '0.875rem 0', borderTop: '1px solid var(--border-lime)', borderBottom: '1px solid var(--border-lime)', background: 'rgba(212,255,36,0.04)', position: 'relative', zIndex: 2 }}>
      <div className="ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display" style={{ fontSize: 18, letterSpacing: '0.2em', margin: '0 2rem', color: 'var(--muted)' }}>{item} <Icon name="bolt" size={14} style={{ color: 'var(--lime)', marginLeft: 8, verticalAlign: '-2px' }} /></span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const [ref, inView] = useInView()
  const stats = [{ icon: 'calendar', num: 15, suffix: '+', label: 'Years Experience' }, { icon: 'users', num: 5000, suffix: '+', label: 'Members Strong' }, { icon: 'dumbbell', num: 50, suffix: '+', label: 'Expert Trainers' }, { icon: 'target', num: 98, suffix: '%', label: 'Success Rate' }]
  return (
    <section ref={ref} className="section-py">
      <div className="container">
        <div className="stats-grid persp">
          {stats.map((s, i) => (
            <TiltCard key={i} strength={14} className={`stat-card transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="stat-icon"><Icon name={s.icon} size={22} /></div>
              <div className="font-display" style={{ fontSize: 'clamp(52px,7vw,84px)', lineHeight: 1, color: 'var(--lime)', textShadow: '0 0 38px var(--lime-glow)', transform: 'translateZ(30px)' }}>{inView ? <Counter end={s.num} suffix={s.suffix} /> : '0'}</div>
              <div className="font-body" style={{ color: 'var(--muted)', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6, transform: 'translateZ(16px)' }}>{s.label}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const [ref, inView] = useInView()
  const features = [
    { icon: 'bolt', title: 'Premium Equipment', desc: 'Latest Technogym & Life Fitness gear maintained daily.' },
    { icon: 'trophy', title: 'Championship Results', desc: '200+ regional and national competition wins by members.' },
    { icon: 'flask', title: 'Science-Based Training', desc: 'Programs by certified exercise physiologists.' },
    { icon: 'target', title: 'Personalized Plans', desc: 'Custom programs built around your goals and body type.' },
  ]
  const bars = [['Cardio Zone', 90], ['Strength Training', 95], ['Nutrition Support', 85], ['Recovery Programs', 88]]

  return (
    <section id="about" ref={ref} className="section-py" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="about-grid">
          <TiltCard strength={7} className={`about-media transition-all duration-1000 ${inView ? 'animate-fadeLeft' : 'opacity-0'}`}>
            <div className="about-img-main">
              <img src={IMGS.about} alt="Inside A.Materrix Gym" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(21,88,201,0.28) 0%, transparent 60%)' }} />
            </div>
            <div className="about-img-sub neon-border"><img src={IMGS.about2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="about-badge" style={{ top: -16, left: -16 }}>
              <div className="font-display" style={{ fontSize: 36, color: 'var(--lime)', lineHeight: 1 }}>15+</div>
              <div className="font-label" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.15em' }}>YEARS OF EXCELLENCE</div>
            </div>
          </TiltCard>

          <div className={`transition-all duration-1000 delay-200 ${inView ? 'animate-fadeRight' : 'opacity-0'}`}>
            <SectionLabel text="About Us" />
            <h2 className="font-display section-title" style={{ color: '#fff', lineHeight: 0.95, marginBottom: '1.25rem' }}>WHERE LEGENDS<br /><span style={{ color: 'var(--cbl)' }}>ARE MADE</span></h2>
            <p className="font-body" style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, marginBottom: '1.75rem' }}>
              A.Materrix Gym is a premium fitness destination built for those who demand more than ordinary. Since 2009, we've transformed thousands of bodies and mindsets with our elite training ecosystem.
            </p>
            <div style={{ marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {bars.map(([label, val]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="font-body" style={{ color: 'var(--plat)', fontSize: 14, letterSpacing: '0.1em' }}>{label}</span>
                    <span className="font-body" style={{ color: 'var(--lime)', fontSize: 14 }}>{val}%</span>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: inView ? `${val}%` : '0%' }} /></div>
                </div>
              ))}
            </div>
            <div className="feature-grid" style={{ marginBottom: '1.75rem' }}>
              {features.map((f, i) => (
                <TiltCard key={i} strength={10} className="feature-card">
                  <div className="feature-icon-wrap"><Icon name={f.icon} size={20} /></div>
                  <div className="font-body" style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                  <div className="font-body" style={{ color: 'var(--muted)', fontSize: 13 }}>{f.desc}</div>
                </TiltCard>
              ))}
            </div>
            <Magnetic strength={10}><button className="btn-primary" onClick={() => openWA('Hi A.Materrix Gym! I want to book a gym tour / visit. Please share available timings.')}>BOOK A FREE TOUR</button></Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

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
          <h2 className="font-display section-title" style={{ color: '#fff' }}>OUR <span style={{ color: 'var(--lime)' }}>SERVICES</span></h2>
          <p className="font-body" style={{ color: 'var(--muted)', fontSize: 17, marginTop: 12 }}>A complete ecosystem for strength, recovery and performance</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <TiltCard key={i} strength={12} className={`service-card transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => openWA(`Hi A.Materrix Gym! I'm interested in ${s.title}. Please share timings, fees & trial class details.`)}>
              <div className="service-glow" />
              <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-icon-wrap" style={{ transform: 'translateZ(40px)' }}><span className="service-icon-svg">{SERVICE_ICONS[s.icon]}</span></div>
              <div className="font-display" style={{ color: '#fff', fontSize: 26, marginBottom: 10, transform: 'translateZ(24px)' }}>{s.title}</div>
              <div className="font-body" style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 'auto' }}>{s.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem' }}>
                <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg,var(--border-lime),transparent)' }} />
                <span className="font-label learn-more" style={{ fontSize: 9, color: 'var(--lime)', letterSpacing: '0.14em' }}>ENQUIRE ON WHATSAPP<Icon name="arrow-right" size={11} style={{ verticalAlign: '-1px', marginLeft: 5 }} /></span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

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
    <section id="classes" ref={ref} className="section-py" style={{ background: 'rgba(21,88,201,0.035)' }}>
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Programs" />
          <h2 className="font-display section-title" style={{ color: '#fff' }}>OUR <span style={{ color: 'var(--cbl)' }}>CLASSES</span></h2>
          <p className="font-body" style={{ color: 'var(--muted)', fontSize: 17, marginTop: 12 }}>Elite programs for every fitness goal</p>
        </div>
        <div className="grid-3 persp">
          {classes.map((c, i) => (
            <TiltCard key={i} strength={10} className={`hover-scale transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s`, borderRadius: 'var(--r-lg)', overflow: 'hidden', height: 300, cursor: 'pointer' }}>
              <div onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ position: 'absolute', inset: 0 }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: active === i ? 'scale(1.1)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, transition: 'all 0.4s ease', background: active === i ? 'linear-gradient(to top, rgba(21,88,201,0.82) 0%, rgba(3,4,7,0.55) 100%)' : 'linear-gradient(to top, rgba(3,4,7,0.92) 0%, rgba(3,4,7,0.15) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="font-label" style={{ fontSize: 10, padding: '3px 10px', borderRadius: 4, background: 'var(--lime)', color: '#000', letterSpacing: '0.1em' }}>{c.tag}</span>
                    <span className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em' }}>{c.level}</span>
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 28, color: '#fff', margin: '0 0 6px' }}>{c.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)' }}><Icon name="clock" size={13} style={{ marginRight: 5, verticalAlign: '-2px' }} />{c.duration}</span>
                      <button className="btn-outline btn-sm" onClick={() => openWA(`Hi A.Materrix Gym! I want to book the ${c.name} class (${c.level}, ${c.duration}). Please share available slots.`)}
                        style={active === i ? { background: 'var(--lime)', color: '#000', borderColor: 'var(--lime)' } : {}}>BOOK CLASS</button>
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

function Showcase() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="section-py" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Experience" />
          <h2 className="font-display section-title" style={{ color: '#fff' }}>FEEL THE <span style={{ color: 'var(--lime)' }}>POWER</span></h2>
        </div>
        <div className="about-grid" style={{ alignItems: 'stretch' }}>
          <TiltCard strength={6} className={`neon-border transition-all duration-1000 ${inView ? 'animate-fadeLeft' : 'opacity-0'}`} style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
            <img src={IMGS.showcase1} alt="Facility" style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }} />
          </TiltCard>
          <TiltCard strength={6} className={`neon-border transition-all duration-1000 delay-200 ${inView ? 'animate-fadeRight' : 'opacity-0'}`} style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
            <img src={IMGS.showcase2} alt="Facility" style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }} />
          </TiltCard>
        </div>
        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {[['flame', 'High Intensity', 'Programs designed to maximize calorie burn'], ['dumbbell', 'Expert Coaching', 'World-class trainers guiding every rep'], ['award', 'Real Results', 'Proven transformation system']].map(([icon, title, desc], i) => (
            <div key={i} className={`card-base hover-scale ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ padding: '1.5rem', textAlign: 'center', animationDelay: `${0.3 + i * 0.12}s` }}>
              <div className="icon-badge"><Icon name={icon} size={26} /></div>
              <div className="font-body" style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</div>
              <div className="font-body" style={{ color: 'var(--muted)', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trainers() {
  const [ref, inView] = useInView()
  const [flipped, setFlipped] = useState(null)
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
          <h2 className="font-display section-title" style={{ color: '#fff' }}>ELITE <span style={{ color: 'var(--cbl)' }}>TRAINERS</span></h2>
        </div>
        <div className="grid-4 persp">
          {trainers.map((t, i) => (
            <TiltCard key={i} strength={8} className={`transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s`, borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div className={`flip-wrap ${flipped === i ? 'flipped' : ''}`} style={{ height: 300 }} onClick={() => setFlipped(flipped === i ? null : i)}>
                <div className="flip-inner">
                  <div className="flip-front">
                    <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,4,7,0.95) 0%, rgba(21,88,201,0.1) 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                      <h3 className="font-display" style={{ fontSize: 22, color: '#fff', margin: 0 }}>{t.name}</h3>
                      <p className="font-body" style={{ color: 'var(--lime)', fontSize: 13, letterSpacing: '0.1em', margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                  <div className="flip-back">
                    <h3 className="font-display" style={{ fontSize: 18, color: 'var(--lime)', marginBottom: 16, marginTop: 0 }}>{t.name}</h3>
                    {[['EXPERIENCE', t.exp], ['SPECIALIZATION', t.spec], ['CERTIFICATIONS', t.certs]].map(([label, val]) => (
                      <div key={label} style={{ marginBottom: 12 }}>
                        <div className="font-label" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.14em', marginBottom: 3 }}>{label}</div>
                        <div className="font-body" style={{ color: '#fff', fontSize: 14 }}>{val}</div>
                      </div>
                    ))}
                    <button className="btn-primary btn-sm" style={{ marginTop: 'auto', width: '100%' }}
                      onClick={e => { e.stopPropagation(); openWA(`Hi A.Materrix Gym! I want to book a personal training session with ${t.name} (${t.role}). Please share availability.`) }}>BOOK SESSION</button>
                  </div>
                </div>
              </div>
              <div style={{ padding: '0.875rem 1rem', background: 'var(--bg4)', borderTop: '1px solid var(--border)' }}>
                <div className="font-body" style={{ color: '#fff', fontWeight: 700 }}>{t.name}</div>
                <div className="font-body" style={{ color: 'var(--cbl)', fontSize: 13 }}>{t.role}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Schedule() {
  const [ref, inView] = useInView()
  const [day, setDay] = useState(0)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',] // 'SUN'
  const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
          <h2 className="font-display section-title" style={{ color: '#fff' }}>CLASS <span style={{ color: 'var(--cbl)' }}>TIMETABLE</span></h2>
        </div>
        <div className="day-tabs" style={{ marginBottom: '1.75rem' }}>{days.map((d, i) => <button key={i} className={`day-tab ${day === i ? 'active' : ''}`} onClick={() => setDay(i)}>{d}</button>)}</div>
        <div className="card-base" style={{ padding: '0.5rem 1.25rem' }} key={day}>
          {(schedule[day] || []).map((item, i) => (
            <div key={i} className="schedule-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0.5rem', flexWrap: 'wrap', gap: '0.75rem', animationDelay: `${i * 0.07}s` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="font-label" style={{ color: 'var(--lime)', fontSize: 13, minWidth: 50 }}>{item.time}</span>
                <div>
                  <div className="font-body" style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{item.name}</div>
                  <div className="font-body" style={{ color: 'var(--muted)', fontSize: 13 }}>{item.trainer}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span className="font-body" style={{ fontSize: 13, color: item.spots <= 3 ? '#f87171' : '#4ade80' }}>{item.spots} spots left</span>
                <button className="btn-outline btn-sm" onClick={() => openWA(`Hi A.Materrix Gym! I want to book ${item.name} on ${fullDays[day]} at ${item.time} with ${item.trainer}.`)}>BOOK</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing: App me comment hai. Uncomment karoge to buttons WhatsApp pe kaam karenge.
function Pricing() {
  const [ref, inView] = useInView()
  const [annual, setAnnual] = useState(false)
  const plans = [
    { name: 'STARTER', color: 'var(--muted)', price: annual ? 1999 : 2499, features: ['Full Gym Access', 'Locker Room', '2 Group Classes/mo', 'Basic App Access', 'Nutrition Guide'], missing: ['Personal Training', 'Spa Access', 'Priority Booking'] },
    { name: 'ELITE', color: 'var(--cbl)', featured: true, price: annual ? 4499 : 5499, features: ['Full Gym Access', 'Locker Room', 'Unlimited Classes', 'Full App Access', 'Nutrition Coaching', '4 PT Sessions/mo', 'Priority Booking'], missing: ['Spa Access'] },
    { name: 'PLATINUM', color: 'var(--lime)', price: annual ? 7999 : 9999, features: ['Full Gym Access', 'Premium Locker', 'Unlimited Classes', 'Full App Access', 'Custom Meal Plans', 'Unlimited PT Sessions', 'Priority Booking', 'Spa & Recovery Access', 'Guest Passes x4/mo'] },
  ]
  return (
    <section id="pricing" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '2.5rem' }}>
          <SectionLabel text="Membership" />
          <h2 className="font-display section-title" style={{ color: '#fff' }}>CHOOSE YOUR <span style={{ color: 'var(--lime)' }}>PLAN</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
            <span className="font-body" style={{ fontSize: 13, letterSpacing: '0.12em', color: !annual ? '#fff' : 'var(--dim)' }}>MONTHLY</span>
            <button onClick={() => setAnnual(!annual)} aria-label="Toggle annual billing" style={{ width: 48, height: 26, borderRadius: 99, background: annual ? 'var(--lime)' : 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: annual ? '#000' : '#fff', transition: 'left 0.3s', left: annual ? 24 : 4 }} />
            </button>
            <span className="font-body" style={{ fontSize: 13, letterSpacing: '0.12em', color: annual ? '#fff' : 'var(--dim)' }}>ANNUAL <span style={{ color: 'var(--lime)' }}>-20%</span></span>
          </div>
        </div>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <TiltCard key={i} strength={9} className={`plan-card ${p.featured ? 'featured' : ''} transition-all duration-700 ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
              {p.featured && <div className="font-label" style={{ fontSize: 10, textAlign: 'center', padding: '5px 0', borderRadius: 4, background: 'var(--cb)', color: '#fff', letterSpacing: '0.12em', marginBottom: 20, marginTop: -4 }}>MOST POPULAR</div>}
              <div className="font-label" style={{ fontSize: 12, color: p.color, marginBottom: 8, letterSpacing: '0.12em' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                <span className="font-body" style={{ color: 'var(--muted)', fontSize: 18 }}>₹</span>
                <span className="font-display" style={{ fontSize: 'clamp(48px,6vw,64px)', color: p.color, lineHeight: 1 }}>{p.price.toLocaleString()}</span>
              </div>
              <div className="font-body" style={{ color: 'var(--dim)', fontSize: 13, marginBottom: '1.75rem' }}>{annual ? '/mo billed annually' : '/month'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                {p.features.map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon name="check" size={15} style={{ color: p.color }} /><span className="font-body" style={{ color: 'var(--plat)', fontSize: 14 }}>{f}</span></div>)}
                {(p.missing || []).map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.35 }}><Icon name="x" size={15} /><span className="font-body" style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'line-through' }}>{f}</span></div>)}
              </div>
              <Magnetic strength={8}><button className={p.featured ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', padding: '0.875rem' }}
                onClick={() => openWA(`Hi A.Materrix Gym! I want to join the ${p.name} plan (₹${p.price.toLocaleString()}/mo, ${annual ? 'annual' : 'monthly'} billing). Please guide me.`)}>GET STARTED</button></Magnetic>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)
  const images = [IMGS.gallery1, IMGS.gallery2, IMGS.gallery3, IMGS.gallery4, IMGS.gallery5, IMGS.gallery6, IMGS.gallery7, IMGS.gallery8, IMGS.equip1, IMGS.equip2, IMGS.class1, IMGS.class4]

  useEffect(() => {
    if (active === null) return
    const fn = e => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive(a => (a + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive(a => (a - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [active, images.length])

  return (
    <section id="gallery" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Gallery" />
          <h2 className="font-display section-title" style={{ color: '#fff' }}>INSIDE <span style={{ color: 'var(--lime)' }}>A.MATERRIX</span></h2>
        </div>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div key={i} className={`gallery-item transition-all duration-700 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.04}s` }} onClick={() => setActive(i)}>
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
              <div className="gallery-overlay"><Icon name="plus" size={34} style={{ color: 'var(--lime)' }} /></div>
            </div>
          ))}
        </div>
      </div>
      {active !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setActive(null)}>
          <div className="animate-scaleIn" style={{ maxWidth: 900, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src={images[active]} alt="" style={{ width: '100%', borderRadius: 'var(--r-lg)', maxHeight: '80vh', objectFit: 'contain' }} />
            <button onClick={() => setActive(null)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={16} /></button>
            {[{ side: 'left', symbol: <Icon name="chevron-left" size={22} />, action: () => setActive((active - 1 + images.length) % images.length) }, { side: 'right', symbol: <Icon name="chevron-right" size={22} />, action: () => setActive((active + 1) % images.length) }].map(({ side, symbol, action }) => (
              <button key={side} onClick={action} aria-label={side} style={{ position: 'absolute', [side]: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(21,88,201,0.5)', border: '1px solid var(--border-cb)', color: '#fff', cursor: 'pointer', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{symbol}</button>
            ))}
            <div className="font-label" style={{ textAlign: 'center', marginTop: 12, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)' }}>{active + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </section>
  )
}

function Testimonials() {
  const [ref, inView] = useInView()
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const testimonials = [
    { name: 'Rohit Verma', role: 'Software Engineer', text: "A.Materrix Gym completely transformed my physique in 6 months. The trainers are world-class and the equipment is unmatched. Best investment I've ever made.", avatar: 'RV' },
    { name: 'Ananya Patel', role: 'Marketing Manager', text: 'From 82kg to 63kg in one year. The nutrition coaching combined with HIIT classes was exactly what I needed. Priya is an absolute rockstar trainer!', avatar: 'AP' },
    { name: 'Karan Singh', role: 'Business Owner', text: 'The Platinum membership is worth every rupee. Unlimited PT sessions and the spa access make recovery seamless. I feel 10 years younger.', avatar: 'KS' },
    { name: 'Meera Shah', role: 'Doctor', text: 'As a healthcare professional, I appreciate the scientific approach at A.Materrix. Programs are evidence-based and the staff is incredibly knowledgeable.', avatar: 'MS' },
    { name: 'Arjun Mehta', role: 'Competitive Athlete', text: 'Won my first regional powerlifting competition after training at A.Materrix for just 8 months. Coach Alex is a genius. No other gym comes close.', avatar: 'AM' },
  ]
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4500)
    return () => clearInterval(t)
  }, [paused])

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
          <h2 className="font-display section-title" style={{ color: '#fff' }}>SUCCESS <span style={{ color: 'var(--lime)' }}>STORIES</span></h2>
        </div>
        <div className="tcarousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {testimonials.map((t, i) => {
            const off = offsetOf(i), abs = Math.abs(off)
            if (abs > 2) return null
            return (
              <div key={i} className="tcard" onClick={() => setIdx(i)} style={{
                transform: `translateX(${off * 62}%) scale(${1 - abs * 0.14}) rotateY(${off * -16}deg) translateZ(${-abs * 90}px)`,
                opacity: abs > 1 ? 0 : 1 - abs * 0.35, filter: abs === 0 ? 'none' : 'blur(1.5px)', zIndex: 10 - abs,
                cursor: abs === 0 ? 'default' : 'pointer', pointerEvents: abs > 1 ? 'none' : 'auto',
                borderColor: abs === 0 ? 'var(--border-lime)' : 'var(--border)',
              }}>
                <Icon name="quote" size={34} style={{ color: 'var(--lime)', marginBottom: 14 }} />
                <p className="font-body" style={{ fontSize: 'clamp(15px,2vw,19px)', color: 'var(--plat-dim)', lineHeight: 1.65, marginBottom: '1.5rem' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="font-label" style={{ fontSize: 12, color: '#000', fontWeight: 700 }}>{t.avatar}</span></div>
                  <div style={{ textAlign: 'left' }}><div className="font-body" style={{ color: '#fff', fontWeight: 700 }}>{t.name}</div><div className="font-body" style={{ color: 'var(--muted)', fontSize: 13 }}>{t.role}</div></div>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {testimonials.map((_, i) => <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === idx ? 'var(--lime)' : 'rgba(255,255,255,0.18)', width: i === idx ? 24 : 8 }} />)}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="section-py" style={{ overflow: 'hidden' }}>
      <img src={IMGS.cta} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(3,4,7,0.92),rgba(5,20,50,0.88))' }} />
      <div className="grid-floor" style={{ height: '55%', opacity: 0.8 }} />
      <div className={`container transition-all duration-1000 ${inView ? 'animate-scaleIn' : 'opacity-0'}`} style={{ textAlign: 'center' }}>
        <SectionLabel text="Limited Time" />
        <h2 className="font-display" style={{ lineHeight: 0.92, marginBottom: '1.25rem', fontSize: 'clamp(52px,9vw,110px)', marginTop: 0 }}>
          <span style={{ color: '#fff' }}>START YOUR</span><br /><span className="shimmer-text">TRANSFORMATION</span><br /><span style={{ color: '#fff' }}>TODAY</span>
        </h2>
        <p className="font-body" style={{ color: 'var(--plat-dim)', fontSize: 'clamp(15px,2vw,20px)', marginBottom: '2.5rem', lineHeight: 1.6 }}>Join 5,000+ members who chose excellence.<br />First month 50% off — no contracts, no excuses.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Magnetic><button className="btn-primary btn-glow" style={{ padding: '1rem 2.5rem' }} onClick={() => openWA('Hi A.Materrix Gym! I want to claim the First Month 50% OFF offer. Please share details.')}>CLAIM YOUR OFFER NOW</button></Magnetic>
          <Magnetic><button className="btn-outline" style={{ padding: '1rem 2.5rem' }} onClick={() => { window.location.href = `tel:+${WHATSAPP_NUMBER}` }}>CALL US NOW</button></Magnetic>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          {['No Hidden Fees', 'Cancel Anytime', 'Free Trial Class', '24/7 Access'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={16} style={{ color: 'var(--lime)' }} /><span className="font-body" style={{ color: 'var(--muted)', fontSize: 13, letterSpacing: '0.1em' }}>{t}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' })
  const [sent, setSent] = useState(false)
  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) { alert('Please enter at least your name and phone number.'); return }
    const lines = ['*New Trial Class Request — A.Materrix Gym*', `Name: ${form.name}`, `Email: ${form.email || '-'}`, `Phone: ${form.phone}`, `Goal: ${form.goal || '-'}`, `Message: ${form.message || '-'}`]
    openWA(lines.join('\n'), 'Sending your details to WhatsApp…')
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }
  const info = [
    { icon: 'pin', label: 'Address', val: ADDRESS, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('A.Materrix Gym ' + ADDRESS)}`, ext: true },
    { icon: 'phone', label: 'Phone', val: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
    { icon: 'mail', label: 'Email', val: EMAIL, href: `mailto:${EMAIL}` },
    { icon: 'clock', label: 'Hours', val: 'Mon–Sat: 6AM–12AM ' },
  ]
  const openSocial = name => {
    const url = SOCIALS[name]
    if (url) window.open(url, '_blank', 'noopener')
    else openWA(`Hi A.Materrix Gym! Please share your ${name} page link.`)
  }
  return (
    <section id="contact" ref={ref} className="section-py">
      <div className="container">
        <div className={`text-center ${inView ? 'animate-fadeUp' : 'opacity-0'}`} style={{ marginBottom: '3rem' }}>
          <SectionLabel text="Contact" />
          <h2 className="font-display section-title" style={{ color: '#fff' }}>GET IN <span style={{ color: 'var(--lime)' }}>TOUCH</span></h2>
        </div>
        <div className="contact-grid">
          <div className={inView ? 'animate-fadeLeft' : 'opacity-0'}>
            <h3 className="font-display" style={{ fontSize: 28, color: '#fff', marginBottom: '1.75rem', marginTop: 0 }}>VISIT A.MATERRIX GYM</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
              {info.map((item, i) => {
                const inner = (
                  <>
                    <span className="info-icon"><Icon name={item.icon} size={20} /></span>
                    <div><div className="font-label" style={{ fontSize: 9, color: 'var(--lime)', letterSpacing: '0.16em', marginBottom: 4 }}>{item.label}</div><div className="font-body" style={{ color: 'var(--plat-dim)', fontSize: 15 }}>{item.val}</div></div>
                  </>
                )
                const st = { display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem' }
                return item.href
                  ? <a key={i} href={item.href} {...(item.ext ? { target: '_blank', rel: 'noreferrer' } : {})} className="card-base hover-scale info-card" style={st}>{inner}</a>
                  : <div key={i} className="card-base hover-scale" style={st}>{inner}</div>
              })}
              <a href={waLink('Hi A.Materrix Gym! I have a query.')} target="_blank" rel="noreferrer" className="card-base hover-scale info-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', borderColor: 'rgba(37,211,102,0.3)' }}>
                <span className="info-icon wa"><WaIcon size={20} /></span>
                <div><div className="font-label" style={{ fontSize: 9, color: 'var(--wa)', letterSpacing: '0.16em', marginBottom: 4 }}>WHATSAPP</div><div className="font-body" style={{ color: 'var(--plat-dim)', fontSize: 15 }}>{PHONE_DISPLAY}</div></div>
              </a>
            </div>
            <div>
              <div className="font-label" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.16em', marginBottom: 12 }}>FOLLOW US</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>{Object.keys(SOCIALS).map(s => <button key={s} className="social-btn" onClick={() => openSocial(s)}><Icon name={s.toLowerCase()} size={14} />{s}</button>)}</div>
            </div>
          </div>
          <div className={inView ? 'animate-fadeRight' : 'opacity-0'}>
            <div className="card-base" style={{ padding: 'clamp(1.25rem,4vw,2.25rem)', borderColor: 'var(--border-cb)' }}>
              <h3 className="font-display" style={{ fontSize: 24, color: '#fff', marginBottom: '0.4rem', marginTop: 0 }}>START YOUR FREE TRIAL</h3>
              <p className="font-body" style={{ color: 'var(--dim)', fontSize: 13, marginBottom: '1.25rem' }}>Submitting sends your details straight to our WhatsApp.</p>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <input className="input-field" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="input-field" type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <input className="input-field" type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ marginBottom: '1rem' }} />
              <select className="input-field" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} style={{ marginBottom: '1rem' }}>
                <option value="">Select Your Goal</option>
                {['Weight Loss', 'Muscle Building', 'Athletic Performance', 'General Fitness', 'Rehabilitation'].map(o => <option key={o}>{o}</option>)}
              </select>
              <textarea className="input-field" rows={4} placeholder="Tell us about yourself…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'none', marginBottom: '1.25rem' }} />
              <Magnetic strength={6}>
                <button onClick={submit} style={{ width: '100%', padding: '0.9375rem', borderRadius: 'var(--r-sm)', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: sent ? '#22c55e' : 'var(--wa)', color: '#05170f', boxShadow: sent ? '0 8px 24px rgba(34,197,94,0.3)' : '0 8px 24px rgba(37,211,102,0.35)' }}>
                  {sent ? (<><Icon name="check" size={16} />SENT TO WHATSAPP — WE'LL CALL YOU SOON!</>) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 32 32" fill="#05170f"><path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.6 4.6 1.8 6.6L3 29l7.1-2.3c1.9 1 4 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm5.8 14.8c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
                      SEND VIA WHATSAPP
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Legal ───────────────────────────────────────────────────────────────────
const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy', updated: 'Last updated: July 2026',
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
    title: 'Terms & Conditions', updated: 'Last updated: July 2026',
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
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  if (!data) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 130, background: 'rgba(3,4,7,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }} onClick={onClose}>
      <div className="animate-scaleIn card-base" style={{ maxWidth: 720, width: '100%', maxHeight: '82vh', overflowY: 'auto', padding: 'clamp(1.5rem,4vw,2.5rem)', borderColor: 'var(--border-lime)', position: 'relative', background: 'var(--bg3)' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={16} /></button>
        <SectionLabel text="Legal" />
        <h2 className="font-display" style={{ fontSize: 'clamp(30px,4vw,42px)', color: '#fff', marginBottom: 4, marginTop: 0 }}>{data.title}</h2>
        <p className="font-body" style={{ color: 'var(--dim)', fontSize: 13, marginBottom: '1.75rem' }}>{data.updated}</p>
        {data.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '1.4rem' }}>
            <div className="font-label" style={{ fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em', marginBottom: 6 }}>{s.h}</div>
            <p className="font-body" style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  const [legalOpen, setLegalOpen] = useState(null)
  const cols = [
    { title: 'Quick Links', links: ['Home', 'About', 'Services', 'Classes', 'Trainers', 'Pricing', 'Gallery'] },
    { title: 'Programs', links: ['Powerlifting', 'HIIT Training', 'CrossFit', 'Boxing Pro', 'Yoga Fusion', 'Cycle Blast'] },
    { title: 'Support', links: ['FAQs', 'Membership Policy', 'Privacy Policy', 'Terms of Service', 'Contact Us'] },
  ]
  const handle = (colTitle, l) => {
    if (l === 'Privacy Policy') return setLegalOpen('privacy')
    if (l === 'Terms of Service') return setLegalOpen('terms')
    if (l === 'Contact Us') return scrollToId('contact')
    if (colTitle === 'Quick Links') {
      if (l === 'Pricing') return openWA('Hi A.Materrix Gym! Please share your membership plans & pricing.')
      return scrollToId(l.toLowerCase())
    }
    if (colTitle === 'Programs') return openWA(`Hi A.Materrix Gym! I want details about ${l}.`)
    if (l === 'FAQs') return openWA('Hi A.Materrix Gym! I have a question. Can you help me?')
    if (l === 'Membership Policy') return openWA('Hi A.Materrix Gym! Please share your membership policy details.')
  }
  return (
    <footer style={{ background: 'rgba(2,3,5,0.75)', borderTop: '1px solid var(--border-lime)', position: 'relative', zIndex: 2 }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ marginBottom: '1.25rem' }}><Logo /></div>
            <p className="font-body" style={{ color: 'var(--dim)', fontSize: 14, lineHeight: 1.65, marginBottom: '1rem' }}>A premium fitness destination. Where ordinary people become extraordinary athletes.</p>
            <button className="btn-primary btn-sm" onClick={() => openWA('Hi A.Materrix Gym! I want to know more about your gym.')}>CHAT ON WHATSAPP</button>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="font-label" style={{ fontSize: 9, color: 'var(--lime)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: 0 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: 0, margin: 0 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" onClick={e => { e.preventDefault(); handle(col.title, l) }} className="font-body"
                      style={{ color: 'var(--dim)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s, padding-left 0.3s var(--ease)', cursor: 'pointer', display: 'inline-block' }}
                      onMouseEnter={e => { e.target.style.color = 'var(--lime)'; e.target.style.paddingLeft = '6px' }} onMouseLeave={e => { e.target.style.color = 'var(--dim)'; e.target.style.paddingLeft = '0' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <p className="font-body" style={{ color: 'var(--dim)', fontSize: 13, margin: 0 }}>© {new Date().getFullYear()} A.Materrix Gym. All rights reserved. Punjab, India.</p>
          <p className="font-label" style={{ fontSize: 10, color: 'rgba(255,255,255,0.14)', letterSpacing: '0.16em', margin: 0 }}>BUILT FOR CHAMPIONS</p>
        </div>
      </div>
      {legalOpen && <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />}
    </footer>
  )
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <PremiumStyles />
      <Preloader />
      <ScrollProgress />
      <div className="backdrop" />
      <div className="backdrop-dots" />
      <ParticleField />
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
      {/* <Pricing /> */}
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
      <WhatsAppFloat />
      <BackToTop />
      <Toast />
      <Footer />
    </>
  )
}