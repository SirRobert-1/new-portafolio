import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

export default function ContactEmail({ name, email, message }) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo Mensaje de Contacto</Heading>

          <Text style={text}>
            Has recibido un nuevo mensaje desde tu portafolio:
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Nombre:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Mensaje:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Este mensaje fue enviado desde el formulario de contacto de tu portafolio.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#171717",
  borderRadius: "8px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  lineHeight: "1.25",
};

const text = {
  color: "#a3a3a3",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 20px",
};

const hr = {
  borderColor: "#404040",
  margin: "20px 0",
};

const section = {
  margin: "0 0 20px",
};

const label = {
  color: "#737373",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const value = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0 0 16px",
};

const messageText = {
  color: "#ffffff",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  padding: "16px",
  backgroundColor: "#262626",
  borderRadius: "6px",
  whiteSpace: "pre-wrap",
};

const footer = {
  color: "#737373",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center",
};
