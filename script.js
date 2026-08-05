/**
 * ================================================================
 * MAMA SHIRO'S SALON & KINYOZI — MASTER SCRIPT
 * Author: Clement Wambu Gakuha
 * Architecture: Vanilla JS, zero dependencies, mobile-first
 * Performance: Runs only after DOM is ready, uses requestAnimationFrame
 * ================================================================
 */

'use strict';

/* ──────────────────────────────────────────────────────────────
   0. CONFIGURATION — Change these without touching logic
   ────────────────────────────────────────────────────────────── */
const CONFIG = {
  whatsappNumber: '254724453312',
  facebookName:   'Mary Mathenge',
  email:          'marythuguri64@gmail.com',
  phone:          '+254724453312',
  defaultLang:    'en',
  defaultTheme:   'light',

  /* Particle canvas settings — tuned for 3G performance */
  particles: {
    count:        35,     /* low count = low CPU on old phones */
    minRadius:    1.5,
    maxRadius:    3.5,
    minSpeed:     0.15,
    maxSpeed:     0.4,
    color:        null,   /* set dynamically per theme */
    connectDist:  100,    /* distance to draw connecting lines */
    opacity:      0.55,
  },
};

/* ──────────────────────────────────────────────────────────────
   1. TRANSLATION DICTIONARY
   Every string is written at MINIMUM 18px equivalent font.
   Structure: translations[lang][key] = string
   ────────────────────────────────────────────────────────────── */
