import { Resend } from "resend";
import { z } from "zod";

// Esquema de validación con Zod (server-side)
const contactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export default async function handler(req, res) {
  // Solo aceptar POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validar datos del request
    const validatedData = contactSchema.parse(req.body);

    const { name, email, message } = validatedData;

    // Verificar variables de entorno
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return res.status(500).json({
        error: "Email service not configured",
        message: "Please configure RESEND_API_KEY in your environment variables"
      });
    }

    if (!process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL) {
      console.error("NEXT_PUBLIC_RESEND_FROM_EMAIL is not configured");
      return res.status(500).json({
        error: "Email service not configured",
        message: "Please configure NEXT_PUBLIC_RESEND_FROM_EMAIL in your environment variables"
      });
    }

    // Inicializar cliente de Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Crear HTML del email manualmente (más seguro que usar render de React Email en API routes)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
          <div style="margin: 0 auto; padding: 40px 20px; max-width: 600px; background-color: #171717; border-radius: 8px;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0 0 20px; line-height: 1.25;">
              Nuevo Mensaje de Contacto
            </h1>

            <p style="color: #a3a3a3; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
              Has recibido un nuevo mensaje desde tu portafolio:
            </p>

            <hr style="border: none; border-top: 1px solid #404040; margin: 20px 0;">

            <div style="margin: 0 0 20px;">
              <p style="color: #737373; font-size: 14px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                NOMBRE:
              </p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">
                ${name}
              </p>
            </div>

            <div style="margin: 0 0 20px;">
              <p style="color: #737373; font-size: 14px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                EMAIL:
              </p>
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 16px;">
                ${email}
              </p>
            </div>

            <div style="margin: 0 0 20px;">
              <p style="color: #737373; font-size: 14px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                MENSAJE:
              </p>
              <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 0; padding: 16px; background-color: #262626; border-radius: 6px; white-space: pre-wrap;">
                ${message}
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #404040; margin: 20px 0;">

            <p style="color: #737373; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
              Este mensaje fue enviado desde el formulario de contacto de tu portafolio.
            </p>
          </div>
        </body>
      </html>
    `;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL, // Envía a tu propio email
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: emailHtml,
      // Opción de reply-to para responder directamente al remitente
      replyTo: email,
    });

    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        error: "Failed to send email",
        details: error.message || error
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Manejar errores de validación de Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid form data",
        details: error.errors,
      });
    }

    // Error genérico
    return res.status(500).json({
      error: "Internal server error",
      details: error.message || "Unknown error"
    });
  }
}
