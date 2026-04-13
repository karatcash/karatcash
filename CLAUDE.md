# KaratCash

Sitio web para negocio de compra de oro (cash for gold) en Phoenix, AZ. Audiencia hispana, solo español.

## Comandos

| Comando | Descripcion |
|---------|-------------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo (http://localhost:4321) |
| `npm run build` | Build de produccion |
| `npm run preview` | Preview del build |

## Stack

- **Framework:** Astro
- **Estilos:** CSS custom (sin frameworks CSS)
- **Animaciones:** GSAP (scroll-triggered, staggers, numeros animados)
- **JS:** Vanilla JS (calculadora, formulario)
- **Hosting:** Vercel
- **API oro:** GoldAPI.io (cache server-side, actualizar cada 15-30 min)

## Arquitectura

```
src/
  pages/          # Paginas Astro (.astro)
  layouts/        # Layout base
  components/     # Componentes reutilizables
  styles/         # CSS global y variables
  scripts/        # JS vanilla (calculadora, GSAP)
  assets/         # Imagenes optimizadas por Astro
assets/
  logo/           # Logo KaratCash
  brand/          # Recursos de marca
docs/
  specs/          # Spec de lanzamiento y plan del sitio
  research/       # Estudio de mercado y plan maestro
```

## Paginas del MVP

| Pagina | Ruta | Descripcion |
|--------|------|-------------|
| Home | `/` | Landing principal con hero, como funciona, calculadora preview, diferenciadores |
| Como Funciona | `/como-funciona` | Proceso detallado, tipos de oro, FAQ |
| Calculadora | `/calculadora` | Precio spot en vivo, selector kilates, calculo automatico |
| Sobre Nosotros | `/sobre-nosotros` | Historia, valores, conexion emocional |
| Contacto | `/contacto` | Formulario, WhatsApp, telefono, mapa de cobertura |

## Identidad Visual

| Elemento | Valor |
|----------|-------|
| Navy | `#1A1F2B`, `#2D3442` |
| Dorado | `#C5A55A`, `#D4B96A` |
| Blanco | `#FAFAF8` |
| Grises | `#E2E1DE`, `#6E6D69` |
| Verde | `#2D8F5E` |
| Tipografia | Sans-serif moderna (DM Sans / Inter) — titulos 700-800, cuerpo 400-500 |
| Layout | Secciones dark/light alternadas, cortes limpios, sin gradientes de transicion |

## Reglas del Proyecto

- **Idioma:** Todo el contenido en español. Sin version en ingles por ahora
- **Modelo mobile:** NO hay oficina fisica. Los trades se hacen en lugares publicos seguros
- **NO mencionar** "visitanos en nuestra oficina" ni mostrar direccion como punto de encuentro
- **Direccion legal** (1341 E Fremont Rd, Phoenix, AZ 85042) es solo para registro, no se promociona
- **Imagenes IA:** Solo objetos/texturas de oro, nunca caras falsas ni fotos de storefront que no existe
- **Mobile-first:** La mayoria del trafico hispano viene de movil
- **Dominio:** karatcash.net

## Variables de Entorno

- `GOLDAPI_KEY` — API key de GoldAPI.io para precio spot del oro

## Spec Completa

Ver [docs/specs/spec-lanzamiento.md](docs/specs/spec-lanzamiento.md) para la spec detallada del proyecto.