const translations = {

  en: {
    /* ─── Meta / system ─── */
    'lang-name': 'English',

    /* ─── Navigation ─── */
    'nav-services': 'Services',
    'nav-about':    'About',
    'nav-gallery':  'Gallery',
    'nav-contact':  'Contact',

    /* ─── Hero ─── */
    'hero-title':    "Mama Shiro's Salon & Kinyozi",
    'hero-subtitle': 'Professional Haircare, Braiding & Barber Services in Wachina, Karatina.',
    'faq-text':      'We use top-quality gels and oils to keep your hair healthy and strong. Ask Mama Shiro about her trusted products!',
    'btn-call':      'Call Mama Shiro',
    'btn-whatsapp':  'Chat on WhatsApp',

    /* ─── Services ─── */
    'services-title':       'Our Services & Prices',
    'services-subtitle':    'All prices in Kenyan Shillings (Ksh)',
    'cat-wash':             'Wash & Treatments',
    'cat-plaiting':         'Plaiting & Braiding',
    'cat-weaves':           'Weaves & Classic Styles',
    'cat-kinyozi':          'Kinyozi (Barber)',
    'svc-blowdry':          'Blow-dry & Wash',
    'svc-blowdry-badge':    'Most Popular!',
    'svc-palming':          'Palming (Perms/Chemicals)',
    'svc-gel':              'Styling Gel',
    'svc-gel-price':        'Ask for Pricing',
    'svc-lines':            'Lines',
    'svc-lines-badge':      'Back-to-School!',
    'svc-twist':            'Twist',
    'svc-rasta':            'Rasta',
    'svc-weaving':          'Weaving',
    'svc-bandika':          'Bandika',
    'svc-mwongezo':         'Mwongezo',
    'svc-bob':              'Bob',
    'svc-pussycat':         'Pussycat',
    'svc-ethiopianth':      'Ethiopianth',
    'svc-eth-badge':        '✦ Signature Style',
    'svc-children':         "Children's Haircut",
    'svc-adults':           "Adults' Haircut",
    'kinyozi-note':         'Quick, clean cuts for the whole family. No appointment needed!',

    /* ─── About ─── */
    'about-title':  'Meet Mama Shiro',
    'bio-para-1':   'For over 35 years, Mama Shiro has been perfecting hair and keeping the Wachina community looking beautiful. From classic styles like Bandika to her absolute favourite — the Ethiopianth — she brings decades of skill and genuine care to every single customer.',
    'bio-para-2':   'Whether you are a student getting Lines for back-to-school, or a youth looking for a fresh new style — you are always welcome in Mama Shiro\'s chair.',
    'badge-exp':    '35+ Years Experience',
    'badge-comm':   'Community Favourite',
    'badge-sig':    'Signature: Ethiopianth',
    'badge-est':    'Est. Since ~1989',

    /* ─── Gallery ─── */
    'gallery-title':     'Gallery & Our Work',
    'gallery-eth':       'Ethiopianth Style',
    'gallery-braiding':  'Braiding & Lines',
    'gallery-weave':     'Weave & Bob',
    'gallery-twist':     'Twist & Rasta',
    'gallery-kinyozi':   'Kinyozi Cuts',
    'gallery-bandika':   'Bandika Classic',
    'video-title':       'Video Reels (Coming Soon)',
    'video-fb':          'Facebook Reel',
    'video-tiktok':      'TikTok Reel',
    'video-tutorial':    'Style Tutorial',
    'video-coming-soon': '(Coming Soon)',

    /* ─── Contact ─── */
    'contact-title':   'Find Us & Get in Touch',
    'loc-hours-title': 'Location & Hours',
    'location-text':   'Wachina, near Gachuero & General China Secondary School, Karatina.',
    'hours-text':      'Open Monday – Sunday: 11:00 AM – 7:00 PM. Every day, no days off!',
    'payment-text':    'Payment: Cash or M-Pesa — Send M-Pesa to: 0724 453312',
    'channels-title':  'Contact Channels',
    'link-whatsapp':   'WhatsApp Chat',
    'link-facebook':   'Mary Mathenge (Facebook)',
    'link-email':      'Email Us',

    /* ─── Footer ─── */
    'footer-tagline':  "Wachina's finest — for 35+ years.",
    'footer-call':     'Call Us',
    'footer-hours':    'Open Daily: 11:00 AM – 7:00 PM | Cash & M-Pesa Accepted',
    'wa-tooltip':      'Chat with us!',
  },

  /* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */

  sw: {
    'lang-name': 'Kiswahili',

    'nav-services': 'Huduma',
    'nav-about':    'Kuhusu',
    'nav-gallery':  'Picha',
    'nav-contact':  'Wasiliana',

    'hero-title':    "Saluni ya Mama Shiro & Kinyozi",
    'hero-subtitle': 'Huduma za Kitaalamu za Nywele, Kusuka na Kinyozi huko Wachina, Karatina.',
    'faq-text':      'Tunatumia mafuta na jeli bora kukufanya nywele zako ziwe na afya na nguvu. Muulize Mama Shiro kuhusu bidhaa zake!',
    'btn-call':      'Piga Simu Mama Shiro',
    'btn-whatsapp':  'Zungumza WhatsApp',

    'services-title':       'Huduma Zetu & Bei',
    'services-subtitle':    'Bei zote ni Shilingi za Kenya (Ksh)',
    'cat-wash':             'Osha & Matibabu',
    'cat-plaiting':         'Kusuka na Kutengeneza Nywele',
    'cat-weaves':           'Weave na Mitindo ya Jadi',
    'cat-kinyozi':          'Kinyozi (Mpigaji Nywele)',
    'svc-blowdry':          'Osha na Kausha (Blow-dry)',
    'svc-blowdry-badge':    'Inayopendwa Sana!',
    'svc-palming':          'Palming (Perm / Kemikali)',
    'svc-gel':              'Jeli ya Mtindo',
    'svc-gel-price':        'Uliza Bei',
    'svc-lines':            'Mistari (Lines)',
    'svc-lines-badge':      'Rudi Shule!',
    'svc-twist':            'Twist',
    'svc-rasta':            'Rasta',
    'svc-weaving':          'Weaving',
    'svc-bandika':          'Bandika',
    'svc-mwongezo':         'Mwongezo',
    'svc-bob':              'Bob',
    'svc-pussycat':         'Pussycat',
    'svc-ethiopianth':      'Ethiopianth',
    'svc-eth-badge':        '✦ Mtindo Maalum',
    'svc-children':         'Kunyoa Watoto',
    'svc-adults':           'Kunyoa Watu Wazima',
    'kinyozi-note':         'Kukata haraka na usafi kwa familia yote. Hakuna haja ya miadi!',

    'about-title':  'Mkutane na Mama Shiro',
    'bio-para-1':   'Kwa zaidi ya miaka 35, Mama Shiro amekuwa akifanya nywele vizuri na kuweka jamii ya Wachina ikiwa na uzuri. Kuanzia mitindo ya zamani kama Bandika hadi kipendwa chake — Ethiopianth — analeta ustadi wa miongo na upendo wa kweli kwa kila mteja.',
    'bio-para-2':   'Kama wewe ni mwanafunzi unaohitaji Lines kabla ya shule, au kijana anayetafuta mtindo mpya — karibu sana kwenye kiti cha Mama Shiro.',
    'badge-exp':    'Uzoefu wa Miaka 35+',
    'badge-comm':   'Kipenzi cha Jamii',
    'badge-sig':    'Mtindo Maalum: Ethiopianth',
    'badge-est':    'Kuanzishwa ~1989',

    'gallery-title':     'Picha na Kazi Yetu',
    'gallery-eth':       'Mtindo wa Ethiopianth',
    'gallery-braiding':  'Kusuka na Mistari',
    'gallery-weave':     'Weave na Bob',
    'gallery-twist':     'Twist na Rasta',
    'gallery-kinyozi':   'Kukata Kinyozi',
    'gallery-bandika':   'Bandika ya Zamani',
    'video-title':       'Video (Zinakuja Hivi Karibuni)',
    'video-fb':          'Reel ya Facebook',
    'video-tiktok':      'Reel ya TikTok',
    'video-tutorial':    'Jinsi ya Kufanya Mitindo',
    'video-coming-soon': '(Inakuja)',

    'contact-title':   'Tupate na Wasiliana Nasi',
    'loc-hours-title': 'Mahali & Masaa',
    'location-text':   'Wachina, karibu na Gachuero & Shule ya Sekondari ya General China, Karatina.',
    'hours-text':      'Wazi Jumatatu – Jumapili: 11:00 AM – 7:00 PM. Kila siku, hakuna likizo!',
    'payment-text':    'Malipo: Pesa Taslimu au M-Pesa — Tuma kwa: 0724 453312',
    'channels-title':  'Njia za Mawasiliano',
    'link-whatsapp':   'Zungumza WhatsApp',
    'link-facebook':   'Mary Mathenge (Facebook)',
    'link-email':      'Barua Pepe',

    'footer-tagline':  'Bora zaidi Wachina — kwa miaka 35+.',
    'footer-call':     'Piga Simu',
    'footer-hours':    'Wazi Kila Siku: 11:00 AM – 7:00 PM | Pesa Taslimu & M-Pesa',
    'wa-tooltip':      'Zungumza nasi!',
  },

  /* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */

  ki: {
    'lang-name': 'Gĩkũyũ',

    'nav-services': 'Ũtũngati',
    'nav-about':    'Ũhoro',
    'nav-gallery':  'Maũndũ',
    'nav-contact':  'Ũrũgamano',

    'hero-title':    "Saluni ya Mama Shiro & Kinyozi",
    'hero-subtitle': 'Ũtũngati wa Nywele, Gũsuka na Kinyozi Wachina, Karatina.',
    'faq-text':      'Tũgũtumia mafuta na jeli ya bwega gũcunga nywele ciaku ciene na nguvu. Ũliza Mama Shiro mĩkaro yake!',
    'btn-call':      'Ithiria Mama Shiro',
    'btn-whatsapp':  'Ũrũgamano WhatsApp',

    'services-title':       'Ũtũngati Wetũ & Thogora',
    'services-subtitle':    'Thogora yothe nĩ ya Shilingi cia Kenya (Ksh)',
    'cat-wash':             'Gũsamba & Matibabu',
    'cat-plaiting':         'Gũsuka na Gũkũnja Nywele',
    'cat-weaves':           'Weave na Ũciaro wa Kahinda',
    'cat-kinyozi':          'Kinyozi (Mũcinjiri)',
    'svc-blowdry':          'Gũsamba na Gũkausha (Blow-dry)',
    'svc-blowdry-badge':    'Ĩnombaga Mũno!',
    'svc-palming':          'Palming (Kemikari)',
    'svc-gel':              'Jeli ya Nywele',
    'svc-gel-price':        'Ũliza Thogora',
    'svc-lines':            'Mistari (Lines)',
    'svc-lines-badge':      'Ũkĩrĩra Kũrĩra!',
    'svc-twist':            'Twist',
    'svc-rasta':            'Rasta',
    'svc-weaving':          'Weaving',
    'svc-bandika':          'Bandika',
    'svc-mwongezo':         'Mwongezo',
    'svc-bob':              'Bob',
    'svc-pussycat':         'Pussycat',
    'svc-ethiopianth':      'Ethiopianth',
    'svc-eth-badge':        '✦ Ũciaro wa Mama',
    'svc-children':         'Gũcinja Nywele cia Ciana',
    'svc-adults':           'Gũcinja Nywele cia Aandu',
    'kinyozi-note':         'Gũcinja gũkũ na gũtheru gũkũ familia yothe. Tũgaakĩhũthũra!',

    'about-title':  'Ũhũrũke na Mama Shiro',
    'bio-para-1':   'Mũingĩ wa mĩaka 35, Mama Shiro nĩ arĩ akĩhinga nywele na gũcuha andũ a Wachina ũrembe. Kuuma mitindo ya kahinda ta Bandika nginya ĩrĩa ĩnombaga mũno — Ethiopianth — arehaga ũũgi wa mĩaka na ũndũ wa ngoro kũrĩ mũhĩtia o wothe.',
    'bio-para-2':   'Hingo ũrĩ mũrĩa ũhakĩrĩte Lines mbere ya kũrĩra, kana ũhĩtia mtindo mwerũ — nĩ ũkaaribu kĩhĩ kĩa Mama Shiro.',
    'badge-exp':    'Ũũgi wa Mĩaka 35+',
    'badge-comm':   'Mũhĩtia wa Ũciũmbi',
    'badge-sig':    'Ũciaro: Ethiopianth',
    'badge-est':    'Kwambĩrĩria ~1989',

    'gallery-title':     'Maũndũ na Ũrĩmi Wetũ',
    'gallery-eth':       'Ũciaro wa Ethiopianth',
    'gallery-braiding':  'Gũsuka na Mistari',
    'gallery-weave':     'Weave na Bob',
    'gallery-twist':     'Twist na Rasta',
    'gallery-kinyozi':   'Gũcinja Kinyozi',
    'gallery-bandika':   'Bandika ya Kahinda',
    'video-title':       'Video (Ikũũka Hĩndĩ Ndeithia)',
    'video-fb':          'Reel ya Facebook',
    'video-tiktok':      'Reel ya TikTok',
    'video-tutorial':    'Ũhoro wa Mitindo',
    'video-coming-soon': '(Ikũũka)',

    'contact-title':   'Tũhũrũke na Ũrũgamano Wetũ',
    'loc-hours-title': 'Mahali & Nthaa',
    'location-text':   'Wachina, hakuhĩ na Gachuero & General China Secondary School, Karatina.',
    'hours-text':      'Nguo Ĩtambĩrĩra – Ĩtandũkũrũka: 11:00 AM – 7:00 PM. Mũthenya wothe!',
    'payment-text':    'Mbogo: Cash kana M-Pesa — Tũma kũrĩ: 0724 453312',
    'channels-title':  'Njira cia Ũrũgamano',
    'link-whatsapp':   'Ũrũgamano WhatsApp',
    'link-facebook':   'Mary Mathenge (Facebook)',
    'link-email':      'Barua Pepe',

    'footer-tagline':  'Ũbwega mũno Wachina — mĩaka 35+.',
    'footer-call':     'Ithiria',
    'footer-hours':    'Nguo Yothe: 11:00 AM – 7:00 PM | Cash & M-Pesa',
    'wa-tooltip':      'Ũrũgamano natũ!',
  },
};

