"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  FormEvent,
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FaWhatsapp } from "react-icons/fa6";
import styles from "./whatsapp-fab.module.css";
import PhoneInput from "@/components/ui/phone-input/phone-input";
import { pushGenerateLeadEvent } from "@/lib/gtm";
import { premiumLandingConfigs } from "@/landings/premium/configs";
import type { PremiumLandingConfig } from "@/landings/premium/types";

const WHATSAPP_NUMBER = "5215573728880";
const LEAD_API_ENDPOINT = "/api/leads";
const WHATSAPP_LEAD_DOMAIN = "viajespremium.com.mx";

const INTEREST_OPTIONS_BY_LANDING: Record<string, [string, string, string]> = {
  "japon-premium": [
    "Quiero viajar a Japon",
    "Me interesa una experiencia gastronomica",
    "Quiero un itinerario cultural y tradicional",
  ],
  "corea-premium": [
    "Quiero viajar a Corea",
    "Me interesa una experiencia K-culture",
    "Quiero combinar ciudad y naturaleza",
  ],
  "europa-premium": [
    "Quiero viajar a Europa",
    "Me interesa una ruta por varias ciudades",
    "Quiero un viaje romantico y cultural",
  ],
  "canada-premium": [
    "Quiero viajar a Canada",
    "Me interesa naturaleza y montanas",
    "Quiero un viaje familiar",
  ],
  "peru-premium": [
    "Quiero viajar a Peru",
    "Me interesa Machu Picchu y Cusco",
    "Quiero una experiencia gastronomica",
  ],
  "chiapas-premium": [
    "Quiero conocer Chiapas",
    "Me interesan cascadas y naturaleza",
    "Quiero una ruta cultural",
  ],
  "barrancas-premium": [
    "Quiero viajar a Barrancas del Cobre",
    "Me interesa el recorrido en tren",
    "Quiero aventura y paisaje",
  ],
  "yucatan-premium": [
    "Quiero viajar a Yucatan",
    "Me interesan cenotes y playa",
    "Quiero ruta maya y cultura",
  ],
};

function resolvePremiumConfig(
  pathname: string | null,
): PremiumLandingConfig | null {
  if (!pathname) return null;
  return (
    Object.values(premiumLandingConfigs).find(
      (config) =>
        pathname === config.routePath ||
        pathname.startsWith(`${config.routePath}/`),
    ) ?? null
  );
}

function parseDateToDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [yearString, monthString, dayString] = value.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(year, month - 1, day);
}

function validatePhone(value: string): string | undefined {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "Ingresa tu celular.";
  if (!isValidPhoneNumber(trimmedValue)) {
    return "Ingresa un numero valido para el pais seleccionado.";
  }
  return undefined;
}

function validateTravelDate(value: string): string | undefined {
  const trimmedValue = value.trim();
  if (!trimmedValue) return "Selecciona una fecha aproximada.";
  const selectedDate = parseDateToDate(trimmedValue);
  if (!selectedDate) return "Selecciona una fecha valida.";

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (selectedDate < todayStart) {
    return "Selecciona el dia de hoy o una fecha futura.";
  }
  return undefined;
}

