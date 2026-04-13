# KaratCash — Sitio Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the KaratCash website — a 5-page Spanish-language site for a mobile gold buying service in Phoenix, AZ, with a live gold price calculator, GSAP animations, and multi-channel contact options.

**Architecture:** Astro static site with island architecture for the gold calculator (client-side JS). CSS custom variables for the navy/gold design system. GSAP for scroll-triggered animations. Vercel serverless function for gold price API caching. All content in Spanish.

**Tech Stack:** Astro 5, CSS custom properties, GSAP 3 + ScrollTrigger, Vanilla JS, Vercel (hosting + serverless), GoldAPI.io

**Spec:** `docs/superpowers/specs/2026-04-12-karatcash-lanzamiento-design.md`

---

## Pre-requisite: Design in Stitch

**Before starting any code task**, use the `stitch-skill` to design all 5 pages + global components in Stitch with premium references. The Stitch output will inform exact layouts, spacing, typography choice, and visual details for each page.

Invoke: `Skill("stitch-skill")` with the spec as context.

Once Stitch designs are approved, proceed with the tasks below. Adapt layouts, spacing, and typography to match the Stitch output — the tasks below define structure and functionality, Stitch defines the visual polish.

---

## File Structure

```
karatcash/
├── astro.config.mjs              # Astro config with Vercel adapter
├── package.json
├── tsconfig.json
├── vercel.json                    # Vercel config (redirects, headers)
├── public/
│   ├── favicon.svg                # KC logo as favicon
│   ├── logo.webp                  # Existing KC logo
│   ├── og-image.jpg               # Open Graph image for social sharing
│   └── images/                    # AI-generated images (oro, texturas)
├── src/
│   ├── layouts/
│   │   └── Base.astro             # Base HTML layout (head, meta, tracking scripts)
│   ├── components/
│   │   ├── Nav.astro              # Navigation bar (logo + links + CTA)
│   │   ├── Footer.astro           # Footer dark (links, contacto, ciudades, legal)
│   │   ├── WhatsAppButton.astro   # Floating WhatsApp sticky button
│   │   ├── HeroHome.astro         # Home hero section (dark)
│   │   ├── ComoFunciona.astro     # 3-step process cards
│   │   ├── PorQueKaratCash.astro  # Diferenciadores con iconos
│   │   ├── Cobertura.astro        # Ciudades servidas
│   │   ├── Testimonios.astro      # Testimonios placeholder
│   │   ├── CtaFinal.astro         # CTA section con canales de contacto
│   │   ├── FaqAccordion.astro     # FAQ expandible
│   │   ├── GoldCalculator.astro   # Calculadora de oro (client-side island)
│   │   └── ContactForm.astro      # Formulario de contacto
│   ├── styles/
│   │   ├── global.css             # Reset, variables CSS, tipografía, utilidades
│   │   └── animations.css         # Clases base para GSAP targets
│   ├── scripts/
│   │   ├── gsap-init.ts           # GSAP + ScrollTrigger setup y animaciones globales
│   │   ├── calculator.ts          # Lógica de la calculadora (fetch precio, cálculo)
│   │   └── form.ts                # Validación y envío del formulario de contacto
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── como-funciona.astro    # Cómo Funciona
│   │   ├── calculadora.astro      # Calculadora de Oro
│   │   ├── nosotros.astro         # Sobre Nosotros
│   │   └── contacto.astro         # Contacto
│   └── data/
│       ├── ciudades.ts            # Lista de ciudades del Phoenix metro
│       └── faq.ts                 # Preguntas frecuentes
└── api/
    └── gold-price.ts              # Vercel serverless function — cached gold price
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vercel.json`, `public/favicon.svg`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/santiagofigueroa/Proyectos/KaratCash
git init
```

- [ ] **Step 2: Create Astro project**

```bash
cd /Users/santiagofigueroa/Proyectos/KaratCash
npm create astro@latest karatcash -- --template minimal --no-install --no-git
```

Move contents from `karatcash/` subfolder to root if needed, or work inside `karatcash/`.

- [ ] **Step 3: Install dependencies**

```bash
cd /Users/santiagofigueroa/Proyectos/KaratCash/karatcash
npm install
npm install gsap @astrojs/vercel
```

- [ ] **Step 4: Configure Astro for Vercel**

Update `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://karatcash.net',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
});
```

- [ ] **Step 5: Create vercel.json**

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=900, stale-while-revalidate=60" }
      ]
    }
  ]
}
```

- [ ] **Step 6: Create .gitignore**

```
node_modules/
dist/
.astro/
.vercel/
.env
.DS_Store
.superpowers/
```

- [ ] **Step 7: Copy logo to public/**

```bash
cp /Users/santiagofigueroa/Proyectos/KaratCash/"karatcash logo.webp" /Users/santiagofigueroa/Proyectos/KaratCash/karatcash/public/logo.webp
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Astro dev server running on localhost:4321

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Vercel adapter"
```

---

### Task 2: Design System — Global CSS

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/animations.css`

- [ ] **Step 1: Create global.css with CSS variables and base styles**

```css
/* src/styles/global.css */

/* ── RESET ── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ── DESIGN TOKENS ── */
:root {
  /* Colors */
  --navy-deep: #1A1F2B;
  --navy: #2D3442;
  --navy-light: #3D4556;
  --gold: #C5A55A;
  --gold-light: #D4B96A;
  --gold-pale: #F5EFD8;
  --gold-dark: #9E8444;
  --white: #FAFAF8;
  --gray-100: #F0EFED;
  --gray-200: #E2E1DE;
  --gray-300: #C8C7C3;
  --gray-400: #9E9D99;
  --gray-500: #6E6D69;
  --gray-600: #4A4944;
  --green: #2D8F5E;
  --green-bg: #E8F5EE;
  --red: #C0392B;
  --blue: #2B6CB0;
  --blue-bg: #EBF4FF;

  /* Typography — update font-family after Stitch decision */
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* Sizing */
  --max-width: 1100px;
  --nav-height: 64px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.1);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  font-family: var(--font-body);
  color: var(--navy);
  background: var(--white);
  line-height: 1.7;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

/* ── TYPOGRAPHY ── */
h1, h2, h3, h4 {
  line-height: 1.2;
  font-weight: 800;
}

h1 { font-size: clamp(2rem, 5vw, 3.2rem); }
h2 { font-size: clamp(1.5rem, 3.5vw, 2.2rem); }
h3 { font-size: clamp(1.1rem, 2vw, 1.4rem); }

/* ── LAYOUT UTILITIES ── */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

/* ── SECTION VARIANTS ── */
.section {
  padding: var(--space-4xl) 0;
}

.section--dark {
  background: var(--navy);
  color: var(--white);
}

.section--light {
  background: var(--white);
  color: var(--navy);
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  background: var(--gold);
  color: var(--navy-deep);
}

.btn--primary:hover {
  box-shadow: 0 4px 20px rgba(197, 165, 90, 0.3);
}

.btn--outline {
  border: 1.5px solid var(--gold);
  color: var(--gold);
  background: transparent;
}

.btn--outline:hover {
  background: rgba(197, 165, 90, 0.08);
}

.btn--dark {
  background: var(--navy);
  color: var(--white);
}

/* ── BADGE ── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 600;
}

.badge--green { background: var(--green-bg); color: var(--green); }
.badge--blue { background: var(--blue-bg); color: var(--blue); }
.badge--gold { background: var(--gold-pale); color: var(--gold-dark); }

/* ── LABEL ── */
.label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
}

/* ── CARD ── */
.card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* ── WHATSAPP FLOAT ── */
.whatsapp-float {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  z-index: 900;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
  transition: transform var(--transition-fast);
}

.whatsapp-float:hover {
  transform: scale(1.08);
}

.whatsapp-float svg {
  width: 28px;
  height: 28px;
  fill: white;
}
```

- [ ] **Step 2: Create animations.css**

```css
/* src/styles/animations.css */

/* Base state for GSAP-animated elements — hidden until GSAP reveals them */
.gs-reveal {
  opacity: 0;
  transform: translateY(30px);
}

.gs-reveal-left {
  opacity: 0;
  transform: translateX(-40px);
}

.gs-reveal-right {
  opacity: 0;
  transform: translateX(40px);
}

.gs-reveal-scale {
  opacity: 0;
  transform: scale(0.95);
}