/* ──────────────────────────────────────────────────────────────
   2. STATE — Single source of truth
   ────────────────────────────────────────────────────────────── */
const state = {
  lang:  localStorage.getItem('mama-shiro-lang')  || CONFIG.defaultLang,
  theme: localStorage.getItem('mama-shiro-theme') || CONFIG.defaultTheme,
};

/* ──────────────────────────────────────────────────────────────
   3. LANGUAGE ENGINE
   Walks the DOM and updates every [data-en], [data-sw], [data-ki]
   attribute. Also handles the JS dictionary for dynamic text.
   ────────────────────────────────────────────────────────────── */
function applyLanguage(lang) {
  /* Validate */
  if (!translations[lang]) lang = CONFIG.defaultLang;
  state.lang = lang;

  /* Persist to localStorage */
  localStorage.setItem('mama-shiro-lang', lang);

  /* Update <html lang> for accessibility */
  document.documentElement.setAttribute('lang', lang);

  /* ── Method 1: data-attribute driven (HTML elements) ── */
  const langAttrs = ['en', 'sw', 'ki'];
  langAttrs.forEach(l => {
    document.querySelectorAll(`[data-${l}]`).forEach(el => {
      if (lang === l) {
        /* Only update if NOT the heading/title (we handle those below) */
        const val = el.getAttribute(`data-${l}`);
        if (val) el.textContent = val;
      }
    });
  });

  /* ── Special case: elements with mixed HTML (strong tags, &amp;) ── */
  /* These are handled by the data-attributes in the HTML directly.
     For JS-driven dynamic content, we use the dictionary below. */

  /* Update WhatsApp tooltip */
  const waTooltip = document.querySelector('.whatsapp-float__tooltip');
  if (waTooltip) waTooltip.textContent = t('wa-tooltip');

  /* ── Update language button pressed states ── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  /* ── Announce language change to screen readers ── */
  announceToScreenReader(`Language changed to ${translations[lang]['lang-name']}`);
}

