# Configuración de Resend para el Formulario de Contacto

## Pasos para configurar Resend

### 1. Crear cuenta en Resend
1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. Obtener API Key
1. Ve a [https://resend.com/api-keys](https://resend.com/api-keys)
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "Portfolio Contact Form")
4. Selecciona los permisos necesarios:
   - ✅ "Sending access" (envío de emails)
5. Copia la API Key generada

### 3. Configurar Email de Envío

Tienes dos opciones:

#### Opción A: Usar dominio de prueba de Resend (más rápido)
- Email: `onboarding@resend.dev`
- **Ventajas**: No requiere verificación de dominio
- **Desventajas**: Los emails pueden ir a spam, limitado a 100 emails/día

#### Opción B: Usar tu propio dominio (recomendado para producción)
1. Ve a [https://resend.com/domains](https://resend.com/domains)
2. Haz clic en "Add Domain"
3. Ingresa tu dominio (ej: `tudominio.com`)
4. Configura los registros DNS según las instrucciones de Resend:
   - SPF
   - DKIM
   - DMARC
5. Espera a que se verifique el dominio (puede tomar hasta 48 horas)
6. Una vez verificado, puedes usar emails como:
   - `contact@tudominio.com`
   - `noreply@tudominio.com`
   - `hello@tudominio.com`

### 4. Configurar Variables de Entorno

Edita tu archivo `.env.local`:

```bash
# Resend Email Configuration
RESEND_API_KEY="re_tu_api_key_aquí"
NEXT_PUBLIC_RESEND_FROM_EMAIL="onboarding@resend.dev"  # O tu email verificado
```

**IMPORTANTE:**
- Si usas Resend's test domain: `onboarding@resend.dev`
- Si usas tu dominio: `contact@tudominio.com` (debe estar verificado)

### 5. Probar el Formulario

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a la sección de contacto en tu sitio

3. Llena el formulario y envíalo

4. Verifica que el email llegue a tu bandeja de entrada
   - El email se enviará a la dirección configurada en `NEXT_PUBLIC_RESEND_FROM_EMAIL`
   - Puedes responder directamente al remitente (gracias al campo `replyTo`)

### 6. Monitoreo de Emails

1. Ve al [Dashboard de Resend](https://resend.com/emails)
2. Aquí puedes ver:
   - Emails enviados
   - Estado de entrega
   - Tasa de apertura
   - Errores (si los hay)

## Límites del Plan Gratuito

- **3,000 emails/mes**
- 100 emails/día
- 1 dominio verificado
- Retención de logs por 7 días

## Solución de Problemas

### Error: "Email service not configured"
- Verifica que las variables de entorno estén correctamente configuradas
- Reinicia el servidor de desarrollo después de cambiar `.env.local`

### Error: "Invalid API key"
- Verifica que la API key esté correctamente copiada en `.env.local`
- Asegúrate de que la API key tenga permisos de "Sending access"

### Los emails no llegan
- Si usas `onboarding@resend.dev`, revisa la carpeta de spam
- Si usas tu dominio, verifica que esté completamente verificado en Resend
- Verifica los logs en el dashboard de Resend

### Error: "Email address is not verified"
- Asegúrate de usar el email de prueba de Resend (`onboarding@resend.dev`)
- O verifica tu dominio en el panel de Resend antes de usar un email personalizado

## Mejoras Futuras

- Implementar rate limiting para prevenir spam
- Agregar Google reCAPTCHA
- Configurar múltiples destinatarios
- Implementar templates personalizados con variables dinámicas
- Agregar notificaciones en tiempo real con webhooks

---

**Última actualización:** 2024-10-21
