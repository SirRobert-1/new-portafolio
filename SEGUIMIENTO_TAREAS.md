# Seguimiento de Tareas - Landing Page Profesional

**Proyecto**: Portafolio Web Profesional con Aceternity UI
**Fecha de Inicio**: 2025-10-20
**Estado General**: ⏳ En Planificación

---

## 📋 FASE 1: SETUP Y CONFIGURACIÓN

### 1.1 Instalación de Dependencias
- [ ] Instalar `next-i18next` para multiidioma
- [ ] Instalar `react-hook-form` para formularios
- [ ] Instalar `zod` para validación
- [ ] Instalar `@sanity/client` y `@sanity/image-url`
- [ ] Instalar `resend` para envío de emails
- [ ] Instalar `framer-motion` (verificar si ya está)
- [ ] Instalar `@tabler/icons-react` (iconos para Aceternity)
- [ ] Actualizar `package.json`

### 1.2 Configuración de Tailwind CSS
- [ ] Verificar configuración actual
- [ ] Agregar colores personalizados dark mode
- [ ] Configurar tipografía (Inter)
- [ ] Agregar plugins necesarios

### 1.3 Instalación de Componentes Aceternity
- [ ] Instalar `AnimatedTooltip`
- [ ] Instalar `3D Card` (CardContainer, CardBody, CardItem)
- [ ] Instalar `FloatingNav`
- [ ] Instalar `BackgroundBeams`
- [ ] Instalar `HeroHighlight` y `Highlight`
- [ ] Instalar `TypewriterEffect`
- [ ] Instalar `BentoGrid` y `BentoGridItem`
- [ ] Instalar `SparklesCore` (opcional)

### 1.4 Setup de i18n
- [ ] Crear archivos de configuración i18n
- [ ] Crear traducción `es.json`
- [ ] Crear traducción `en.json`
- [ ] Configurar middleware de Next.js

### 1.5 Variables de Entorno
- [ ] Crear `.env.local`
- [ ] Agregar `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Agregar `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Agregar `SANITY_API_TOKEN`
- [ ] Agregar `RESEND_API_KEY`
- [ ] Agregar `NEXT_PUBLIC_APP_URL`

---

## 📋 FASE 2: ESTRUCTURA BASE

### 2.1 Layout Principal
- [ ] Crear `app/layout.tsx` con providers
- [ ] Configurar estructura base (NavBar, main, footer)
- [ ] Aplicar estilos globales dark mode
- [ ] Configurar fuentes (Inter)

### 2.2 Navegación Flotante
- [ ] Crear componente `FloatingNav`
- [ ] Agregar items de navegación
- [ ] Integrar `Language Switcher`
- [ ] Estilos dark mode
- [ ] Testing responsivo

### 2.3 Language Switcher
- [ ] Crear componente `LanguageSwitcher`
- [ ] Integrar con i18n
- [ ] Guardar preferencia en localStorage
- [ ] Icono de idiomas (banderas o texto)
- [ ] Posicionar en navegación

### 2.4 Rutas Multiidioma
- [ ] Configurar estructura de rutas `/es` y `/en`
- [ ] Crear layout por idioma
- [ ] Página principal por idioma
- [ ] Redirección por preferencia del navegador

---

## 📋 FASE 3: SECCIONES CORE

### 3.1 Hero Section
- [ ] Crear componente `Hero.tsx`
- [ ] Integrar `BackgroundBeams`
- [ ] Integrar `TypewriterEffect`
- [ ] Integrar `HeroHighlight`
- [ ] Traducir textos del Hero
- [ ] CTA principal (botón "Ver Proyectos")
- [ ] Responsive design
- [ ] Animaciones suaves

### 3.2 About Section
- [ ] Crear componente `About.tsx`
- [ ] Diseño con texto + imagen
- [ ] Estadísticas destacadas (años, proyectos, etc)
- [ ] Fade-in animations
- [ ] Layout alternado izquierda/derecha
- [ ] Traducir contenido
- [ ] Responsivo mobile/tablet/desktop

### 3.3 Technologies Section
- [ ] Crear componente `Technologies.tsx`
- [ ] Usar `AnimatedTooltip`
- [ ] Agregar 6+ tecnologías (Next.js, React, Tailwind, etc)
- [ ] Iconos para cada tecnología
- [ ] Descripciones en tooltip
- [ ] Grid responsive
- [ ] Traducir nombres y descripciones

### 3.4 Projects Section
- [ ] Crear componente `Projects.tsx`
- [ ] Usar `3D Card Effect`
- [ ] Usar `BentoGrid` para layout
- [ ] Diseño individual de card:
  - [ ] Imagen del proyecto
  - [ ] Título
  - [ ] Descripción
  - [ ] Tecnologías usadas
  - [ ] Links (GitHub, Demo)
- [ ] Traducir textos de proyectos
- [ ] Responsivo

### 3.5 Footer/Contact Preview
- [ ] Crear componente `Footer.tsx`
- [ ] Links de contacto
- [ ] Social links
- [ ] Copyright y fecha

---

## 📋 FASE 4: FORMULARIO Y CONTACTO

