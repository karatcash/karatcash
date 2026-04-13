# KaratCash — Spec de Lanzamiento

**Fecha:** 2026-04-12
**Proyecto:** KaratCash — Compra de oro en Phoenix, AZ
**Objetivo:** Lanzar marca, sitio web y campañas para atraer clientes hispanos que quieran vender oro en el área metropolitana de Phoenix.

---

## 1. Contexto y Restricciones

### Situación actual
- Solo existen: dominio registrado + logo (monograma KC navy/dorado)
- No hay oficina física. Los trades se realizan en lugares públicos y seguros
- La dirección 1341 E Fremont Rd, Phoenix, AZ 85042 es solo para registro legal, no se promociona como punto de encuentro
- El trader aún no alcanza $50,000 USD en transacciones → no se necesita licencia de Secondhand Dealer ni programa AML todavía
- No hay contenido real (fotos, videos) — primera ronda 100% generada con IA
- Prioridad #1: lanzar campañas para traer clientes

### Modelo de negocio
- **Tipo:** Cash for gold — compra de joyería de oro usada (10k, 14k, 18k, 24k) y reventa a refinería/mayorista
- **Modalidad:** Mobile/concierge — citas en lugares públicos y seguros
- **Cobertura:** Todo el área metropolitana de Phoenix (Phoenix, Tempe, Mesa, Scottsdale, Chandler, Gilbert, Glendale, Peoria, Surprise, Avondale, Goodyear, etc.)
- **Idioma:** Solo español
- **Diferenciador:** Transparencia radical (spot price en vivo, evaluación frente al cliente, pago inmediato) + servicio en español + conveniencia mobile

---

## 2. Identidad de Marca

### Propuesta de valor
> "Compramos tu oro a precio justo, nos encontramos contigo y te pagamos al momento."

### Tono de comunicación
- **Imagen:** Profesional y premium (inspira confianza y seriedad)
- **Palabras:** Humano y directo (sin jerga, cálido, en español)
- Ejemplo correcto: "Te mostramos cuánto vale tu oro"
- Ejemplo incorrecto: "Realizamos valuaciones de metales preciosos"

### Sistema visual