/**
 * Shorthand translator: t('key') → string in current language
 */
function t(key) {
  return (translations[state.lang] && translations[state.lang][key])
    ? translations[state.lang][key]
    : (translations['en'][key] || key);
}

/* ──────────────────────────────────────────────────────────────
   4. THEME ENGINE
   ────────────────────────────────────────────────────────────── */
function applyTheme(theme) {
  /* Validate */
  if (theme !== 'dark' && theme !== 'light') theme = CONFIG.defaultTheme;
  state.theme = theme;

  /* Apply to root element */
  document.documentElement.setAttribute('data-theme', theme);

  /* Sync the toggle checkbox */
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.checked = (theme === 'dark');
    toggle.setAttribute('aria-checked', String(theme === 'dark'));
  }

  /* Persist */
  localStorage.setItem('mama-shiro-theme', theme);

  /* Update particle colors to match theme */
  updateParticleColors(theme);

  announceToScreenReader(`Switched to ${theme} mode`);
}

function toggleTheme() {
  applyTheme(state.theme === 'light' ? 'dark' : 'light');
}

/* ──────────────────────────────────────────────────────────────
   5. PARTICLE CANVAS ENGINE
   Pure vanilla — no library, no external requests.
   Tuned to be gentle on 3G devices (low count, rAF throttled).
   ────────────────────────────────────────────────────────────── */