/* Fallback for no-JS: show everything */
@media (prefers-reduced-motion: reduce) {
  .gs-reveal,
  .gs-reveal-left,
  .gs-reveal-right,
  .gs-reveal-scale {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/
git commit -m "feat: add design system CSS with tokens and animation classes"
```

---

### Task 3: Base Layout + Nav + Footer + WhatsApp Button

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/WhatsAppButton.astro`
- Create: `src/data/ciudades.ts`

- [ ] **Step 1: Create ciudades data file**

```ts
// src/data/ciudades.ts
export const ciudades = [
  'Phoenix', 'Tempe', 'Mesa', 'Scottsdale', 'Chandler',
  'Gilbert', 'Glendale', 'Peoria', 'Surprise', 'Avondale',
  'Goodyear', 'Buckeye', 'Laveen', 'Ahwatukee', 'Cave Creek',
] as const;
```

- [ ] **Step 2: Create Nav.astro**

```astro
---
// src/components/Nav.astro
const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Cómo Funciona', href: '/como-funciona' },
  { label: 'Calculadora', href: '/calculadora' },
  { label: 'Nosotros', href: '/nosotros' },
];

const currentPath = Astro.url.pathname;
---

<nav class="nav" id="nav">
  <div class="nav__inner container">
    <a href="/" class="nav__brand">
      <img src="/logo.webp" alt="KaratCash" class="nav__logo" width="40" height="40" />
      <span class="nav__name">KARAT CASH</span>
    </a>

    <div class="nav__links" id="nav-links">
      {navLinks.map(link => (
        <a
          href={link.href}
          class:list={['nav__link', { 'nav__link--active': currentPath === link.href }]}
        >
          {link.label}
        </a>
      ))}
      <a href="/contacto" class="btn btn--primary nav__cta">Vender mi oro</a>
    </div>

    <button class="nav__toggle" id="nav-toggle" aria-label="Menú">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(26, 31, 43, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(197, 165, 90, 0.12);
    height: var(--nav-height);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .nav__brand {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .nav__logo {
    border-radius: 4px;
  }

  .nav__name {
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--gold);
    letter-spacing: 0.5px;
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .nav__link {
    color: var(--gray-300);
    font-size: 0.85rem;
    font-weight: 500;
    transition: color var(--transition-fast);
  }

  .nav__link:hover,
  .nav__link--active {
    color: var(--gold);
  }

  .nav__cta {
    padding: 0.5rem 1.2rem;
    font-size: 0.82rem;
  }

  .nav__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: var(--space-sm);
  }

  .nav__toggle span {
    width: 22px;
    height: 2px;
    background: var(--gold);
    transition: transform var(--transition-base);
  }

  /* Mobile */
  @media (max-width: 768px) {
    .nav__toggle { display: flex; }

    .nav__links {
      position: fixed;
      top: var(--nav-height);
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--navy-deep);
      flex-direction: column;
      padding: var(--space-2xl);
      gap: var(--space-xl);
      transform: translateX(100%);
      transition: transform var(--transition-base);
    }

    .nav__links.is-open {
      transform: translateX(0);
    }

    .nav__link {
      font-size: 1.1rem;
    }
  }
</style>

<script>
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle?.addEventListener('click', () => {
    links?.classList.toggle('is-open');
  });

  // Close menu on link click (mobile)
  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
    });
  });
</script>
```

- [ ] **Step 3: Create Footer.astro**

```astro
---
// src/components/Footer.astro
import { ciudades } from '../data/ciudades';

const year = new Date().getFullYear();
---

<footer class="footer section--dark">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="/logo.webp" alt="KaratCash" width="48" height="48" />
        <p class="footer__tagline">Compramos tu oro a precio justo, nos encontramos contigo y te pagamos al momento.</p>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Navegación</h4>
        <a href="/">Inicio</a>
        <a href="/como-funciona">Cómo Funciona</a>
        <a href="/calculadora">Calculadora de Oro</a>
        <a href="/nosotros">Sobre Nosotros</a>
        <a href="/contacto">Contacto</a>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Contacto</h4>
        <a href="https://wa.me/16231234567" target="_blank" rel="noopener">WhatsApp</a>
        <a href="tel:+16231234567">Llamar ahora</a>
        <a href="/contacto">Formulario de contacto</a>
      </div>

      <div class="footer__col">
        <h4 class="footer__heading">Áreas de servicio</h4>
        <p class="footer__cities">{ciudades.join(' · ')}</p>
      </div>
    </div>

    <div class="footer__bottom">
      <p>&copy; {year} KaratCash. Todos los derechos reservados.</p>
      <p class="footer__disclaimer">KaratCash es un servicio de compra de oro. Los precios mostrados son estimados basados en el precio spot internacional y pueden variar. El valor final se confirma en persona.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: var(--space-3xl) 0 var(--space-xl);
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: var(--space-2xl);
    padding-bottom: var(--space-2xl);
    border-bottom: 1px solid rgba(197, 165, 90, 0.12);
  }

  .footer__brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .footer__tagline {
    color: var(--gray-400);
    font-size: 0.88rem;
    line-height: 1.6;
    max-width: 280px;
  }

  .footer__heading {
    color: var(--gold);
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: var(--space-md);
  }

  .footer__col {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .footer__col a {
    color: var(--gray-400);
    font-size: 0.85rem;
    transition: color var(--transition-fast);
  }

  .footer__col a:hover {
    color: var(--gold);
  }

  .footer__cities {
    color: var(--gray-400);
    font-size: 0.8rem;
    line-height: 1.8;
  }

  .footer__bottom {
    padding-top: var(--space-xl);
    text-align: center;
    color: var(--gray-500);
    font-size: 0.78rem;
  }

  .footer__disclaimer {
    margin-top: var(--space-sm);
    font-size: 0.7rem;
    color: var(--gray-500);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }
  }
</style>
```

- [ ] **Step 4: Create WhatsAppButton.astro**

```astro
---
// src/components/WhatsAppButton.astro
const whatsappNumber = '16231234567'; // UPDATE: número real
const message = encodeURIComponent('Hola, me interesa vender mi oro. ¿Me pueden dar más información?');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
---

<a href={whatsappUrl} target="_blank" rel="noopener" class="whatsapp-float" aria-label="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

- [ ] **Step 5: Create Base.astro layout**

```astro
---
// src/layouts/Base.astro
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';
import '../styles/global.css';
import '../styles/animations.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = '/og-image.jpg' } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | KaratCash</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:title" content={`${title} | KaratCash`} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_US" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Font — update after Stitch decision -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Meta Pixel — uncomment and add real ID when ready -->
  <!--
  <script>
    !function(f,b,e,v,n,t,s){...}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
  -->

  <!-- Google Analytics 4 — uncomment and add real ID when ready -->
  <!--
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  -->
</head>
<body>
  <Nav />
  <main>
    <slot />
  </main>
  <Footer />
  <WhatsAppButton />

  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
</body>
</html>
```

- [ ] **Step 6: Create a minimal index.astro to verify layout works**

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
---

<Base title="Compra de Oro en Phoenix" description="Compramos tu oro a precio justo. Nos encontramos contigo en un lugar seguro y te pagamos al momento. Servicio en español en todo el Valle de Phoenix.">
  <section class="section section--dark" style="min-height: 60vh; display: flex; align-items: center; justify-content: center; padding-top: calc(var(--nav-height) + var(--space-3xl));">
    <div class="container" style="text-align: center;">
      <h1 style="color: var(--white);">KaratCash — En construcción</h1>
      <p style="color: var(--gray-300); margin-top: var(--space-md);">Próximamente</p>
    </div>
  </section>
</Base>
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`
Expected: Page loads with nav, footer, WhatsApp button, placeholder content. Nav is fixed, mobile menu works.

- [ ] **Step 8: Commit**

```bash
git add src/
git commit -m "feat: add base layout with Nav, Footer, WhatsApp button"
```

---

### Task 4: Gold Price API (Serverless Function with Caching)

**Files:**
- Create: `api/gold-price.ts`

- [ ] **Step 1: Create the serverless function**

```ts
// api/gold-price.ts
// Vercel serverless function — caches gold price for 15 minutes

interface GoldPriceResponse {
  price_per_oz: number;
  price_per_gram: number;
  currency: string;
  timestamp: number;
}

interface CachedPrice {
  data: GoldPriceResponse;
  fetchedAt: number;
}

let cache: CachedPrice | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

async function fetchGoldPrice(): Promise<GoldPriceResponse> {
  const apiKey = process.env.GOLDAPI_KEY;

  if (!apiKey) {
    // Fallback: return a reasonable estimate if no API key
    return {
      price_per_oz: 3400,
      price_per_gram: 109.3,
      currency: 'USD',
      timestamp: Date.now(),
    };
  }

  const res = await fetch('https://www.goldapi.io/api/XAU/USD', {
    headers: { 'x-access-token': apiKey },
  });

  if (!res.ok) {
    throw new Error(`GoldAPI error: ${res.status}`);
  }

  const data = await res.json();

  return {
    price_per_oz: data.price,
    price_per_gram: data.price_gram,
    currency: 'USD',
    timestamp: Date.now(),
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=60');

  try {
    const now = Date.now();

    if (cache && (now - cache.fetchedAt) < CACHE_TTL_MS) {
      return res.status(200).json(cache.data);
    }

    const freshData = await fetchGoldPrice();
    cache = { data: freshData, fetchedAt: now };

    return res.status(200).json(freshData);
  } catch (error) {
    // Return cached data even if stale, or fallback
    if (cache) {
      return res.status(200).json(cache.data);
    }

    return res.status(200).json({
      price_per_oz: 3400,
      price_per_gram: 109.3,
      currency: 'USD',
      timestamp: Date.now(),
    });
  }
}
```

- [ ] **Step 2: Create .env.example**

```
GOLDAPI_KEY=your_goldapi_key_here
```

- [ ] **Step 3: Commit**

```bash
git add api/ .env.example
git commit -m "feat: add gold price API with 15-min server-side caching"
```

---

### Task 5: Home Page — All Sections

**Files:**
- Create: `src/components/HeroHome.astro`
- Create: `src/components/ComoFunciona.astro`
- Create: `src/components/PorQueKaratCash.astro`
- Create: `src/components/Cobertura.astro`
- Create: `src/components/Testimonios.astro`
- Create: `src/components/CtaFinal.astro`
- Modify: `src/pages/index.astro`

This is a large task. Build each component individually, then assemble in index.astro. The exact layout, spacing, and visual details should follow the Stitch designs — the code below provides the structural HTML/CSS foundation.

- [ ] **Step 1: Create HeroHome.astro**

Dark hero section with headline, subtitle, 2 CTAs, and trust badges. Content from spec section 2 "Mensajes clave".

```astro
---
// src/components/HeroHome.astro
---

<section class="hero section--dark">
  <div class="container hero__inner">
    <span class="label">● Compra de oro en todo Phoenix</span>
    <h1 class="hero__title">
      El precio del oro está en
      <span class="hero__gold">máximos históricos</span>
    </h1>
    <p class="hero__subtitle">
      Ese anillo, esa cadena, esos aretes que no usas — hoy valen más que nunca.
      Te mostramos cuánto y te pagamos al momento.
    </p>
    <div class="hero__actions">
      <a href="/contacto" class="btn btn--primary">Obtén tu cotización gratis →</a>
      <a href="/calculadora" class="btn btn--outline">Ver precio del oro hoy</a>
    </div>
    <div class="hero__trust">
      <div class="hero__trust-item">
        <span class="hero__check">✓</span> Pago inmediato
      </div>
      <div class="hero__trust-item">
        <span class="hero__check">✓</span> Lugar público y seguro
      </div>
      <div class="hero__trust-item">
        <span class="hero__check">✓</span> Todo el Valle de Phoenix
      </div>
      <div class="hero__trust-item">
        <span class="hero__check">✓</span> Proceso 100% transparente
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: calc(var(--nav-height) + var(--space-4xl)) 0 var(--space-4xl);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* Subtle gold radial glow behind heading */
  .hero::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(197,165,90,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero__inner {
    position: relative;
    z-index: 1;
  }

  .hero__title {
    color: var(--white);
    margin-top: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .hero__gold {
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero__subtitle {
    color: var(--gray-300);
    font-size: 1.05rem;
    max-width: 520px;
    margin: 0 auto var(--space-xl);
    line-height: 1.7;
  }

  .hero__actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero__trust {
    display: flex;
    gap: var(--space-xl);
    justify-content: center;
    flex-wrap: wrap;
    margin-top: var(--space-2xl);
    padding-top: var(--space-lg);
    border-top: 1px solid rgba(197,165,90,0.12);
  }

  .hero__trust-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--gray-400);
    font-size: 0.82rem;
    font-weight: 500;
  }

  .hero__check {
    color: var(--green);
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .hero__trust {
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
    }
  }
</style>
```

- [ ] **Step 2: Create ComoFunciona.astro**

3-step process cards for the home page.

```astro
---
// src/components/ComoFunciona.astro
const pasos = [
  {
    numero: '1',
    titulo: 'Contáctanos',
    descripcion: 'Escríbenos por WhatsApp, llámanos o llena el formulario. Cuéntanos qué piezas tienes.',
    tags: [
      { label: 'WhatsApp', color: 'green' },
      { label: 'Llamada', color: 'blue' },
      { label: 'Formulario', color: 'gold' },
    ],
  },
  {
    numero: '2',
    titulo: 'Nos encontramos',
    descripcion: 'Coordinamos un lugar público y seguro cerca de ti. Evaluamos tus piezas frente a ti: peso, pureza, precio real.',
    tags: [
      { label: 'Báscula certificada', color: 'green' },
      { label: 'Test de pureza', color: 'green' },
    ],
  },
  {
    numero: '3',
    titulo: 'Cobra al instante',
    descripcion: 'Si aceptas la oferta, te pagamos ahí mismo. Efectivo o transferencia. Sin letras chiquitas, sin sorpresas.',
    tags: [
      { label: 'Efectivo', color: 'green' },
      { label: 'Transferencia', color: 'blue' },
    ],
  },
];
---

<section class="section section--light" id="como-funciona-preview">
  <div class="container">
    <div class="section-header gs-reveal">
      <span class="label">● Así de fácil</span>
      <h2>Tres pasos, cero complicaciones</h2>
    </div>
    <div class="pasos-grid">
      {pasos.map((paso, i) => (
        <div class="paso-card card gs-reveal" style={`--delay: ${i * 0.15}s`}>
          <div class="paso-card__numero">{paso.numero}</div>
          <h3 class="paso-card__titulo">{paso.titulo}</h3>
          <p class="paso-card__desc">{paso.descripcion}</p>
          <div class="paso-card__tags">
            {paso.tags.map(tag => (
              <span class={`badge badge--${tag.color}`}>{tag.label}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .section-header {
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .section-header h2 {
    margin-top: var(--space-sm);
  }

  .pasos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .paso-card__numero {
    width: 40px;
    height: 40px;
    background: var(--navy);
    color: var(--gold);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: var(--space-md);
  }

  .paso-card__titulo {
    margin-bottom: var(--space-sm);
  }

  .paso-card__desc {
    color: var(--gray-500);
    font-size: 0.88rem;
    line-height: 1.7;
  }

  .paso-card__tags {
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    margin-top: var(--space-md);
  }

  @media (max-width: 768px) {
    .pasos-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 3: Create PorQueKaratCash.astro**

Diferenciadores section with icons.

```astro
---
// src/components/PorQueKaratCash.astro
const diferenciadores = [
  {
    icon: '⚖️',
    titulo: 'Precio justo y transparente',
    descripcion: 'Te mostramos el precio spot en vivo y te explicamos cómo calculamos tu oferta. Sin trucos.',
  },
  {
    icon: '🗣️',
    titulo: '100% en español',
    descripcion: 'Todo el proceso en tu idioma. Sin barreras, sin confusiones, sin letra chiquita en inglés.',
  },
  {
    icon: '📍',
    titulo: 'Nos encontramos contigo',
    descripcion: 'No tienes que ir a ninguna tienda. Coordinamos un lugar público y seguro cerca de ti.',
  },
  {
    icon: '💰',
    titulo: 'Pago inmediato',
    descripcion: 'Aceptas la oferta y te pagamos ahí mismo. Efectivo o transferencia. Sin esperas.',
  },
  {
    icon: '🔬',
    titulo: 'Evaluación profesional',
    descripcion: 'Báscula certificada y test de pureza frente a ti. Ves todo el proceso con tus propios ojos.',
  },
  {
    icon: '🛡️',
    titulo: 'Seguro y sin compromiso',
    descripcion: 'Nos reunimos en lugares públicos seguros. Si no te convence la oferta, no hay problema.',
  },
];
---

<section class="section section--dark" id="por-que">
  <div class="container">
    <div class="section-header gs-reveal" style="text-align: center;">
      <span class="label">● ¿Por qué KaratCash?</span>
      <h2 style="color: var(--white);">La forma más confiable de vender tu oro</h2>
    </div>
    <div class="diferenciadores-grid">
      {diferenciadores.map((d, i) => (
        <div class="dif-card gs-reveal" style={`--delay: ${i * 0.1}s`}>
          <span class="dif-card__icon">{d.icon}</span>
          <h3 class="dif-card__titulo">{d.titulo}</h3>
          <p class="dif-card__desc">{d.descripcion}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .diferenciadores-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .dif-card {
    padding: var(--space-xl);
    border: 1px solid rgba(197,165,90,0.12);
    border-radius: var(--radius-lg);
    background: rgba(255,255,255,0.03);
    transition: border-color var(--transition-base);
  }

  .dif-card:hover {
    border-color: rgba(197,165,90,0.3);
  }

  .dif-card__icon {
    font-size: 1.8rem;
    display: block;
    margin-bottom: var(--space-md);
  }

  .dif-card__titulo {
    color: var(--white);
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: var(--space-sm);
  }

  .dif-card__desc {
    color: var(--gray-400);
    font-size: 0.85rem;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .diferenciadores-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Create Cobertura.astro**

```astro
---
// src/components/Cobertura.astro
import { ciudades } from '../data/ciudades';
---

<section class="section section--light" id="cobertura">
  <div class="container">
    <div class="section-header gs-reveal" style="text-align: center;">
      <span class="label" style="color: var(--gold);">● Área de servicio</span>
      <h2>Servimos todo el Valle de Phoenix</h2>
      <p style="color: var(--gray-500); margin-top: var(--space-sm); max-width: 500px; margin-left: auto; margin-right: auto;">
        Nos desplazamos a cualquier punto del área metropolitana de Phoenix para reunirnos contigo.
      </p>
    </div>
    <div class="ciudades-wrap gs-reveal">
      {ciudades.map(ciudad => (
        <span class="ciudad-tag">{ciudad}</span>
      ))}
    </div>
  </div>
</section>

<style>
  .ciudades-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-content: center;
    max-width: 700px;
    margin: 0 auto;
  }

  .ciudad-tag {
    background: var(--gray-100);
    color: var(--navy);
    padding: 0.4rem 1rem;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--gray-200);
  }
</style>
```

- [ ] **Step 5: Create Testimonios.astro (placeholder)**

```astro
---
// src/components/Testimonios.astro
// Placeholder until real testimonials are collected
const testimonios = [
  {
    texto: 'Próximamente testimonios de nuestros clientes.',
    nombre: '',
    ubicacion: '',
  },
];
const hasReal = false;
---

{hasReal && (
  <section class="section section--light" id="testimonios">
    <div class="container">
      <div class="section-header gs-reveal" style="text-align: center;">
        <span class="label" style="color: var(--gold);">● Lo que dicen nuestros clientes</span>
        <h2>Experiencias reales</h2>
      </div>
      <!-- Render real testimonials here when available -->
    </div>
  </section>
)}
```

- [ ] **Step 6: Create CtaFinal.astro**

```astro
---
// src/components/CtaFinal.astro
const whatsappUrl = 'https://wa.me/16231234567?text=' + encodeURIComponent('Hola, quiero vender mi oro');
---

<section class="section section--dark cta-final" id="cta">
  <div class="container cta-final__inner gs-reveal">
    <h2 class="cta-final__title" style="color: var(--white);">
      ¿Tienes oro que no usas?<br />
      <span style="color: var(--gold);">Hoy vale más que nunca.</span>
    </h2>
    <p class="cta-final__desc">
      Contáctanos sin compromiso. Te decimos cuánto vale y tú decides.
    </p>
    <div class="cta-final__actions">
      <a href={whatsappUrl} target="_blank" rel="noopener" class="btn btn--primary">
        WhatsApp →
      </a>
      <a href="tel:+16231234567" class="btn btn--outline">
        Llamar ahora
      </a>
      <a href="/contacto" class="btn btn--outline">
        Formulario
      </a>
    </div>
  </div>
</section>

<style>
  .cta-final {
    text-align: center;
  }

  .cta-final__desc {
    color: var(--gray-300);
    font-size: 1.05rem;
    margin: var(--space-md) auto var(--space-xl);
    max-width: 450px;
  }

  .cta-final__actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
```

- [ ] **Step 7: Assemble index.astro**

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import HeroHome from '../components/HeroHome.astro';
import ComoFunciona from '../components/ComoFunciona.astro';
import GoldCalculator from '../components/GoldCalculator.astro';
import PorQueKaratCash from '../components/PorQueKaratCash.astro';
import Cobertura from '../components/Cobertura.astro';
import Testimonios from '../components/Testimonios.astro';
import CtaFinal from '../components/CtaFinal.astro';
---

<Base
  title="Compra de Oro en Phoenix"
  description="Compramos tu oro a precio justo. Nos encontramos contigo en un lugar seguro y te pagamos al momento. Servicio en español en todo el Valle de Phoenix."
>
  <HeroHome />
  <ComoFunciona />
  <!-- GoldCalculator se crea en Task 7 — dejar comentado hasta entonces -->
  <!-- <GoldCalculator /> -->
  <PorQueKaratCash />
  <Cobertura />
  <Testimonios />
  <CtaFinal />
</Base>
```

- [ ] **Step 8: Verify in browser**

Run: `npm run dev`
Expected: Full home page renders with all sections, dark/light alternation, mobile responsive. GoldCalculator is commented out (comes in Task 7).

- [ ] **Step 9: Commit**

```bash
git add src/components/ src/pages/index.astro src/data/
git commit -m "feat: build Home page with all sections"
```

---

### Task 6: Cómo Funciona Page

**Files:**
- Create: `src/data/faq.ts`
- Create: `src/components/FaqAccordion.astro`
- Create: `src/pages/como-funciona.astro`

- [ ] **Step 1: Create FAQ data**

```ts
// src/data/faq.ts
export const faqs = [
  {
    pregunta: '¿Qué tipos de oro compran?',
    respuesta: 'Compramos joyería de oro de 10k, 14k, 18k y 24k. Esto incluye anillos, cadenas, pulseras, aretes, dijes, y oro dental. También compramos monedas de oro y lingotes.',
  },
  {
    pregunta: '¿Cómo calculan el precio?',
    respuesta: 'Usamos el precio spot internacional del oro (actualizado en tiempo real), multiplicado por el peso de tu pieza y el porcentaje de pureza según los kilates. Te mostramos todo el cálculo frente a ti para que veas exactamente cómo llegamos al número.',
  },
  {
    pregunta: '¿Dónde nos reunimos?',
    respuesta: 'Coordinamos un lugar público y seguro cerca de ti en el área de Phoenix. Puede ser un café, un lobby, o cualquier lugar donde ambos nos sintamos cómodos.',
  },
  {
    pregunta: '¿Cuánto tarda el proceso?',
    respuesta: 'La evaluación completa toma entre 10 y 20 minutos dependiendo de cuántas piezas tengas. Si aceptas la oferta, el pago es inmediato.',
  },
  {
    pregunta: '¿Cómo me pagan?',
    respuesta: 'Puedes elegir entre efectivo o transferencia electrónica. El pago se realiza al momento, no hay esperas.',
  },
  {
    pregunta: '¿Qué pasa si no acepto la oferta?',
    respuesta: 'No hay ningún compromiso. Si la oferta no te convence, te llevas tus piezas y no hay costo ni obligación. Así de simple.',
  },
  {
    pregunta: '¿Necesito traer identificación?',
    respuesta: 'Sí, necesitamos una identificación válida con foto para completar la transacción. Esto es un requisito legal estándar para la compra de metales preciosos.',
  },
  {
    pregunta: '¿Compran oro roto o dañado?',
    respuesta: 'Sí. El valor del oro se basa en su peso y pureza, no en la condición de la pieza. Cadenas rotas, anillos doblados, piezas sin piedras — todo tiene valor.',
  },
];
```

- [ ] **Step 2: Create FaqAccordion.astro**

```astro
---
// src/components/FaqAccordion.astro
import { faqs } from '../data/faq';
---

<div class="faq-list">
  {faqs.map((faq, i) => (
    <details class="faq-item gs-reveal" style={`--delay: ${i * 0.05}s`}>
      <summary class="faq-item__q">{faq.pregunta}</summary>
      <p class="faq-item__a">{faq.respuesta}</p>
    </details>
  ))}
</div>

<style>
  .faq-list {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .faq-item {
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .faq-item[open] {
    border-color: var(--gold);
  }

  .faq-item__q {
    padding: var(--space-lg);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-item__q::after {
    content: '+';
    font-size: 1.2rem;
    color: var(--gold);
    font-weight: 700;
    transition: transform var(--transition-base);
  }

  .faq-item[open] .faq-item__q::after {
    transform: rotate(45deg);
  }

  .faq-item__q::-webkit-details-marker {
    display: none;
  }

  .faq-item__a {
    padding: 0 var(--space-lg) var(--space-lg);
    color: var(--gray-500);
    font-size: 0.9rem;
    line-height: 1.7;
  }
</style>
```

- [ ] **Step 3: Create como-funciona.astro page**

```astro
---
// src/pages/como-funciona.astro
import Base from '../layouts/Base.astro';
import FaqAccordion from '../components/FaqAccordion.astro';
---

<Base
  title="Cómo Funciona"
  description="Conoce el proceso paso a paso de cómo vendemos tu oro. Evaluación transparente, pago inmediato, en un lugar seguro cerca de ti."
>
  <!-- Hero -->
  <section class="section section--dark" style="padding-top: calc(var(--nav-height) + var(--space-3xl));">
    <div class="container" style="text-align: center;">
      <span class="label">● El proceso</span>
      <h1 style="color: var(--white); margin-top: var(--space-sm);">Así de fácil es vender tu oro</h1>
      <p style="color: var(--gray-300); margin-top: var(--space-md); max-width: 500px; margin-left: auto; margin-right: auto;">
        Un proceso transparente, rápido y seguro. Desde el primer contacto hasta el pago, todo en menos de 24 horas.
      </p>
    </div>
  </section>

  <!-- Paso 1 -->
  <section class="section section--light">
    <div class="container paso-detalle gs-reveal">
      <div class="paso-detalle__numero">1</div>
      <div class="paso-detalle__content">
        <h2>Contáctanos</h2>
        <p>Escríbenos por WhatsApp, llámanos o llena el formulario en nuestra página de contacto. Cuéntanos qué piezas tienes — no necesitas ser experto, solo dinos lo que sabes.</p>
        <p>Si puedes, envíanos fotos de las piezas. Eso nos ayuda a darte un estimado preliminar antes de reunirnos.</p>
        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; margin-top: var(--space-md);">
          <span class="badge badge--green">WhatsApp</span>
          <span class="badge badge--blue">Llamada</span>
          <span class="badge badge--gold">Formulario</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Paso 2 -->
  <section class="section section--dark">
    <div class="container paso-detalle gs-reveal">
      <div class="paso-detalle__numero" style="background: var(--gold); color: var(--navy-deep);">2</div>
      <div class="paso-detalle__content">
        <h2 style="color: var(--white);">Nos encontramos</h2>
        <p style="color: var(--gray-300);">Coordinamos un lugar público y seguro cerca de ti — un café, un lobby, o cualquier lugar cómodo. Nosotros llevamos todo lo necesario:</p>
        <ul style="color: var(--gray-300); margin-top: var(--space-md); padding-left: var(--space-xl);">
          <li><strong style="color: var(--gold);">Báscula digital certificada</strong> — pesamos cada pieza frente a ti</li>
          <li><strong style="color: var(--gold);">Kit de prueba de pureza</strong> — verificamos los kilates en el momento</li>
          <li><strong style="color: var(--gold);">Precio spot en vivo</strong> — te mostramos el precio internacional del oro en tiempo real</li>
        </ul>
        <p style="color: var(--gray-400); margin-top: var(--space-md); font-size: 0.88rem;">Te explicamos cada paso del cálculo. Sin prisas, sin presión.</p>
      </div>
    </div>
  </section>

  <!-- Paso 3 -->
  <section class="section section--light">
    <div class="container paso-detalle gs-reveal">
      <div class="paso-detalle__numero">3</div>
      <div class="paso-detalle__content">
        <h2>Cobra al instante</h2>
        <p>Si la oferta te parece bien, te pagamos ahí mismo. Tú eliges cómo:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-top: var(--space-md); max-width: 400px;">
          <div class="card" style="text-align: center; padding: var(--space-lg);">
            <span style="font-size: 1.5rem;">💵</span>
            <p style="font-weight: 600; margin-top: var(--space-sm);">Efectivo</p>
          </div>
          <div class="card" style="text-align: center; padding: var(--space-lg);">
            <span style="font-size: 1.5rem;">📱</span>
            <p style="font-weight: 600; margin-top: var(--space-sm);">Transferencia</p>
          </div>
        </div>
        <p style="color: var(--gray-500); margin-top: var(--space-md); font-size: 0.88rem;">
          Si no te convence la oferta, no hay problema. Te llevas tus piezas sin costo ni compromiso.
        </p>
      </div>
    </div>
  </section>

  <!-- Qué compramos -->
  <section class="section section--dark">
    <div class="container" style="text-align: center;">
      <span class="label">● Tipos de oro</span>
      <h2 style="color: var(--white); margin-top: var(--space-sm);">¿Qué compramos?</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); margin-top: var(--space-2xl); max-width: 600px; margin-left: auto; margin-right: auto;">
        {['10k', '14k', '18k', '24k'].map(k => (
          <div class="gs-reveal" style="background: rgba(197,165,90,0.08); border: 1px solid rgba(197,165,90,0.2); border-radius: var(--radius-lg); padding: var(--space-lg); text-align: center;">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: 800;">{k}</span>
          </div>
        ))}
      </div>
      <p style="color: var(--gray-400); margin-top: var(--space-lg); font-size: 0.9rem; max-width: 500px; margin-left: auto; margin-right: auto;">
        Anillos, cadenas, pulseras, aretes, dijes, oro dental, monedas y lingotes. Incluso piezas rotas o dañadas — el valor está en el metal, no en la condición.
      </p>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section section--light">
    <div class="container">
      <div class="section-header gs-reveal" style="text-align: center;">
        <span class="label" style="color: var(--gold);">● Preguntas frecuentes</span>
        <h2>¿Tienes dudas?</h2>
      </div>
      <FaqAccordion />
    </div>
  </section>

  <!-- CTA -->
  <section class="section section--dark" style="text-align: center;">
    <div class="container gs-reveal">
      <h2 style="color: var(--white);">¿Listo para vender tu oro?</h2>
      <p style="color: var(--gray-300); margin-top: var(--space-md); max-width: 400px; margin-left: auto; margin-right: auto;">
        Contáctanos hoy. Sin compromiso, sin presión.
      </p>
      <div style="display: flex; gap: var(--space-md); justify-content: center; margin-top: var(--space-xl); flex-wrap: wrap;">
        <a href="/contacto" class="btn btn--primary">Contactar ahora →</a>
        <a href="/calculadora" class="btn btn--outline">Ver calculadora</a>
      </div>
    </div>
  </section>
</Base>

<style>
  .paso-detalle {
    display: flex;
    gap: var(--space-2xl);
    align-items: flex-start;
    max-width: 700px;
    margin: 0 auto;
  }

  .paso-detalle__numero {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    background: var(--navy);
    color: var(--gold);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.3rem;
  }

  .paso-detalle__content p {
    margin-top: var(--space-sm);
    line-height: 1.7;
  }

  .paso-detalle__content li {
    margin-top: var(--space-sm);
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .paso-detalle {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
</style>
```

- [ ] **Step 4: Verify in browser**

Navigate to `localhost:4321/como-funciona`
Expected: Full page with step-by-step details, kilates grid, FAQ accordion, CTA.

- [ ] **Step 5: Commit**

```bash
git add src/data/faq.ts src/components/FaqAccordion.astro src/pages/como-funciona.astro
git commit -m "feat: build Cómo Funciona page with FAQ accordion"
```

---

### Task 7: Calculadora de Oro Page

**Files:**
- Create: `src/components/GoldCalculator.astro`
- Create: `src/scripts/calculator.ts`
- Create: `src/pages/calculadora.astro`
- Modify: `src/pages/index.astro` (uncomment GoldCalculator)

- [ ] **Step 1: Create calculator.ts (client-side logic)**

```ts
// src/scripts/calculator.ts

const KARAT_PURITY: Record<string, number> = {
  '10': 0.4167,
  '14': 0.5833,
  '18': 0.75,
  '24': 1.0,
};

interface GoldPrice {
  price_per_oz: number;
  price_per_gram: number;
  currency: string;
  timestamp: number;
}

let cachedPrice: GoldPrice | null = null;

async function fetchGoldPrice(): Promise<GoldPrice> {
  if (cachedPrice) return cachedPrice;

  try {
    const res = await fetch('/api/gold-price');
    if (!res.ok) throw new Error('API error');
    cachedPrice = await res.json();
    return cachedPrice!;
  } catch {
    return {
      price_per_oz: 3400,
      price_per_gram: 109.3,
      currency: 'USD',
      timestamp: Date.now(),
    };
  }
}

function calculateValue(weightGrams: number, karats: string, pricePerGram: number): number {
  const purity = KARAT_PURITY[karats] ?? 0;
  // Dealer pays ~70-80% of melt value — show the melt value as "up to"
  return weightGrams * pricePerGram * purity;
}

export function initCalculator() {
  const weightInput = document.getElementById('calc-weight') as HTMLInputElement;
  const karatButtons = document.querySelectorAll('[data-karat]');
  const priceDisplay = document.getElementById('calc-spot-price');
  const resultDisplay = document.getElementById('calc-result');
  const resultWrapper = document.getElementById('calc-result-wrapper');

  if (!weightInput || !resultDisplay) return;

  let selectedKarat = '14';

  // Fetch and display spot price
  fetchGoldPrice().then(price => {
    if (priceDisplay) {
      priceDisplay.textContent = `$${price.price_per_oz.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  });

  // Karat button selection
  karatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      karatButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedKarat = (btn as HTMLElement).dataset.karat!;
      updateResult();
    });
  });

  // Weight input
  weightInput.addEventListener('input', updateResult);

  async function updateResult() {
    const weight = parseFloat(weightInput.value);

    if (!weight || weight <= 0) {
      if (resultWrapper) resultWrapper.style.display = 'none';
      return;
    }

    const price = await fetchGoldPrice();
    const value = calculateValue(weight, selectedKarat, price.price_per_gram);

    resultDisplay!.textContent = `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    if (resultWrapper) resultWrapper.style.display = 'block';
  }
}
```

- [ ] **Step 2: Create GoldCalculator.astro**

```astro
---
// src/components/GoldCalculator.astro
interface Props {
  compact?: boolean;
}

const { compact = false } = Astro.props;
---

<section class={`section section--dark calc-section ${compact ? 'calc-section--compact' : ''}`} id="calculadora-widget">
  <div class="container">
    <div class="calc-layout">
      <div class="calc-info gs-reveal">
        <span class="label">● Precio en vivo</span>
        <h2 style="color: var(--white); margin-top: var(--space-sm);">
          {compact ? 'Calculadora de Oro' : '¿Cuánto vale tu oro?'}
        </h2>
        <p style="color: var(--gray-400); margin-top: var(--space-sm);">
          Ingresa el peso y los kilates de tu pieza para obtener un estimado basado en el precio internacional del oro.
        </p>
        {!compact && (
          <div style="margin-top: var(--space-lg);">
            <span style="color: var(--gray-400); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Precio del oro hoy</span>
            <div style="color: var(--gold); font-size: 2rem; font-weight: 800;" id="calc-spot-price">
              Cargando...
            </div>
            <span style="color: var(--gray-500); font-size: 0.75rem;">USD por onza troy</span>
          </div>
        )}
      </div>

      <div class="calc-widget gs-reveal">
        <div class="calc-widget__inner">
          <div class="calc-field">
            <label class="calc-field__label" for="calc-weight">Peso (gramos)</label>
            <input
              type="number"
              id="calc-weight"
              class="calc-field__input"
              placeholder="Ej: 10.5"
              step="0.1"
              min="0"
            />
          </div>

          <div class="calc-field">
            <label class="calc-field__label">Kilates</label>
            <div class="calc-karats">
              <button data-karat="10" class="calc-karat-btn">10k</button>
              <button data-karat="14" class="calc-karat-btn is-active">14k</button>
              <button data-karat="18" class="calc-karat-btn">18k</button>
              <button data-karat="24" class="calc-karat-btn">24k</button>
            </div>
          </div>

          <div class="calc-result" id="calc-result-wrapper" style="display: none;">
            <span class="calc-result__label">Valor estimado</span>
            <span class="calc-result__value" id="calc-result">$0</span>
            <span class="calc-result__currency">USD</span>
            <a href="/contacto" class="btn btn--primary" style="margin-top: var(--space-md); width: 100%; justify-content: center;">
              Quiero vender →
            </a>
          </div>

          <p class="calc-disclaimer">
            * Estimado basado en el valor de fundición (melt value) al precio spot actual.
            El valor final se confirma en persona.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .calc-layout {
    display: flex;
    gap: var(--space-2xl);
    align-items: center;
  }

  .calc-info {
    flex: 1;
  }

  .calc-widget {
    flex: 1;
  }

  .calc-widget__inner {
    background: rgba(197,165,90,0.06);
    border: 1px solid rgba(197,165,90,0.15);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
  }

  .calc-field {
    margin-bottom: var(--space-lg);
  }

  .calc-field__label {
    display: block;
    color: var(--gray-400);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: var(--space-sm);
    font-weight: 600;
  }

  .calc-field__input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(197,165,90,0.2);
    border-radius: var(--radius-md);
    padding: 0.65rem 1rem;
    color: var(--white);
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color var(--transition-fast);
  }

  .calc-field__input:focus {
    border-color: var(--gold);
  }

  .calc-field__input::placeholder {
    color: var(--gray-500);
  }

  .calc-karats {
    display: flex;
    gap: var(--space-sm);
  }

  .calc-karat-btn {
    flex: 1;
    padding: 0.55rem;
    border-radius: var(--radius-md);
    font-size: 0.88rem;
    font-weight: 600;
    background: rgba(197,165,90,0.1);
    border: 1px solid rgba(197,165,90,0.2);
    color: var(--gold);
    transition: all var(--transition-fast);
  }

  .calc-karat-btn.is-active {
    background: var(--gold);
    color: var(--navy-deep);
    border-color: var(--gold);
  }

  .calc-result {
    border-top: 1px solid rgba(197,165,90,0.15);
    padding-top: var(--space-lg);
    text-align: center;
  }

  .calc-result__label {
    display: block;
    color: var(--gray-400);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .calc-result__value {
    display: block;
    color: var(--gold);
    font-size: 2.2rem;
    font-weight: 800;
    margin: var(--space-xs) 0;
  }

  .calc-result__currency {
    color: var(--gray-500);
    font-size: 0.8rem;
  }

  .calc-disclaimer {
    color: var(--gray-500);
    font-size: 0.68rem;
    margin-top: var(--space-md);
    line-height: 1.5;
  }

  .calc-section--compact .calc-layout {
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .calc-layout {
      flex-direction: column;
    }
  }
</style>

<script>
  import { initCalculator } from '../scripts/calculator';
  initCalculator();
</script>
```

- [ ] **Step 3: Create calculadora.astro page**

```astro
---
// src/pages/calculadora.astro
import Base from '../layouts/Base.astro';
import GoldCalculator from '../components/GoldCalculator.astro';
---

<Base
  title="Calculadora de Oro"
  description="Calcula el valor de tu oro basado en el precio spot en tiempo real. Ingresa peso y kilates para obtener un estimado al instante."
>
  <!-- Hero -->
  <section class="section section--dark" style="padding-top: calc(var(--nav-height) + var(--space-3xl)); padding-bottom: var(--space-xl);">
    <div class="container" style="text-align: center;">
      <span class="label">● Herramienta gratuita</span>
      <h1 style="color: var(--white); margin-top: var(--space-sm);">Calculadora de Oro en Vivo</h1>
      <p style="color: var(--gray-300); margin-top: var(--space-md); max-width: 500px; margin-left: auto; margin-right: auto;">
        Descubre cuánto vale tu oro ahora mismo, basado en el precio spot internacional actualizado en tiempo real.
      </p>
    </div>
  </section>

  <GoldCalculator />

  <!-- Educativa -->
  <section class="section section--light">
    <div class="container" style="max-width: 700px;">
      <div class="section-header gs-reveal" style="text-align: center;">
        <span class="label" style="color: var(--gold);">● Aprende sobre el oro</span>
        <h2>¿Cómo se calcula el valor?</h2>
      </div>

      <div class="edu-block gs-reveal">
        <h3>¿Qué es el precio spot?</h3>
        <p>El precio spot es el precio internacional al que se cotiza el oro en los mercados financieros globales. Cambia constantemente durante el día según la oferta y demanda mundial. Es el precio base que se usa para calcular el valor de cualquier pieza de oro.</p>
      </div>

      <div class="edu-block gs-reveal">
        <h3>¿Qué son los kilates?</h3>
        <p>Los kilates (k) indican la pureza del oro en una pieza. El oro puro es 24k. La mayoría de joyería es de menor pureza porque se mezcla con otros metales para hacerla más resistente:</p>
        <ul>
          <li><strong>10k</strong> = 41.7% oro puro — la más común en joyería económica</li>
          <li><strong>14k</strong> = 58.3% oro puro — la más popular en EE.UU.</li>
          <li><strong>18k</strong> = 75% oro puro — joyería de alta gama</li>
          <li><strong>24k</strong> = 100% oro puro — lingotes y monedas</li>
        </ul>
      </div>

      <div class="edu-block gs-reveal">
        <h3>La fórmula</h3>
        <p>El valor de tu pieza se calcula así:</p>
        <div class="formula-box">
          <code>Valor = Peso (gramos) × Precio por gramo × Pureza (%)</code>
        </div>
        <p>Por ejemplo: una cadena de 14k que pesa 15 gramos, con el oro a $109/gramo:</p>
        <div class="formula-box">
          <code>15g × $109 × 0.583 = <strong>$953</strong></code>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section section--dark" style="text-align: center;">
    <div class="container gs-reveal">
      <h2 style="color: var(--white);">¿Te gustó el estimado?</h2>
      <p style="color: var(--gray-300); margin-top: var(--space-md);">
        Contáctanos para confirmar el valor en persona. Sin compromiso.
      </p>
      <a href="/contacto" class="btn btn--primary" style="margin-top: var(--space-xl);">
        Contactar ahora →
      </a>
    </div>
  </section>
</Base>

<style>
  .edu-block {
    margin-bottom: var(--space-2xl);
  }

  .edu-block h3 {
    margin-bottom: var(--space-sm);
  }

  .edu-block p, .edu-block li {
    color: var(--gray-500);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .edu-block ul {
    margin-top: var(--space-sm);
    padding-left: var(--space-xl);
  }

  .edu-block li {
    margin-top: var(--space-xs);
  }

  .formula-box {
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin: var(--space-md) 0;
    text-align: center;
  }

  .formula-box code {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--navy);
  }
</style>
```

- [ ] **Step 4: Uncomment GoldCalculator in index.astro**

In `src/pages/index.astro`, uncomment the GoldCalculator import and usage, passing `compact` prop:

```astro
import GoldCalculator from '../components/GoldCalculator.astro';
```

And in the template between PorQueKaratCash and Cobertura:

```astro
<GoldCalculator compact />
```

- [ ] **Step 5: Verify in browser**

Test on both `/calculadora` (full page) and `/` (compact widget on home).
- Enter weight, select kilates, verify calculation displays.
- Verify spot price loads (will show fallback $3,400 without API key).

- [ ] **Step 6: Commit**

```bash
git add src/components/GoldCalculator.astro src/scripts/calculator.ts src/pages/calculadora.astro src/pages/index.astro
git commit -m "feat: build gold calculator with live price API and education page"
```

---

### Task 8: Sobre Nosotros Page

**Files:**
- Create: `src/pages/nosotros.astro`

- [ ] **Step 1: Create nosotros.astro**

```astro
---
// src/pages/nosotros.astro
import Base from '../layouts/Base.astro';
---

<Base
  title="Sobre Nosotros"
  description="Conoce a KaratCash — el servicio de compra de oro más transparente de Phoenix. Proceso en español, pago justo, lugar seguro."
>
  <!-- Hero -->
  <section class="section section--dark" style="padding-top: calc(var(--nav-height) + var(--space-3xl));">
    <div class="container" style="text-align: center;">
      <span class="label">● Nuestra historia</span>
      <h1 style="color: var(--white); margin-top: var(--space-sm);">Creemos que vender tu oro<br /><span style="color: var(--gold);">debería ser simple y justo</span></h1>
    </div>
  </section>

  <!-- Historia -->
  <section class="section section--light">
    <div class="container" style="max-width: 700px;">
      <div class="gs-reveal">
        <h2>Por qué creamos KaratCash</h2>
        <p class="about-text">
          Vimos cómo muchas personas en la comunidad hispana de Phoenix tenían oro guardado — herencias, regalos, piezas que ya no usaban — pero no sabían cuánto valía o no confiaban en las opciones disponibles.
        </p>
        <p class="about-text">
          Las casas de empeño ofrecen centavos por cada dólar. Los compradores en línea te piden enviar tu oro por correo sin garantías. Y casi nadie ofrece el servicio en español.
        </p>
        <p class="about-text">
          KaratCash nació para cambiar eso. Creemos que cada persona merece saber exactamente cuánto vale su oro, ver el proceso con sus propios ojos, y recibir un pago justo — todo en su idioma.
        </p>
      </div>
    </div>
  </section>

  <!-- Valores -->
  <section class="section section--dark">
    <div class="container">
      <div class="section-header gs-reveal" style="text-align: center;">
        <span class="label">● Nuestros valores</span>
        <h2 style="color: var(--white); margin-top: var(--space-sm);">En lo que creemos</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-lg); max-width: 800px; margin: 0 auto;">
        <div class="valor-card gs-reveal">
          <h3 style="color: var(--gold);">Transparencia</h3>
          <p style="color: var(--gray-400); font-size: 0.88rem; line-height: 1.7;">
            Te mostramos el precio spot, pesamos frente a ti, y te explicamos el cálculo. Nada oculto, nada confuso.
          </p>
        </div>
        <div class="valor-card gs-reveal">
          <h3 style="color: var(--gold);">Respeto</h3>
          <p style="color: var(--gray-400); font-size: 0.88rem; line-height: 1.7;">
            Tu tiempo vale. Tu oro vale. Y tú mereces un trato digno, sin presión y sin trucos.
          </p>
        </div>
        <div class="valor-card gs-reveal">
          <h3 style="color: var(--gold);">Seguridad</h3>
          <p style="color: var(--gray-400); font-size: 0.88rem; line-height: 1.7;">
            Nos reunimos en lugares públicos y seguros. Tu seguridad y la nuestra son lo primero.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Servicio en español -->
  <section class="section section--light">
    <div class="container" style="text-align: center; max-width: 600px;">
      <div class="gs-reveal">
        <span class="label" style="color: var(--gold);">● 100% en español</span>
        <h2 style="margin-top: var(--space-sm);">Hablamos tu idioma</h2>
        <p class="about-text" style="text-align: center;">
          Todo nuestro proceso es en español. Desde el primer mensaje hasta el recibo de pago. Sin barreras, sin confusiones, sin letra chiquita en otro idioma.
        </p>
        <a href="/contacto" class="btn btn--primary" style="margin-top: var(--space-xl);">
          Contáctanos en español →
        </a>
      </div>
    </div>
  </section>
</Base>

<style>
  .about-text {
    color: var(--gray-500);
    font-size: 1rem;
    line-height: 1.8;
    margin-top: var(--space-md);
  }

  .valor-card {
    padding: var(--space-xl);
    border: 1px solid rgba(197,165,90,0.12);
    border-radius: var(--radius-lg);
    text-align: center;
  }

  .valor-card h3 {
    margin-bottom: var(--space-sm);
  }

  @media (max-width: 768px) {
    .valor-card + .valor-card {
      margin-top: 0;
    }

    div[style*="grid-template-columns: repeat(3"] {
      grid-template-columns: 1fr !important;
    }
  }
</style>
```

- [ ] **Step 2: Verify in browser**

Navigate to `localhost:4321/nosotros`
Expected: Full page with story, values, Spanish language callout.

- [ ] **Step 3: Commit**

```bash
git add src/pages/nosotros.astro
git commit -m "feat: build Sobre Nosotros page"
```

---

### Task 9: Contacto Page

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/scripts/form.ts`
- Create: `src/pages/contacto.astro`

- [ ] **Step 1: Create form.ts (client-side validation)**

```ts
// src/scripts/form.ts

export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement;
  const successMsg = document.getElementById('contact-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const nombre = formData.get('nombre') as string;
    const telefono = formData.get('telefono') as string;

    // Basic validation
    if (!nombre?.trim() || !telefono?.trim()) {
      alert('Por favor completa al menos tu nombre y teléfono.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // For now, open WhatsApp with the form data as a message
    const mensaje = [
      `Hola, quiero vender mi oro.`,
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      formData.get('piezas') ? `Piezas: ${formData.get('piezas')}` : '',
      formData.get('zona') ? `Zona: ${formData.get('zona')}` : '',
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/16231234567?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');

    // Show success
    form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  });
}
```

- [ ] **Step 2: Create ContactForm.astro**

```astro
---
// src/components/ContactForm.astro
---

<form id="contact-form" class="contact-form">
  <div class="form-field">
    <label for="nombre">Nombre *</label>
    <input type="text" id="nombre" name="nombre" required placeholder="Tu nombre" />
  </div>

  <div class="form-field">
    <label for="telefono">Teléfono *</label>
    <input type="tel" id="telefono" name="telefono" required placeholder="(623) 123-4567" />
  </div>

  <div class="form-field">
    <label for="piezas">¿Qué piezas tienes?</label>
    <select id="piezas" name="piezas">
      <option value="">Selecciona una opción</option>
      <option value="anillos">Anillos</option>
      <option value="cadenas">Cadenas / Collares</option>
      <option value="pulseras">Pulseras</option>
      <option value="aretes">Aretes</option>
      <option value="monedas">Monedas de oro</option>
      <option value="varias">Varias piezas</option>
      <option value="otro">Otro</option>
    </select>
  </div>

  <div class="form-field">
    <label for="zona">¿En qué zona de Phoenix estás?</label>
    <input type="text" id="zona" name="zona" placeholder="Ej: Mesa, Tempe, Chandler..." />
  </div>

  <button type="submit" id="contact-submit" class="btn btn--primary" style="width: 100%; justify-content: center;">
    Enviar y contactar por WhatsApp →
  </button>
</form>

<div id="contact-success" style="display: none; text-align: center; padding: var(--space-2xl);">
  <span style="font-size: 2.5rem;">✓</span>
  <h3 style="margin-top: var(--space-md);">¡Mensaje enviado!</h3>
  <p style="color: var(--gray-500); margin-top: var(--space-sm);">
    Te contactaremos lo antes posible. Si WhatsApp no se abrió,
    <a href="https://wa.me/16231234567" target="_blank" style="color: var(--gold); text-decoration: underline;">haz click aquí</a>.
  </p>
</div>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .form-field label {
    display: block;
    font-weight: 600;
    font-size: 0.88rem;
    margin-bottom: var(--space-sm);
    color: var(--navy);
  }

  .form-field input,
  .form-field select {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    font-family: inherit;
    background: var(--white);
    color: var(--navy);
    outline: none;
    transition: border-color var(--transition-fast);
  }

  .form-field input:focus,
  .form-field select:focus {
    border-color: var(--gold);
  }

  .form-field input::placeholder {
    color: var(--gray-400);
  }
</style>

<script>
  import { initContactForm } from '../scripts/form';
  initContactForm();
</script>
```

- [ ] **Step 3: Create contacto.astro page**

```astro
---
// src/pages/contacto.astro
import Base from '../layouts/Base.astro';
import ContactForm from '../components/ContactForm.astro';

const whatsappUrl = 'https://wa.me/16231234567?text=' + encodeURIComponent('Hola, quiero vender mi oro');
---

<Base
  title="Contacto"
  description="Contáctanos para vender tu oro. WhatsApp, llamada o formulario. Servimos todo el área de Phoenix."
>
  <!-- Hero -->
  <section class="section section--dark" style="padding-top: calc(var(--nav-height) + var(--space-3xl)); padding-bottom: var(--space-xl);">
    <div class="container" style="text-align: center;">
      <span class="label">● Estamos para ayudarte</span>
      <h1 style="color: var(--white); margin-top: var(--space-sm);">Contáctanos</h1>
      <p style="color: var(--gray-300); margin-top: var(--space-md); max-width: 450px; margin-left: auto; margin-right: auto;">
        Elige la forma que te quede más cómoda. Respondemos en menos de una hora.
      </p>
    </div>
  </section>

  <!-- Contact options + form -->
  <section class="section section--light">
    <div class="container">
      <div class="contacto-grid">
        <!-- Quick contact options -->
        <div class="contacto-opciones">
          <a href={whatsappUrl} target="_blank" rel="noopener" class="contacto-opcion gs-reveal">
            <div class="contacto-opcion__icon" style="background: #E8F5EE; color: #25D366;">💬</div>
            <div>
              <h3>WhatsApp</h3>
              <p>Escríbenos directo. Respondemos rápido.</p>
            </div>
          </a>

          <a href="tel:+16231234567" class="contacto-opcion gs-reveal">
            <div class="contacto-opcion__icon" style="background: var(--blue-bg); color: var(--blue);">📞</div>
            <div>
              <h3>Llamar ahora</h3>
              <p>(623) 123-4567</p>
            </div>
          </a>

          <div class="contacto-opcion gs-reveal" style="cursor: default;">
            <div class="contacto-opcion__icon" style="background: var(--gold-pale); color: var(--gold-dark);">🕐</div>
            <div>
              <h3>Horario</h3>
              <p>Lunes a Sábado: 9am — 7pm<br />Domingo: con cita previa</p>
            </div>
          </div>

          <div class="contacto-opcion gs-reveal" style="cursor: default;">
            <div class="contacto-opcion__icon" style="background: var(--gray-100); color: var(--navy);">📍</div>
            <div>
              <h3>Área de servicio</h3>
              <p>Todo el Valle de Phoenix — nos encontramos en un lugar seguro cerca de ti.</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contacto-form-wrap gs-reveal">
          <h2>Envíanos un mensaje</h2>
          <p style="color: var(--gray-500); margin-top: var(--space-sm); margin-bottom: var(--space-xl); font-size: 0.9rem;">
            Llena el formulario y te contactamos por WhatsApp.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</Base>

<style>
  .contacto-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-3xl);
    align-items: start;
  }

  .contacto-opciones {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .contacto-opcion {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-lg);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg);
    transition: border-color var(--transition-fast);
  }

  a.contacto-opcion:hover {
    border-color: var(--gold);
  }

  .contacto-opcion__icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .contacto-opcion h3 {
    font-size: 1rem;
    font-weight: 700;
  }

  .contacto-opcion p {
    color: var(--gray-500);
    font-size: 0.85rem;
    margin-top: 2px;
  }

  .contacto-form-wrap {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    .contacto-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 4: Verify in browser**

Navigate to `localhost:4321/contacto`
Expected: Contact options on left, form on right. Form submits and opens WhatsApp with pre-filled message.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactForm.astro src/scripts/form.ts src/pages/contacto.astro
git commit -m "feat: build Contact page with form and multi-channel options"
```

---

### Task 10: GSAP Animations

**Files:**
- Create: `src/scripts/gsap-init.ts`
- Modify: `src/layouts/Base.astro` (add script import)

- [ ] **Step 1: Create gsap-init.ts**

```ts
// src/scripts/gsap-init.ts

declare const gsap: any;
declare const ScrollTrigger: any;

export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
    document.querySelectorAll('.gs-reveal, .gs-reveal-left, .gs-reveal-right, .gs-reveal-scale').forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  // Reveal up
  gsap.utils.toArray('.gs-reveal').forEach((el: HTMLElement) => {
    const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || '0');
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Reveal from left
  gsap.utils.toArray('.gs-reveal-left').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Reveal from right
  gsap.utils.toArray('.gs-reveal-right').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Scale reveal
  gsap.utils.toArray('.gs-reveal-scale').forEach((el: HTMLElement) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  // Animate number counters (for calculator result)
  const counterEls = document.querySelectorAll('[data-counter]');
  counterEls.forEach(el => {
    const target = parseInt((el as HTMLElement).dataset.counter || '0');
    gsap.to({ val: 0 }, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: function (this: any) {
        (el as HTMLElement).textContent = Math.round(this.targets()[0].val).toLocaleString('en-US');
      },
    });
  });

  // Nav background opacity on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self: any) => {
        if (self.direction === 1 && self.scroll() > 80) {
          nav.style.background = 'rgba(26, 31, 43, 0.98)';
        } else if (self.scroll() <= 80) {
          nav.style.background = 'rgba(26, 31, 43, 0.95)';
        }
      },
    });
  }
}
```

- [ ] **Step 2: Add animation init script to Base.astro**

Add before the closing `</body>` tag in `src/layouts/Base.astro`, after the GSAP CDN scripts:

```html
<script>
  import { initAnimations } from '../scripts/gsap-init';

  // Wait for GSAP to load from CDN
  function waitForGsap() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initAnimations();
    } else {
      setTimeout(waitForGsap, 50);
    }
  }

  document.addEventListener('DOMContentLoaded', waitForGsap);
</script>
```

- [ ] **Step 3: Verify animations in browser**

Navigate through all pages. Scroll down.
Expected: Elements with `.gs-reveal` class fade in and slide up as they enter viewport. Staggered delays on card grids.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/gsap-init.ts src/layouts/Base.astro
git commit -m "feat: add GSAP scroll-triggered animations across all pages"
```

---

### Task 11: Build & Deploy to Vercel

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 2: Preview production build locally**

```bash
npm run preview
```

Expected: Site serves correctly from `dist/`, all pages work, calculator fetches price.

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel --prod
```

Follow prompts to link the project. Set environment variable `GOLDAPI_KEY` in Vercel dashboard if you have one.

- [ ] **Step 4: Configure custom domain**

In Vercel dashboard → Settings → Domains → Add `karatcash.net`. Update DNS records as instructed by Vercel.

- [ ] **Step 5: Verify live site**

Visit `https://karatcash.net`
Expected: All 5 pages load, calculator works, WhatsApp links open correctly, animations play, mobile responsive.

- [ ] **Step 6: Commit any build-related fixes**

```bash
git add -A
git commit -m "chore: production build fixes and Vercel deployment"
```

---

## Post-Build Tasks (Manual / External)

These are NOT code tasks but are listed here for completeness per the spec:

1. **Update phone numbers** — Replace all instances of `16231234567` with the real WhatsApp/phone number
2. **Add GOLDAPI_KEY** — Register at GoldAPI.io, add key to Vercel env vars
3. **Meta Pixel** — Uncomment and add real Pixel ID in Base.astro
4. **Google Analytics 4** — Uncomment and add real GA4 ID in Base.astro
5. **Google Business Profile** — Set up as service-area business via Google
6. **Social profiles** — Create Facebook Page, Instagram, WhatsApp Business
7. **Content generation** — Use the ads skills (ads-copy, ads-creative, ads-hooks) to generate campaign content
8. **Meta Business Manager** — Set up ad account, install pixel, configure audiences
9. **OG Image** — Generate and place at `public/og-image.jpg`
