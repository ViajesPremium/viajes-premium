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

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "465");
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false";
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const SMTP_FROM_EMAIL =
  process.env.SMTP_FROM_EMAIL ?? "reservaciones@viajespremium.com.mx";
const SMTP_TO_EMAIL =
  process.env.SMTP_TO_EMAIL ?? "grupo-santa-f@add.nocrm.io";

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
      subject: normalize(body.subject) || "Nuevo Lead - Viajes Premium",
      formId: normalize(body.formId) || "unknown-form",
      pagePath: normalize(body.pagePath) || "unknown-path",
    };

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
      `Nuevo lead recibido`,
      ``,
      `Nombre: ${payload.name}`,
      `Celular: ${payload.phone}`,
      `Correo: ${payload.email}`,
      `Fecha aproximada de viaje: ${payload.travelDate || "No especificado"}`,
      `Numero de viajeros: ${payload.travelers || "No especificado"}`,
      `Intereses en Japon: ${payload.japanWishes || "No especificado"}`,
      `Tipo de experiencia: ${payload.experienceType || "No especificado"}`,
      `CRM Tag: ${payload.crmTag || "No especificado"}`,
      `Formulario: ${payload.formId}`,
      `Pagina: ${payload.pagePath}`,
    ].join("\n");

    const htmlBody = `
      <h2>Nuevo lead recibido</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr><th align="left">Nombre</th><td>${escapeHtml(payload.name)}</td></tr>
        <tr><th align="left">Celular</th><td>${escapeHtml(payload.phone)}</td></tr>
        <tr><th align="left">Correo</th><td>${escapeHtml(payload.email)}</td></tr>
        <tr><th align="left">Fecha aproximada de viaje</th><td>${escapeHtml(payload.travelDate || "No especificado")}</td></tr>
        <tr><th align="left">Numero de viajeros</th><td>${escapeHtml(payload.travelers || "No especificado")}</td></tr>
        <tr><th align="left">Intereses en Japon</th><td>${escapeHtml(payload.japanWishes || "No especificado")}</td></tr>
        <tr><th align="left">Tipo de experiencia</th><td>${escapeHtml(payload.experienceType || "No especificado")}</td></tr>
        <tr><th align="left">CRM Tag</th><td>${escapeHtml(payload.crmTag || "No especificado")}</td></tr>
        <tr><th align="left">Formulario</th><td>${escapeHtml(payload.formId)}</td></tr>
        <tr><th align="left">Pagina</th><td>${escapeHtml(payload.pagePath)}</td></tr>
      </table>
    `;

    const info = await transporter.sendMail({
      from: `"Viajes Premium" <${SMTP_FROM_EMAIL}>`,
      to: SMTP_TO_EMAIL,
      replyTo: payload.email,
      subject: payload.subject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      ok: true,
      messageId: info.messageId,
    });
  } catch (error) {
    const details =
      error instanceof Error ? error.message : JSON.stringify(error);
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
