import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  travelDate?: string;
  travelers?: string;
  japanWishes?: string;
  experienceType?: string;
  crmTag?: string;
  subject?: string;
  formId?: string;
  pagePath?: string;
};

type LeadChannel = "whatsapp" | "web-form";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "465");
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false";
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL ?? "reservaciones@viajespremium.com.mx";
const SMTP_TO_EMAIL = process.env.SMTP_TO_EMAIL ?? "grupo-santa-f@add.nocrm.io";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const LANDING_LABELS: Record<string, string> = {
  "japon-premium": "Japón PREMIUM®",
  "corea-premium": "Corea PREMIUM®",
  "europa-premium": "Europa PREMIUM®",
  "canada-premium": "Canadá PREMIUM®",
  "peru-premium": "Perú PREMIUM®",
  "chiapas-premium": "Chiapas PREMIUM®",
  "barrancas-premium": "Barrancas PREMIUM®",
  "yucatan-premium": "Yucatán PREMIUM®",
};

function getLandingIdFromPath(pagePath: string): string {
  const cleaned = pagePath.replace(/^\/+/, "");
  const firstSegment = cleaned.split("/")[0] ?? "";
  return firstSegment || "viajes-premium";
}

function getLandingLabel(pagePath: string): string {
  const landingId = getLandingIdFromPath(pagePath);
  return LANDING_LABELS[landingId] ?? "Viajes PREMIUM®";
}

function getOriginDomain(pagePath: string): string {
  const landingId = getLandingIdFromPath(pagePath);

  switch (landingId) {
    case "japon-premium":
      return "viajespremium.com.mx/japon-premium";
    case "corea-premium":
      return "viajespremium.com.mx/corea-premium";
    case "europa-premium":
      return "viajespremium.com.mx/europa-premium";
    case "canada-premium":
      return "viajespremium.com.mx/canada-premium";
    case "peru-premium":
      return "viajespremium.com.mx/peru-premium";
    case "chiapas-premium":
      return "viajespremium.com.mx/chiapas-premium";
    case "barrancas-premium":
      return "viajespremium.com.mx/barrancas-premium";
    case "yucatan-premium":
      return "viajespremium.com.mx/yucatan-premium";
    default:
      return "viajespremium.com";
  }
}

function getLeadChannel(formId: string): LeadChannel {
  return formId.startsWith("whatsapp-fab") ? "whatsapp" : "web-form";
}

function buildSubject(landingLabel: string): string {
  return `Solicitud de Cotización ${landingLabel} Front`;
}