const ParticleEngine = (() => {
  let canvas, ctx, particles = [], animFrameId, lastTime = 0;
  const TARGET_FPS = 30; /* Cap at 30fps — reduces battery drain */
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  /* Mouse/touch position for interactivity */
  const mouse = { x: -9999, y: -9999, radius: 100 };

  function getColors(theme) {
    return theme === 'dark'
      ? { fill: 'rgba(201,150,42,', line: 'rgba(201,150,42,' }
      : { fill: 'rgba(44,24,16,',  line: 'rgba(44,24,16,' };
  }

  let colors = getColors(state.theme);

  function createParticle() {
    const cfg = CONFIG.particles;
    return {
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (cfg.maxSpeed - cfg.minSpeed) + cfg.minSpeed * (Math.random() > 0.5 ? 1 : -1),
      vy: (Math.random() - 0.5) * (cfg.maxSpeed - cfg.minSpeed) + cfg.minSpeed * (Math.random() > 0.5 ? 1 : -1),
      r:  Math.random() * (cfg.maxRadius - cfg.minRadius) + cfg.minRadius,
      opacity: Math.random() * 0.4 + 0.2,
    };
  }

  function initParticles() {
    particles = [];
    /* Reduce count on small/low-power screens */
    const count = window.innerWidth < 480
      ? Math.floor(CONFIG.particles.count * 0.5)
      : CONFIG.particles.count;

    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = colors.fill + p.opacity + ')';
    ctx.fill();
  }

  function connectParticles() {
    const dist = CONFIG.particles.connectDist;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < dist) {
          const opacity = (1 - d / dist) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = colors.line + opacity + ')';
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function updateParticle(p) {
    /* Mouse repulsion — gentle, interactive */
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (d < mouse.radius) {
      const force = (mouse.radius - d) / mouse.radius;
      p.vx += (dx / d) * force * 0.3;
      p.vy += (dy / d) * force * 0.3;
    }

    /* Speed cap */
    const maxSpd = CONFIG.particles.maxSpeed * 2;
    const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (spd > maxSpd) { p.vx = (p.vx / spd) * maxSpd; p.vy = (p.vy / spd) * maxSpd; }

    p.x += p.vx;
    p.y += p.vy;

    /* Wrap around edges */
    if (p.x < -p.r) p.x = canvas.width + p.r;
    if (p.x > canvas.width  + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = canvas.height + p.r;
    if (p.y > canvas.height + p.r) p.y = -p.r;

    /* Gradually return to base speed */
    p.vx *= 0.98;
    p.vy *= 0.98;
  }

  function loop(timestamp) {
    animFrameId = requestAnimationFrame(loop);

    const elapsed = timestamp - lastTime;
    if (elapsed < FRAME_INTERVAL) return; /* Throttle to TARGET_FPS */
    lastTime = timestamp - (elapsed % FRAME_INTERVAL);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      updateParticle(p);
      drawParticle(p);
    });

    connectParticles();
  }

  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();

    /* Debounced resize */
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 250);
    });

    /* Mouse interaction — desktop */
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    /* Touch interaction — mobile */
    window.addEventListener('touchmove', e => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    /* Stop animation when tab is hidden (battery saving) */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        lastTime = 0;
        animFrameId = requestAnimationFrame(loop);
      }
    });

    /* Respect prefers-reduced-motion */
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      canvas.style.display = 'none';
      return;
    }

    animFrameId = requestAnimationFrame(loop);
  }

  function updateColors(theme) {
    colors = getColors(theme);
  }

  return { init, updateColors };
})();