### 4.1 Componente de Formulario
- [ ] Crear componente `ContactForm.tsx`
- [ ] Integrar `react-hook-form`
- [ ] Campos: nombre, email, asunto, mensaje
- [ ] Estilos con Tailwind dark mode
- [ ] Responsive

### 4.2 Validación con Zod
- [ ] Crear schema `contactSchema`
- [ ] Validar nombre (mínimo 2 caracteres)
- [ ] Validar email (formato válido)
- [ ] Validar asunto (mínimo 5 caracteres)
- [ ] Validar mensaje (mínimo 10 caracteres)
- [ ] Mensajes de error traducidos

### 4.3 Integración Resend
- [ ] Crear API route `/api/send-email`
- [ ] Configurar Resend client
- [ ] Template de email profesional
- [ ] Envío de email desde formulario
- [ ] Manejo de errores
- [ ] Rate limiting (opcional)

### 4.4 Feedback del Usuario
- [ ] Mensaje de éxito al enviar
- [ ] Indicador de loading
- [ ] Manejo de errores con mensajes claros
- [ ] Reset de formulario tras envío
- [ ] Traducir mensajes de feedback

### 4.5 Sección Contact en Landing
- [ ] Crear componente `Contact.tsx`
- [ ] Integrar formulario
- [ ] Información de contacto adicional
- [ ] Email de contacto
- [ ] Social links
- [ ] Background animado (opcional con SparklesCore)

---

## 📋 FASE 5: INTEGRACIONES EXTERNAS

### 5.1 Sanity CMS Setup
- [ ] Crear proyecto en Sanity
- [ ] Definir schema para Proyectos
- [ ] Definir schema para Configuración
- [ ] Crear cliente Sanity en proyecto
- [ ] Configurar API key

### 5.2 Queries y Datos
- [ ] Query para obtener proyectos
- [ ] Query para obtener configuración
- [ ] Crear tipos TypeScript para datos
- [ ] Implementar caché de datos
- [ ] Testing de queries

### 5.3 Integración en Components
- [ ] Projects Section obtiene datos de Sanity
- [ ] Fallback cuando no hay datos
- [ ] Loading states
- [ ] Error handling
- [ ] Regeneración estática (ISR)

### 5.4 Image Optimization
- [ ] Usar `next/image` para imágenes Sanity
- [ ] Configurar `@sanity/image-url`
- [ ] Sizes responsivos
- [ ] Formato moderno (webp)

---

## 📋 FASE 6: PULIDO Y DEPLOY

### 6.1 Testing Responsivo
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px+)
- [ ] Navegadores: Chrome, Firefox, Safari, Edge
- [ ] Testing en dispositivos reales

### 6.2 Optimizaciones
- [ ] Minificar CSS/JS
- [ ] Lazy loading de imágenes
- [ ] Code splitting
- [ ] Tree shaking
- [ ] Compression de assets

### 6.3 SEO
- [ ] Meta tags en todas las páginas
- [ ] og:image, og:title, og:description
- [ ] Twitter Card meta tags
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Structured data (JSON-LD)
- [ ] Validación con Google Search Console

### 6.4 Accesibilidad
- [ ] ARIA labels en botones
- [ ] ARIA labels en iconos
- [ ] Keyboard navigation completa (Tab, Enter, Esc)
- [ ] Color contrast WCAG AA
- [ ] Alt text en todas las imágenes
- [ ] Form labels asociados
- [ ] Focus visible states

### 6.5 Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals optimizados
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Testing con PageSpeed Insights

### 6.6 Deploy
- [ ] Configurar Vercel o hosting
- [ ] Setup de dominio
- [ ] SSL/TLS certificado
- [ ] CI/CD pipeline (GitHub Actions opcional)
- [ ] Monitoring y error tracking

### 6.7 Testing Final
- [ ] Formulario funciona completamente
- [ ] Emails se envían correctamente
- [ ] Multiidioma sin errores
- [ ] Animaciones fluidas
- [ ] No hay console errors
- [ ] Performance aceptable
- [ ] Todo responsivo

---

## 📊 ESTADÍSTICAS DEL PROYECTO

**Total de Tareas**: 85+
**Completadas**: 0
**En Progreso**: 0
**Pendientes**: 85+

---

## 🎯 HITOS PRINCIPALES

1. ✅ **Planificación completada** (Actual)
2. ⏳ **Setup completado** (SIGUIENTE)
3. ⏳ **Estructura base lista**
4. ⏳ **Secciones core funcionales**
5. ⏳ **Formulario e integraciones**
6. ⏳ **Datos desde Sanity**
7. ⏳ **Deployed a producción**

---

## 📝 NOTAS IMPORTANTES

- Mantener dark mode consistente en todas las secciones
- Revisar responsive design en cada paso
- Traducir TODO el contenido (no dejar defaults en inglés)
- Testing de email (usar sandbox de Resend)
- Documentar decisiones de diseño
- Commits frecuentes con mensajes descriptivos

---

## 🔄 PRÓXIMOS PASOS INMEDIATOS

1. Comenzar Fase 1 (Setup y Configuración)
2. Instalar todas las dependencias necesarias
3. Configurar variables de entorno
4. Crear estructura de carpetas
5. Primer commit con setup base

---

**Última actualización**: 2025-10-20
**Responsable**: Desarrollador
**Estimación Total**: 3-4 semanas