function buildTagsDirective(rawCrmTag: string, landingLabel: string): string {
  const cleaned = rawCrmTag.replace(/^#tags\s*:/i, "").trim();
  const fallback = landingLabel.replace("®", "").trim();
  const tagValue = cleaned || fallback;
  return `#tags: ${tagValue}`;
}

function formatLine(label: string, value: string): string {
  return `${label}： ${value}`;
}

function formatTravelDate(value: string): string {
  const trimmed = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed || "No especificado";
  const [year, month, day] = trimmed.split("-");
  if (!year || !month || !day) return trimmed;
  return `${day}/${month}/${year}`;
}

export async function POST(request: Request) {
  try {
    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          error: "SMTP no configurado. Faltan SMTP_USER o SMTP_PASS.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as LeadPayload;
    const payload = {
      name: normalize(body.name),
      phone: normalize(body.phone),
      email: normalize(body.email),
      travelDate: normalize(body.travelDate),
      travelers: normalize(body.travelers),
      japanWishes: normalize(body.japanWishes),
      experienceType: normalize(body.experienceType),
      crmTag: normalize(body.crmTag),
      formId: normalize(body.formId) || "unknown-form",
      pagePath: normalize(body.pagePath) || "unknown-path",
    };

    const landingLabel = getLandingLabel(payload.pagePath);
    const originDomain = getOriginDomain(payload.pagePath);
    const channel = getLeadChannel(payload.formId);
    const subject = buildSubject(landingLabel);
    const tagsDirective = buildTagsDirective(payload.crmTag, landingLabel);
    const travelDateFormatted = formatTravelDate(payload.travelDate);
    const channelLabel = channel === "whatsapp" ? "WhatsApp" : "Formulario Web";

    const now = new Date();
    const dateStamp = now.toLocaleDateString("es-MX");
    const timeStamp = now.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    if (!payload.name || !payload.phone || !payload.email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan campos obligatorios (name, phone, email).",
        },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const textBody = [
      tagsDirective,
      `Solicitud de Cotización ${landingLabel}`,
      landingLabel,
      `El usuario te ha enviado sus datos desde ${originDomain}`,
      formatLine("Canal", channelLabel),
      formatLine("Nombre", payload.name),
      formatLine("Teléfono", payload.phone),
      formatLine("Correo", payload.email),
      formatLine("Tema de interés", payload.japanWishes || "No especificado"),
      formatLine("Fecha tentativa de viaje", travelDateFormatted),
      formatLine("No. de personas", payload.travelers || "No especificado"),
      formatLine("Tipo de experiencia", payload.experienceType || "No especificado"),
      formatLine("Comentarios", "No especificado"),
      formatLine("CRM Tag", payload.crmTag || tagsDirective),
      formatLine("Formulario", payload.formId),
      formatLine("Página", payload.pagePath),
      formatLine("Fecha", dateStamp),
      formatLine("Hora", timeStamp),
    ].join("\n");

    const htmlBody = `
      <h2>Solicitud de Cotización ${escapeHtml(landingLabel)}</h2>
      <p>${escapeHtml(tagsDirective)}</p>
      <p><strong>${escapeHtml(landingLabel)}</strong></p>
      <p>El usuario te ha enviado sus datos desde ${escapeHtml(originDomain)}</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr><th align="left">Canal:</th><td>${escapeHtml(channelLabel)}</td></tr>
        <tr><th align="left">Nombre:</th><td>${escapeHtml(payload.name)}</td></tr>
        <tr><th align="left">Teléfono:</th><td>${escapeHtml(payload.phone)}</td></tr>
        <tr><th align="left">Correo:</th><td>${escapeHtml(payload.email)}</td></tr>
        <tr><th align="left">Tema de interés:</th><td>${escapeHtml(payload.japanWishes || "No especificado")}</td></tr>
        <tr><th align="left">Fecha tentativa de viaje:</th><td>${escapeHtml(travelDateFormatted)}</td></tr>
        <tr><th align="left">No. de personas:</th><td>${escapeHtml(payload.travelers || "No especificado")}</td></tr>
        <tr><th align="left">Tipo de experiencia:</th><td>${escapeHtml(payload.experienceType || "No especificado")}</td></tr>
        <tr><th align="left">Comentarios:</th><td>No especificado</td></tr>
        <tr><th align="left">CRM Tag:</th><td>${escapeHtml(payload.crmTag || tagsDirective)}</td></tr>
        <tr><th align="left">Formulario:</th><td>${escapeHtml(payload.formId)}</td></tr>
        <tr><th align="left">Página:</th><td>${escapeHtml(payload.pagePath)}</td></tr>
        <tr><th align="left">Fecha:</th><td>${escapeHtml(dateStamp)}</td></tr>
        <tr><th align="left">Hora:</th><td>${escapeHtml(timeStamp)}</td></tr>
      </table>
    `;

    const info = await transporter.sendMail({
      from: `"Viajes Premium" <${SMTP_FROM_EMAIL}>`,
      to: SMTP_TO_EMAIL,
      replyTo: payload.email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      ok: true,
      messageId: info.messageId,
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : JSON.stringify(error);
    console.error("[API /api/leads] Error enviando correo", {
      details,
      error,
    });
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo enviar el correo de contacto.",
        details,
      },
      { status: 500 },
    );
  }
}
