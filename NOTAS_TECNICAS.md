# Notas Técnicas - Portfolio Landing Page

## Decisiones de Arquitectura

### API Route de Contacto

#### Problema con React Email Components en API Routes
**Fecha**: 2024-10-21

**Problema detectado:**
Al intentar importar y usar el componente `ContactEmail.jsx` de React Email directamente en la API route `/api/contact.js` usando `@react-email/components` y la función `render()`, se producían errores en tiempo de ejecución debido a problemas de compatibilidad entre:
- React Email components (diseñados para SSR/build time)
- Next.js API routes (serverless functions)
- Turbopack/Webpack bundling

**Solución implementada:**
En lugar de importar el componente React Email, se optó por crear el HTML del email directamente en el API route usando template strings. Esta solución:

1. ✅ **Evita problemas de bundling**: No requiere importar componentes JSX en API routes
2. ✅ **Mejor performance**: No hay overhead de renderizado de React
3. ✅ **Más control**: HTML inline es más fácil de debuggear
4. ✅ **Portabilidad**: El template puede ser fácilmente modificado o extraído a una función helper

**Código final:**
```javascript
// API route simplificado sin dependencias de React Email
const emailHtml = `
  <!DOCTYPE html>
  <html>
    <!-- Template HTML inline -->
  </html>
`;

await resend.emails.send({
  html: emailHtml,
  // ...
});
```

**Alternativas consideradas:**
1. ❌ Usar `render()` de `@react-email/components`: Causaba errores de bundling
2. ❌ Usar `renderToStaticMarkup()` de React: Innecesariamente complejo
3. ✅ **HTML inline**: Solución simple y efectiva

### Componente ContactEmail.jsx

El archivo `src/emails/ContactEmail.jsx` se mantiene como referencia y documentación del diseño del email, pero NO se usa en producción. Sirve como:
- Documentación visual del template
- Posible uso futuro con herramientas de preview de React Email
- Referencia para mantener consistencia de diseño

---

## Configuración de Variables de Entorno

### Resend API

**Variables requeridas:**
```bash
RESEND_API_KEY=re_your_api_key
NEXT_PUBLIC_RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Importante:**
- `RESEND_API_KEY`: Solo accesible en servidor (sin `NEXT_PUBLIC_`)
- `NEXT_PUBLIC_RESEND_FROM_EMAIL`: Necesita ser pública para mostrar info al usuario (opcional)

### Opciones de Email de Envío

1. **Dominio de prueba de Resend** (recomendado para desarrollo):
   - Email: `onboarding@resend.dev`
   - Sin configuración adicional
   - Límite: 100 emails/día

2. **Dominio personalizado** (recomendado para producción):
   - Email: `contact@tudominio.com`
   - Requiere: Verificación de dominio con registros DNS (SPF, DKIM, DMARC)
   - Sin límite diario (solo el límite mensual del plan)

---

## Validación de Formularios

### Doble Validación con Zod

Se implementa validación tanto en cliente como en servidor:

**Cliente** (`src/components/sections/Contact.jsx`):
```javascript
const contactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});
```

**Servidor** (`src/pages/api/contact.js`):
```javascript
const contactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});
```

**Razón:**
- **Cliente**: Mejor UX, feedback inmediato
- **Servidor**: Seguridad, nunca confiar en datos del cliente

---

## Manejo de Errores

### Estrategia de Error Handling

1. **Validación de datos**: Error 400 con detalles de Zod
2. **Configuración faltante**: Error 500 con mensaje descriptivo
3. **Errores de Resend**: Error 500 con detalles del error
4. **Errores desconocidos**: Error 500 genérico

### Logs

Todos los errores se registran en consola con `console.error()` para facilitar debugging en desarrollo y producción.

---

## Performance

### Optimizaciones Implementadas

1. **Static Generation**: Página principal usa `getStaticProps` con ISR
2. **Image Optimization**: Uso de Sanity Image URL builder
3. **Code Splitting**: Automático con Next.js
4. **Lazy Loading**: Componentes se cargan bajo demanda

### Métricas Objetivo

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

---

## Seguridad

### Medidas Implementadas

1. **Validación de entrada**: Zod en cliente y servidor
2. **Rate limiting**: A implementar (recomendación)
3. **CORS**: Manejado por Next.js automáticamente
4. **API Keys**: Nunca expuestas al cliente
5. **SQL Injection**: No aplica (no usamos SQL directamente)
6. **XSS**: React escapa automáticamente el contenido

### Recomendaciones Futuras

- [ ] Implementar rate limiting con Redis o similar
- [ ] Agregar Google reCAPTCHA v3
- [ ] Configurar CORS explícitamente si se necesita
- [ ] Implementar logging más robusto (Sentry, LogRocket)

---

## Testing

### Áreas a Testear

1. **Formulario de contacto**:
   - Validación de campos
   - Envío exitoso
   - Manejo de errores
   - Estados de carga

2. **API Route**:
   - Validación de datos
   - Envío de email
   - Error handling
   - Variables de entorno

3. **Responsive Design**:
   - Mobile (320px - 768px)
   - Tablet (768px - 1024px)
   - Desktop (1024px+)

---

## Dependencias Críticas

### Principales
- `next@15.5.6`: Framework
- `resend@6.2.0`: Servicio de email
- `zod@3.25.76`: Validación de schemas
- `react-hook-form@7.65.0`: Manejo de formularios
- `@react-email/components@0.5.7`: Templates de email (referencia)

### Notas sobre Versiones
- Next.js 15.5.6 usa Turbopack por defecto
- Tailwind CSS 4 requiere configuración específica
- React 19.1.0 es la versión estable más reciente

---

**Última actualización**: 2024-10-21
**Autor**: Developer
**Versión**: 1.0