export default function WhatsAppFab() {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [touched, setTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const premiumConfig = useMemo(
    () => resolvePremiumConfig(pathname),
    [pathname],
  );

  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedInterest = interest.trim();
  const trimmedTravelDate = travelDate.trim();

  const landingInterestOptions = premiumConfig
    ? (INTEREST_OPTIONS_BY_LANDING[premiumConfig.id] ?? [
        "Quiero mi viaje premium",
        "Quiero informacion de precios",
        "Quiero hablar con un asesor",
      ])
    : [
        "Quiero mi viaje premium",
        "Quiero informacion de precios",
        "Quiero hablar con un asesor",
      ];

  const phoneError = validatePhone(trimmedPhone);
  const dateError = validateTravelDate(trimmedTravelDate);
  const canSubmit =
    trimmedName.length > 1 &&
    trimmedInterest.length > 1 &&
    !phoneError &&
    !dateError;

  const accentColor = "#1cbd57";
  const submitBg = accentColor;
  const submitText = premiumConfig?.theme.white ?? "#ffffff";
  const focusColor = accentColor;
  const panelBg = premiumConfig?.theme.background ?? "#ffffff";
  const panelTitle = accentColor;
  const panelLabel = premiumConfig?.theme.black ?? "#334155";
  const panelText = premiumConfig?.theme.black ?? "#0f172a";
  const leadMailboxPrefix = premiumConfig
    ? `whatsapp-${premiumConfig.id}`
    : "whatsapp-lead";
  const leadEmail = `${leadMailboxPrefix}@${WHATSAPP_LEAD_DOMAIN}`;

  const safeName = trimmedName || "Sin nombre";
  const safePhone = trimmedPhone || "Sin telefono";
  const safeInterest = trimmedInterest || "Sin tema especificado";
  const safeDate = trimmedTravelDate || "Sin fecha tentativa";
  const message = [
    `Hola mi nombre es ${safeName}, me gustaria consultar por:`,
    `*• Mi numero es::* ${safePhone}`,
    `*• Mi tema de interes es::* ${safeInterest}`,
    `*• Mi fecha tentativa es::* ${safeDate}`,
  ].join("\n");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setTouched(true);
    setPhoneTouched(true);
    setDateTouched(true);
    if (!canSubmit) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");

    try {
      setIsSubmitting(true);
      const crmTag = premiumConfig
        ? `#tags:${premiumConfig.metadata.title}`
        : "#tags:WhatsApp Lead";
      const payload = {
        name: trimmedName,
        phone: trimmedPhone,
        email: leadEmail,
        travelDate: trimmedTravelDate,
        japanWishes: trimmedInterest,
        crmTag,
        subject: `Nuevo Lead - WhatsApp ${crmTag}`,
        formId: `whatsapp-fab-${premiumConfig?.id ?? "default"}`,
        pagePath: window.location.pathname,
      };

      const sendLead = async () => {
        const response = await fetch(LEAD_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const result = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          messageId?: string;
          error?: string;
          details?: string;
          requestId?: string;
        };
        return { response, result };
      };

      let { response, result } = await sendLead();
      if (!response.ok && response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        ({ response, result } = await sendLead());
      }

      const isLeadSuccess = response.status === 200 && result.ok === true;

      if (!isLeadSuccess) {
        throw new Error(
          [
            result.error ?? "No se pudo enviar lead desde WhatsApp FAB.",
            result.details ? `Detalle: ${result.details}` : "",
            result.requestId ? `RequestId: ${result.requestId}` : "",
          ]
            .filter(Boolean)
            .join(" | "),
        );
      }

      console.log("[WhatsAppFab] Correo enviado correctamente", {
        formId: `whatsapp-fab-${premiumConfig?.id ?? "default"}`,
        email: leadEmail,
        messageId: result.messageId ?? null,
        requestId: result.requestId ?? null,
      });
      pushGenerateLeadEvent({
        pathname: window.location.pathname,
        formId: `whatsapp-fab-${premiumConfig?.id ?? "default"}`,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      console.error("[WhatsAppFab] Error al enviar correo", {
        formId: "whatsapp-fab",
        message,
        error,
      });
      alert(`No se pudo enviar el correo del lead. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      const root = wrapRef.current;
      const target = event.target as Node | null;
      if (!root || !target || root.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <AnimatePresence>
        {isOpen ? (
          <motion.form
            key="wa-form"
            className={styles.panel}
            style={
              {
                "--wa-bg": panelBg,
                "--wa-title": panelTitle,
                "--wa-label": panelLabel,
                "--wa-text": panelText,
                "--wa-focus": focusColor,
                "--wa-submit-bg": submitBg,
                "--wa-submit-color": submitText,
              } as CSSProperties
            }
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className={styles.title}>Escribenos por WhatsApp</p>

            <label className={styles.label} htmlFor="wa-name">
              Nombre
            </label>
            <input
              id="wa-name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                premiumConfig
                  ? `Tu nombre para ${premiumConfig.metadata.title}`
                  : "Tu nombre"
              }
              autoComplete="name"
            />

            <label className={styles.label} htmlFor="wa-phone">
              Numero
            </label>
            <PhoneInput
              id="wa-phone"
              defaultCountry="MX"
              theme="light"
              className={styles.phoneField}
              autoComplete="tel"
              value={phone}
              onChange={(nextValue) => setPhone(nextValue)}
              onBlur={() => setPhoneTouched(true)}
              invalid={(touched || phoneTouched) && Boolean(phoneError)}
              aria-invalid={(touched || phoneTouched) && Boolean(phoneError)}
            />
            {(touched || phoneTouched) && phoneError ? (
              <p className={styles.error}>{phoneError}</p>
            ) : null}

            <label className={styles.label} htmlFor="wa-interest">
              Tema de interes
            </label>
            <select
              id="wa-interest"
              className={styles.select}
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Selecciona una opcion</option>
              {landingInterestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="wa-date">
              Fecha tentativa
            </label>
            <input
              id="wa-date"
              type="date"
              className={styles.input}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              onBlur={() => setDateTouched(true)}
              aria-invalid={(touched || dateTouched) && Boolean(dateError)}
            />
            {(touched || dateTouched) && dateError ? (
              <p className={styles.error}>{dateError}</p>
            ) : null}

            {touched && !canSubmit ? (
              <p className={styles.error}>
                Completa los 4 campos correctamente.
              </p>
            ) : null}

            <div className={styles.actions}>
              <button type="submit" className={styles.submit}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Abrir formulario de WhatsApp"
        className={styles.fab}
        onClick={() => setIsOpen((prev) => !prev)}
        animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={{
          scale: 1.1,
          backgroundColor: "#1ebea5",
          transition: { type: "spring", stiffness: 300 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp className={styles.icon} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
