# Plan de Desarrollo - Portfolio Landing Page

## Resumen Ejecutivo
Desarrollo de una página de inicio profesional para un programador utilizando:
- **Frontend**: Next.js 15 con Pages Router, Tailwind CSS 4
- **Componentes**: Aceternity UI Library via ShadCn MCP
- **CMS**: Sanity (proyectos y tecnologías)
- **Email**: Resend con React Email
- **i18n**: Español (es_MX) e Inglés (en_US)

---

## Selección de Componentes Aceternity

### 1. Sección Hero
**Componente**: `@aceternity/hero-highlight`
- Efectos de resaltado de texto profesionales
- Primera impresión impactante
- Soporte para tema oscuro

### 2. Sección About Me
**Componente**: `@aceternity/text-generate-effect`
- Generación animada de texto para presentación personal
- Layout limpio y legible

### 3. Sección Tecnologías
**Componente**: `@aceternity/animated-tooltip`
- Perfecto para mostrar stack tecnológico
- Efectos interactivos al pasar el ratón
- Muestra iconos con descripciones al hacer hover

### 4. Sección Proyectos
**Componente Principal**: `@aceternity/3d-card`
- Efecto 3D inmersivo para proyectos
- Muestra: título, descripción corta, imagen, badges

**Modal**: `@aceternity/animated-modal`
- Se abre al hacer clic en tarjeta
- Contenido: descripción completa, galería (3 imágenes), enlaces, tecnologías

### 5. Sección Contacto
**Componente**: `@aceternity/input`
- Inputs estilizados con estética Aceternity
- Validación con react-hook-form + zod
- Integración con Resend para envío de emails

---

## Stack Tecnológico Destacado

**Tecnologías a destacar en el sitio:**
- Next.js
- ShadCn
- Tailwind CSS
- Sanity
- React Hook Form
- Zod
- Supabase

---

## Estructura de Carpetas

```
src/
├── pages/
│   ├── index.js                    # Página de inicio
│   ├── api/
│   │   └── contact.js              # Endpoint Resend
│   ├── _app.js                     # App con i18n provider
│   └── _document.js
├── components/
│   ├── ui/                         # Componentes Aceternity
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Technologies.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── ProjectCard.jsx             # Card 3D
│   ├── ProjectModal.jsx            # Modal animado
│   ├── LanguageSwitcher.jsx        # Toggle idioma
│   └── Layout.jsx                  # Layout principal
├── context/
│   └── LanguageContext.js          # Contexto i18n
├── lib/
│   ├── sanity.js                   # Cliente Sanity
│   ├── sanityQuery.js              # Queries GROQ
│   ├── imageUrl.js                 # URL builder Sanity
│   └── translations.js             # Helper traducciones
├── locales/
│   ├── es.json                     # Traducciones español
│   └── en.json                     # Traducciones inglés
├── emails/
│   └── ContactEmail.jsx            # Template React Email
└── styles/
    └── globals.css                 # Estilos globales
```

---

## Fases de Desarrollo

### Fase 1: Configuración Inicial ✅ COMPLETADA
- [x] Instalar dependencias (framer-motion, react-icons, react-hook-form, zod, @react-email/components)
- [x] Agregar componentes Aceternity con ShadCn CLI
- [x] Configurar variables de entorno (Sanity, Resend)
- [x] Actualizar tailwind.config para tema oscuro
- [x] Crear archivo .env.example para documentación

### Fase 2: Estructura Base
- [ ] Crear componente Layout con navegación
- [ ] Implementar LanguageSwitcher (header + footer)
- [ ] Crear proveedor de contexto i18n
- [ ] Configurar esquema de colores oscuros

### Fase 3: Desarrollo de Secciones
- [ ] Sección Hero (hero-highlight)
- [ ] Sección About (text-generate-effect)
- [ ] Sección Tecnologías (animated-tooltip)
- [ ] Sección Proyectos (3d-card + animated-modal)
- [ ] Sección Contacto (inputs + form)

### Fase 4: Integración Sanity
- [ ] Crear queries GROQ para proyectos
- [ ] Crear queries GROQ para tecnologías
- [ ] Implementar fetch con getStaticProps
- [ ] Optimizar imágenes con @sanity/image-url
- [ ] Renderizar portable text

### Fase 5: Formulario y Email
- [ ] Crear validación con react-hook-form + zod
- [ ] Crear template React Email
- [ ] Implementar API route /api/contact
- [ ] Configurar Resend
- [ ] Agregar estados de éxito/error

### Fase 6: Internacionalización
- [ ] Crear archivos de traducciones (es.json, en.json)
- [ ] Implementar selector de idioma persistente
- [ ] Traducir contenido estático
- [ ] Configurar meta tags por idioma

### Fase 7: Optimización y Testing
- [ ] Optimizar imágenes
- [ ] Agregar loading states
- [ ] Testing responsivo
- [ ] Testing de formulario
- [ ] Audit de performance (Lighthouse)
- [ ] Cross-browser testing

---

## Queries GROQ

### Obtener Tecnologías (Ordenadas por categoría)
```groq
*[_type == "tecnologia"] | order(categoria asc, nombre asc)
```

### Obtener Proyectos Destacados (Ordenados)
```groq
*[_type == "proyecto" && destacado == true] | order(orden asc) {
  _id,
  titulo,
  descripcionCorta,
  descripcionLarga,
  imagenPrincipal,
  galeria,
  tecnologias[]->{_id, nombre, icono, color},
  linkDemo,
  linkGitHub,
  fechaParticipacion,
  orden
}
```

---

## Configuración i18n

**Idioma por defecto**: Español (es_MX)

**Persistencia**: localStorage con key `preferredLanguage`

**Ubicación selector**:
- Header (navegación principal)
- Footer

---

## Integraciones Externas

### Sanity
- Fetch de proyectos y tecnologías
- Gestión de imágenes con hotspot

### Resend
- Envío de emails desde formulario de contacto
- Template con React Email

---

## Consideraciones de Diseño

- **Tema**: Colores oscuros
- **Responsive**: Mobile first, tablet, desktop
- **Animaciones**: Smooth y profesionales (Framer Motion)
- **Accesibilidad**: Textos alt en imágenes, ARIA labels
- **SEO**: Meta tags dinámicos por idioma

---

## Dependencias Principales

```json
{
  "dependencies": {
    "next": "15.5.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next-sanity": "^11.5.5",
    "@sanity/image-url": "^1.2.0",
    "resend": "^6.2.0",
    "react-icons": "^4.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "framer-motion": "^11.x",
    "@react-email/components": "^0.x",
    "tailwindcss": "^4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "shadcn": "^3.4.2"
  }
}
```

---

## Notas Importantes

1. **Pages Router**: Se mantiene la estructura existente (no migrar a App Router)
2. **Colores oscuros**: Implementar tema oscuro en todos los componentes
3. **Sanity**: Utilizar el cliente existente en `src/lib/sanity.js`
4. **Portable Text**: Usar componente personalizado para descripciones largas
5. **SEO**: Generar meta tags dinámicos según idioma seleccionado

---

**Fecha de creación**: 2024-10-21
**Última actualización**: 2024-10-21
**Estado**: ✅ Fase 1 Completada - Fase 2 en Progreso
**Versión**: 1.1