function updateParticleColors(theme) {
  ParticleEngine.updateColors(theme);
}

/* ──────────────────────────────────────────────────────────────
   6. INTERSECTION OBSERVER — scroll-in animations
   ────────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  /* Skip if browser doesn't support IO or user prefers no motion */
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); /* Fire once — performance */
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px', /* Trigger slightly before fully visible */
    }
  );

  /* Observe all reveal elements */
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/* ──────────────────────────────────────────────────────────────
   7. NAVBAR — scroll shadow + active link highlight
   ────────────────────────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        /* Add shadow when scrolled */
        nav.classList.toggle('scrolled', window.scrollY > 10);

        /* Highlight current section in nav */
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  let currentSection = '';
  const scrollPos = window.scrollY + 120; /* Offset for sticky nav height */

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active-section', href === currentSection);
  });
}

/* ──────────────────────────────────────────────────────────────
   8. SCROLL-TO-TOP BUTTON
   ────────────────────────────────────────────────────────────── */
function initScrollTopButton() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  /* Show button after scrolling 300px */
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ──────────────────────────────────────────────────────────────
   9. FOOTER — Dynamic year + architect easter egg tooltip
   ────────────────────────────────────────────────────────────── */
function initFooter() {
  /* Auto-update copyright year */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Architect name — keyboard-accessible tooltip behavior */
  const architectName = document.querySelector('.architect-name');
  if (architectName) {
    architectName.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        /* On keyboard activation, briefly reveal the whisper */
        const whisper = document.querySelector('.architect-whisper');
        if (whisper) {
          whisper.style.color = 'rgba(201,150,42,0.7)';
          whisper.style.transition = 'color 0.8s ease';
          setTimeout(() => {
            whisper.style.color = '';
          }, 3000);
        }
      }
    });
  }
}

