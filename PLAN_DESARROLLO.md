# Plan de Desarrollo - Landing Page Profesional

## Resumen del Proyecto
Crear una landing page moderna y profesional para un portafolio de programador con componentes animados de Aceternity UI, diseño dark mode, y soporte multiidioma (Español e Inglés).

---

## 1. ARQUITECTURA Y TECNOLOGÍAS

### Stack Tecnológico
- **Framework**: Next.js 15
- **Estilado**: Tailwind CSS
- **Componentes**: Aceternity UI (a través de shadcn)
- **Validación**: React Hook Form + Zod
- **Email**: Resend
- **CMS/Datos**: Sanity
- **Animaciones**: Framer Motion (incluido en Aceternity)
- **Multiidioma**: i18n (next-i18next)

### Estructura de Carpetas Recomendada
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── animated-tooltip.tsx
│   │   ├── 3d-card.tsx
│   │   ├── floating-navbar.tsx
│   │   └── ... (otros componentes de Aceternity)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Technologies.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── Navigation.tsx
│   └── LanguageSwitcher.tsx
├── lib/
│   ├── i18n.ts
│   ├── sanity.ts
│   └── resend.ts
├── translations/
│   ├── es.json
│   ├── en.json
└── types/
    └── index.ts
```

---

## 2. SECCIONES Y COMPONENTES RECOMENDADOS

### 2.1 Barra de Navegación
**Componente**: FloatingNav (Aceternity)
- Navegación intelligente que se oculta al bajar y aparece al subir
- Links a: Home, About, Technologies, Projects, Contact
- Language switcher integrado
- Dark mode compatible

### 2.2 Hero Section
**Componentes**:
- HeroHighlight con TypewriterEffect (Aceternity)
- BackgroundBeams (Aceternity) de fondo
- Typewriter: "Soy [Nombre] | Desarrollador Full Stack | Creador de Experiencias Digitales"
- CTA prominente: "Ver Mis Proyectos"

**Justificación**:
- Impacto visual inmediato
- Introduce al usuario de forma atractiva
- TypewriterEffect crea engagement

### 2.3 Sección "Acerca de Mí"
**Componentes**:
- Contenido textual con fade-in animation
- Foto de perfil con efecto parallax
- Breve descripción profesional
- Estadísticas destacadas (años de experiencia, proyectos, clientes)

**Diseño**:
- Alternancia izquierda/derecha para texto e imagen
- Responsive en mobile

### 2.4 Sección Tecnologías
**Componente**: AnimatedTooltip (Aceternity)
- Mostrar tecnologías: Next.js, React, Tailwind CSS, Sanity, React Hook Form, Zod
- Cada una con icono y descripción tooltip
- Al hover muestra nombre completo y descripción breve
- Distribución en grid responsivo

**Justificación**:
- AnimatedTooltip perfecto para mostrar skills
- Interactivo y visualmente atractivo

### 2.5 Sección Proyectos
**Componentes**:
- 3D Card Effect (Aceternity) para cada proyecto
- BentoGrid (Aceternity) como layout
- Cada card con: imagen, título, descripción, tecnologías, link

**Datos**:
- Traer de Sanity CMS
- Mostrar 3-6 proyectos destacados
- Cards con efecto 3D al hacer hover

**Justificación**:
- 3D Card Effect proporciona interactividad memorable
- BentoGrid crea layout profesional y moderno

### 2.6 Sección Contacto
**Componentes**:
- Formulario con React Hook Form + Zod
- Integración con Resend para envío de emails
- Validación en tiempo real
- Mensaje de éxito/error
- Background animado (SparklesCore opcional)

**Campos**:
- Nombre
- Email
- Asunto
- Mensaje
- Checkbox de privacidad

---

## 3. SOPORTE MULTIIDIOMA

### Idiomas Soportados
- **Español** (es_MX): Variante de México
- **Inglés** (en_MX): Variante México English

### Implementación
- Usar next-i18next para routing y traducciones
- Archivos JSON de traducciones separados
- Language switcher en navegación flotante
- Persistencia en localStorage

### Textos a Traducir
- Navegación
- Títulos de secciones
- Descripciones
- Labels de formulario
- Mensajes de validación
- CTAs

---

## 4. DISEÑO Y ESTILOS

### Color Scheme (Dark Mode)
- **Fondo Principal**: `#0a0e27` (Azul marino oscuro)
- **Fondo Secundario**: `#1a1f3a` (Azul más claro)
- **Acentos**: `#10b981` (Verde esmeralda) / `#3b82f6` (Azul)
- **Texto Principal**: `#ffffff` (Blanco)
- **Texto Secundario**: `#cbd5e1` (Gris claro)

### Tipografía
- **Títulos**: Inter Bold/SemiBold
- **Cuerpo**: Inter Regular/Medium

### Responsive Design
- Mobile First approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`

---

## 5. INTEGRACIONES

### Sanity CMS
- Modelos: Proyectos, Configuración, Blog (opcional)
- Queries GROQ para obtener datos
- Preview mode para cambios en tiempo real

### Resend
- API key en variables de entorno
- Template de email con branding
- Manejo de errores y reintentos
- Rate limiting

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

## 6. OPTIMIZACIONES

### Performance
- Image optimization (Next.js Image)
- Code splitting automático
- Lazy loading de componentes
- Compression de assets

### SEO
- Meta tags dinámicos
- Open Graph para compartir
- Sitemap.xml
- robots.txt

### Accesibilidad
- ARIA labels
- Keyboard navigation
- Color contrast (WCAG AA)
- Alt text en imágenes

---

## 7. FASES DE DESARROLLO

### Fase 1: Setup y Configuración
- [ ] Instalar dependencias
- [ ] Configurar Tailwind CSS
- [ ] Instalar componentes Aceternity
- [ ] Setup i18n
- [ ] Variables de entorno

### Fase 2: Estructura Base
- [ ] Crear layout principal
- [ ] FloatingNav
- [ ] Language Switcher
- [ ] Rutas con i18n

### Fase 3: Secciones Core
- [ ] Hero Section
- [ ] About Section
- [ ] Technologies Section
- [ ] Projects Section

### Fase 4: Formulario y Contacto
- [ ] Form Component
- [ ] Validación Zod
- [ ] Integración Resend
- [ ] Manejo de errores

### Fase 5: Integraciones Externas
- [ ] Sanity setup y queries
- [ ] Obtener proyectos desde CMS
- [ ] Deploy y testing

### Fase 6: Pulido y Deploy
- [ ] Testing responsivo
- [ ] Optimizaciones
- [ ] SEO final
- [ ] Deploy a producción

---

## 8. CONSIDERACIONES ESPECIALES

### Dark Mode
- Nativo en Tailwind con `dark:` utilities
- Toggle en navegación (opcional)
- Preferencia del sistema

### Rendimiento de Animaciones
- Usar `will-change` con cuidado
- Preferir transform y opacity
- Testing en dispositivos bajos

### Accesibilidad de Animaciones
- Respetar `prefers-reduced-motion`
- Fallbacks sin animación
- Contraste suficiente en todos los estados

---

## 9. CHECKLIST FINAL

- [ ] Todas las secciones funcionales
- [ ] Responsive en móvil, tablet, desktop
- [ ] Multiidioma funcionando
- [ ] Formulario validando y enviando emails
- [ ] Proyectos cargando desde Sanity
- [ ] Performance Lighthouse > 90
- [ ] SEO validado
- [ ] Accesibilidad WCAG AA
- [ ] Deploy exitoso
- [ ] Testing en diferentes navegadores

---

**Última actualización**: 2025-10-20
**Estado**: En Planificación