| Elemento | Definición |
|---|---|
| Paleta primaria | Navy (#1A1F2B, #2D3442) + Dorado (#C5A55A, #D4B96A) |
| Paleta secundaria | Blanco (#FAFAF8), Grises (#E2E1DE, #6E6D69), Verde confirmación (#2D8F5E) |
| Tipografía | Sans-serif moderna — se definirá en Stitch (candidatas: DM Sans, Inter, o lo que mejor se vea en los mockups). Títulos weight 700-800, cuerpo 400-500 |
| Logo | Monograma KC existente (navy + dorado) |
| Layout | Secciones dark alternando con secciones light — cortes limpios, sin gradientes de transición entre secciones |
| Animaciones | GSAP — scroll-triggered reveals con stagger, números animados, hover states suaves |
| Iconografía | Línea simple, monocolor (dorado sobre dark, navy sobre light) |

### Mensajes clave
- **Headline principal:** "El precio del oro está en máximos históricos"
- **Subheadline:** "Ese anillo, esa cadena, esos aretes que no usas — hoy valen más que nunca"
- **CTA primario:** "Obtén tu cotización gratis" / "Quiero vender mi oro"
- **Confianza:** "Pago inmediato · Lugar seguro · Todo Phoenix · 100% transparente"
- **Proceso resumido:** "Contáctanos → Nos encontramos → Cobra al instante"

---

## 3. Buyer Personas

### Persona 1 — "María necesita efectivo" (volumen principal)
- **Quién:** Mujer hispana, 28-50 años, residente del Phoenix metro area
- **Situación:** Tiene joyería de oro (10k/14k) que no usa — herencia, regalos de ex, piezas viejas
- **Motivación:** Necesita efectivo para algo concreto (renta, carro, emergencia, envío a familia)
- **Miedos:** Que le paguen menos de lo justo, que sea peligroso, que no le entiendan en español
- **Canal preferido:** WhatsApp
- **Mensaje que conecta:** "Convierte ese oro que no usas en efectivo hoy — proceso en español, lugar seguro, pago inmediato"
- **Dónde encontrarla:** Facebook/Instagram ads, grupos hispanos de Phoenix en Facebook

### Persona 2 — "Carlos compara precios" (mayor ticket)
- **Quién:** Hombre/mujer hispano, 30-55 años, más metódico
- **Situación:** Tiene varias piezas y sabe que valen algo. Ya cotizó en una pawn shop o buscó en Google
- **Motivación:** Maximizar lo que recibe
- **Miedos:** Trampas con la báscula o la pureza, ofertas engañosas
- **Canal preferido:** Llamada telefónica o formulario
- **Mensaje que conecta:** "Te mostramos el precio spot en vivo, pesamos frente a ti y te explicamos cada centavo"
- **Dónde encontrarlo:** Google Search, Google Maps, comparación por reseñas

### Persona 3 — "Doña Rosa limpia casa" (ticket grande)
- **Quién:** Mujer hispana, 45-65+, mudanza/herencia/limpieza de casa
- **Situación:** Múltiples piezas, no sabe el valor, quiere liquidar todo
- **Motivación:** Ordenar, simplificar, obtener dinero extra
- **Miedos:** No saber si le dan precio justo, sentirse presionada
- **Canal preferido:** Llamada o WhatsApp (referida por alguien)
- **Mensaje que conecta:** "Evaluamos todas tus piezas sin compromiso — te decimos cuánto vale cada una y tú decides"
- **Dónde encontrarla:** Referidos, Facebook comunidad, alianzas con estate sales

---

## 4. Sitio Web

### Tech stack
- **Framework:** Astro
- **Estilos:** CSS custom (no frameworks)
- **Animaciones:** GSAP (scroll-triggered, staggers, números animados)
- **JavaScript:** Vanilla JS para interactividad (calculadora, formulario)
- **Hosting:** Vercel
- **Dominio:** karatcash.net
- **API precio del oro:** GoldAPI.io (tier gratuito: 300 calls/mes). Se necesita caching server-side para no agotar el límite — actualizar el precio cada 15-30 minutos, no en cada visita

### Flujo de diseño
1. Diseñar todas las pantallas en **Stitch** primero con buenas referencias
2. Extraer el diseño aprobado
3. Implementar en Astro + GSAP

### Páginas del MVP (5 páginas)

#### 4.1 Home (landing principal)
- Hero dark: headline + subtítulo + 2 CTAs (cotización + precio del oro) + badges de confianza
- Sección "Cómo Funciona": 3 pasos en cards (Contáctanos → Nos encontramos → Cobra)
- Widget preview de calculadora de oro en vivo (bloque dark)
- Sección "Por qué KaratCash": 4-6 diferenciadores con iconos
- Testimonios (placeholder hasta tener reales)
- Cobertura: "Servimos todo el Valle de Phoenix" + lista de ciudades
- CTA final + múltiples canales de contacto

#### 4.2 Cómo Funciona
- Explicación detallada de cada paso con visuales
- Tipos de oro que compramos (10k, 14k, 18k, 24k — joyería, monedas, scrap)
- Qué esperar en la cita (qué llevamos, cómo evaluamos, cuánto tarda)
- FAQ integrado (5-8 preguntas frecuentes)
- CTA a contacto

#### 4.3 Calculadora de Oro
- Precio spot en tiempo real via GoldAPI.io
- Selector de kilates (10k, 14k, 18k, 24k)
- Input de peso en gramos
- Cálculo automático del valor estimado
- Disclaimer: "El valor final se confirma en persona"
- CTA: "¿Te gusta el estimado? Contáctanos"
- Sección educativa: qué es el spot price, qué son los kilates, cómo se calcula

#### 4.4 Sobre Nosotros
- Historia de KaratCash (narrativa de confianza)
- Valores: transparencia, respeto, seguridad
- Conexión emocional: "Por qué hacemos esto"
- Imágenes generadas con IA (objetos/texturas de oro, no caras falsas)
- Servicio en español como diferenciador explícito

#### 4.5 Contacto
- Formulario: nombre, teléfono, qué tienes, zona de Phoenix
- Botón de WhatsApp directo
- Número de teléfono click-to-call
- Mapa del área de servicio (Phoenix metro, sin dirección física marcada)
- Horarios de atención

#### Elementos globales
- **Nav:** Logo + links + CTA "Vender mi oro"
- **Footer dark:** logo, links, canales de contacto, disclaimer legal, ciudades servidas
- **WhatsApp flotante:** botón sticky en todas las páginas
- **Tracking:** Meta Pixel + Conversions API + Google Analytics 4

### Diseño visual
- Secciones dark/light alternadas con cortes limpios (sin gradientes de transición)
- Animaciones GSAP scroll-triggered en cada sección
- Mobile-first (mayoría del tráfico hispano viene de móvil)
- Tipografía sans-serif moderna, weight bold para títulos

---

## 5. Contenido IA (Primera Ronda)

### Para el sitio web
- Copy completo de las 5 páginas (headlines, cuerpo, CTAs, FAQ)
- Imágenes generadas con IA: close-ups de piezas de oro, báscula, texturas doradas
- Iconografía custom alineada a la marca

### Para redes sociales (15-20 posts iniciales)
- **4-5 educativos:** "Cómo saber cuántos kilates tiene tu joyería", "Qué es el spot price", "Diferencia entre oro 10k y 14k"
- **4-5 de precio/urgencia:** "El oro hoy está a $X — tu cadena de 14k podría valer $Y"
- **3-4 de proceso/confianza:** "Así evaluamos tu oro paso a paso", "Por qué nos reunimos en lugares públicos"
- **2-3 de cobertura:** "Servimos Mesa, Tempe, Chandler, Gilbert..." por zona
- **2-3 de CTA directo:** "¿Tienes oro que no usas? Escríbenos hoy"

### Para ads (6-8 creativos iniciales)
- 2-3 imágenes estáticas con precio del oro + CTA
- 2-3 carousels (proceso paso a paso, tipos de oro que compramos)
- 1-2 videos cortos / motion graphics (precio subiendo, proceso animado)

### Canales sociales a crear
- Facebook Page (prioridad #1)
- Instagram (prioridad #2)
- Google Business Profile como service-area business (prioridad #1)
- WhatsApp Business (canal de conversión)
- TikTok (prioridad #3, para después)

### Reglas de contenido IA
- NO generar caras de personas como "equipo" o "clientes" — se ve falso
- NO inventar testimonios — placeholder hasta tener reales
- NO generar fotos de oficina o storefront que no existe
- SÍ usar close-ups de oro, texturas, objetos, herramientas
- SÍ usar motion graphics y diseño gráfico

---

## 6. Campañas y Conversión

### Canal principal: Meta (Facebook + Instagram)

**Configuración:**
- Presupuesto inicial: $500-$1,000/mes
- Audiencia: hispanos en Phoenix metro area, 25-60 años, en español
- Formato principal: Lead Form Ads (usuario no sale de Meta)
- Categoría especial: "Financial Products and Services" (obligatorio)

### Funnel de conversión

```
Ad en Facebook/IG
    ↓
Lead Form (nombre, teléfono, qué tiene, zona)
    ↓
Respuesta inmediata (<5 min): WhatsApp automático o llamada
    ↓
Pre-calificación: fotos de las piezas, estimado preliminar
    ↓
Coordinar cita: lugar público, día y hora
    ↓
Encuentro: evaluación frente al cliente, oferta
    ↓
Pago inmediato si acepta
    ↓
Solicitar reseña en Google (post-transacción)
```

### KPIs objetivo

| Métrica | Objetivo |
|---|---|
| CPL (costo por lead) | $15-$30 |
| Lead → Cita | 30-40% |
| Cita → Transacción | 50-60% |
| Margen bruto/transacción | $100-$300 |
| Tiempo de respuesta al lead | <5 minutos |

### Google Business Profile
- Tipo: service-area business (no muestra dirección, sí cobertura)
- Categoría: "Gold Buyer" o "Jewelry Buyer"
- Idioma: español
- Posts semanales con precio del oro
- Solicitar reseña post-transacción

### CRM (arranque simple)
- HubSpot Free o Google Sheets para iniciar
- Pipeline: lead recibido → contactado → cita agendada → completado → reseña solicitada
- Regla: ningún lead se pierde por falta de seguimiento

---

## 7. Lo que NO incluye esta fase

- Licencia de Secondhand Dealer (se tramita al acercarse a $50K)
- Programa AML formal (ídem)
- Oficina física / storefront
- Google Ads (fase posterior)
- Sitio en inglés (fase posterior)
- Blog / SEO de contenido (fase posterior)
- Sistema de citas automatizado (fase posterior — por ahora coordinación manual)
- Segunda ubicación o expansión geográfica

---

## 8. Orden de Ejecución

1. **Identidad de marca** — Expandir brand kit desde el logo existente
2. **Diseño en Stitch** — Diseñar todas las pantallas del sitio con referencias premium
3. **Implementación web** — Construir en Astro + GSAP + CSS custom → Vercel
4. **Perfiles sociales** — Crear Facebook, Instagram, GBP, WhatsApp Business
5. **Contenido IA** — Generar primera ronda de posts y creativos para ads
6. **Configuración de ads** — Meta Business Manager, Pixel, audiencias
7. **Lanzamiento** — Activar campañas + publicar contenido + abrir canales