/* ──────────────────────────────────────────────────────────────
   10. REVEAL CLASSES — Add them to sections dynamically
   ────────────────────────────────────────────────────────────── */
function setupRevealClasses() {
  /* Add reveal class to service cards (stagger effect) */
  const serviceCards = document.querySelector('.row.g-4');
  if (serviceCards) serviceCards.classList.add('reveal-stagger');

  /* Reveal sections on scroll */
  const reveals = [
    '.service-card',
    '.mama-avatar-wrap',
    '.mama-bio',
    '.gallery-grid',
    '.video-grid',
    '.contact-card',
    '.faq-banner',
  ];

  reveals.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   11. SCREEN READER ANNOUNCEMENTS
   Polite live region for dynamic changes.
   ────────────────────────────────────────────────────────────── */
let srLiveRegion = null;

function announceToScreenReader(message) {
  if (!srLiveRegion) {
    srLiveRegion = document.createElement('div');
    srLiveRegion.setAttribute('aria-live', 'polite');
    srLiveRegion.setAttribute('aria-atomic', 'true');
    srLiveRegion.className = 'visually-hidden';
    document.body.appendChild(srLiveRegion);
  }
  /* Clear first, then set — ensures re-announcement */
  srLiveRegion.textContent = '';
  setTimeout(() => { srLiveRegion.textContent = message; }, 50);
}

/* ──────────────────────────────────────────────────────────────
   12. EVENT BINDINGS
   ────────────────────────────────────────────────────────────── */
function bindEvents() {

  /* Language switcher buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  /* Theme toggle */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }

  /* Smooth close mobile nav on link click */
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        /* Bootstrap collapse API */
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* Gallery placeholder — open alert with placeholder message */
  document.querySelectorAll('.gallery-placeholder').forEach(item => {
    item.addEventListener('click', () => {
      const labelEl = item.querySelector('span');
      const label   = labelEl ? labelEl.textContent : 'photo';
      /* In production: open a lightbox here */
      announceToScreenReader(`${label} — full photo coming soon`);
    });

    /* Keyboard accessible */
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   13. INITIALISATION — runs after DOM is fully parsed
   ────────────────────────────────────────────────────────────── */
function init() {
  /* Apply saved preferences BEFORE paint to avoid flash */
  applyTheme(state.theme);
  applyLanguage(state.lang);

  /* Setup */
  setupRevealClasses();
  initScrollAnimations();
  initNavbar();
  initScrollTopButton();
  initFooter();
  bindEvents();

  /* Start particle canvas LAST (not critical for LCP) */
  ParticleEngine.init();

  console.log(
    '%c✦ Architected by Clement Wambu Gakuha ✦',
    'color: #c9962a; font-size: 14px; font-weight: bold; padding: 8px 16px; background: #2c1810; border-radius: 4px;'
  );
  console.log(
    '%c"One\'s reality is another\'s illusion. The architect always holds the blueprint."',
    'color: rgba(201,150,42,0.6); font-size: 11px; font-style: italic;'
  );
}

/* Run after DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  /* DOM already parsed (script loaded with defer) */
  init();
}