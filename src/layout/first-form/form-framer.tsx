import React, {
  Children,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { addPropertyControls, ControlType } from "framer";
import { AnimatePresence, motion, type Variants } from "framer-motion";

// ----------------------------------------------------------------------------
// TRUCO PARA CSS MODULES EN FRAMER
// Creamos un proxy para que `styles.formContainer` devuelva el string "formContainer".
// ----------------------------------------------------------------------------
const styles: Record<string, string> = new Proxy(
  {},
  {
    get: (_, prop: string) => prop,
  },
);

const CSS_STYLES = `
.formContainer { pointer-events: auto; position: relative; width: 100%; max-width: 640px; margin-top: 1rem; padding: 2.1rem 1.55rem 1.25rem; display: flex; flex-direction: column; gap: 1rem; border-radius: var(--radius, 16px); background: var(--black, #111); }
.themeLight { background: #f3eddb; }
.formHead { display: flex; flex-direction: column; gap: 0.44rem; margin-bottom: 0.2rem; }
.formEyebrow { margin: 0; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(243, 243, 240, 0.78); }
.formTitle { margin: 0; font-family: var(--font-bigcaslon, serif); font-size: clamp(1.52rem, 2.4vw, 2.1rem); line-height: 1.05; color: var(--bg, #fff); }
.formSub { margin: 0; font-size: 0.9rem; line-height: 1.45; color: rgba(243, 243, 240, 0.7); max-width: 34ch; }
.themeLight .formEyebrow { color: rgba(29, 19, 12, 0.68); }
.themeLight .formTitle { color: #1d130c; }
.themeLight .formSub { color: rgba(29, 19, 12, 0.7); }
.stepperContainer { width: 100%; }
.stepperRoot { width: 100%; }
.stepIndicatorRow { display: flex; width: 100%; align-items: center; padding: 0.22rem 1.25rem 1rem; }
.stepIndicator { position: relative; cursor: pointer; outline: none; border: 0; background: transparent; padding: 0; margin: 0; }
.stepIndicatorInner { display: inline-flex; height: 1.8rem; width: 1.8rem; align-items: center; justify-content: center; border-radius: 999px; border: 1px solid transparent; font-weight: 600; }
.activeDot { width: 0.56rem; height: 0.56rem; border-radius: 999px; background: currentColor; }
.stepNumber { padding-top: 0.1rem; font-size: 0.76rem; font-family: var(--font-nohemi, sans-serif); }
.checkIcon { width: 0.95rem; height: 0.95rem; }
.stepConnector { position: relative; margin-inline: 0.34rem; height: 0.125rem; flex: 1; overflow: hidden; border-radius: 999px; background: rgba(243, 243, 240, 0.16); }
.themeLight .stepConnector { background: rgba(109, 72, 28, 0.18); }
.stepConnectorInner { position: absolute; left: 0; top: 0; height: 100%; }
.stepContent { position: relative; }
.stepPanel { padding: 0.25rem 0.2rem; }
.stepFieldShell { display: flex; flex-direction: column; gap: 0.46rem; }
.formLabel { color: rgba(243, 243, 240, 0.96); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--font-nohemi, sans-serif); opacity: 0.95; }
.themeLight .formLabel { color: rgba(29, 19, 12, 0.78); }
.formInput { width: 100%; background: rgba(243, 243, 240, 0.08); color: var(--bg, #fff); padding: 0.72rem 0.8rem; font-size: 0.98rem; line-height: 1.35; outline: none; border-radius: var(--radius, 12px); transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease; font-family: var(--font-nohemi, sans-serif); border: 1px solid transparent; }
.themeLight .formInput { background: #c7b59c68; color: #2a1a10; }
.formInput::placeholder { color: rgba(243, 243, 240, 0.45); }
.themeLight .formInput::placeholder { color: rgba(42, 26, 16, 0.42); }
.formInput:focus { border-color: var(--primary-japon, #db2f21); box-shadow: 0 0 0 2px rgba(219, 47, 33, 0.25); background: rgba(243, 243, 240, 0.12); }
.themeLight .formInput:focus { border-color: rgba(179, 135, 40, 0.58); box-shadow: 0 0 0 3px rgba(179, 135, 40, 0.14); background: rgba(255, 255, 255, 0.95); }
.formInput[type="month"] { appearance: none; -webkit-appearance: none; color-scheme: dark; }
.themeLight .formInput[type="month"] { color-scheme: light; }
.formTextarea { min-height: 110px; resize: vertical; }
.errorText { margin: 0; font-size: 0.74rem; line-height: 1.28; color: #ffb9b4; }
.themeLight .errorText { color: #b3261e; }
.hintText { margin: 0; font-size: 0.73rem; line-height: 1.25; color: rgba(243, 243, 240, 0.6); }
.themeLight .hintText { color: rgba(29, 19, 12, 0.62); }
.stepFooter { padding: 0.9rem 0.2rem 0.25rem; }
.stepFooterNav { display: flex; align-items: center; justify-content: space-between; gap: 0.65rem; }
.contactQuickActions { margin-top: 1.2rem; border-top: 1px solid rgba(243, 243, 240, 0.12); padding-top: 1.2rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; }
.contactActionLabel { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--font-nohemi, sans-serif); opacity: 0.95; color: rgba(243, 243, 240, 0.78); }
.themeLight .contactActionLabel { color: rgba(29, 19, 12, 0.78); }
.contactActionLink { font-family: var(--font-nohemi, sans-serif); font-size: 0.9rem; line-height: 1.2; color: var(--white, #fff); text-decoration: underline; transition: color 0.2s ease, opacity 0.2s ease; }
.contactActionLink:hover { color: var(--bg, #fff); }
.themeLight .contactActionLink { color: rgba(29, 19, 12, 0.72); }
.themeLight .contactActionLink:hover { color: #1d130c; }
.backButton, .nextButton { border: 0; cursor: pointer; font-family: var(--font-nohemi, sans-serif); transition: transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease; }
.backButton { min-width: 96px; border-radius: var(--radius, 12px); padding: 0.65rem 1rem; color: rgba(243, 243, 240, 0.85); background: rgba(243, 243, 240, 0.08); border: 1px solid rgba(243, 243, 240, 0.2); }
.themeLight .backButton { color: rgba(29, 19, 12, 0.76); background: rgba(109, 72, 28, 0.08); border: 1px solid rgba(109, 72, 28, 0.22); }
.backButton:disabled { pointer-events: none; opacity: 0.45; }
.backButton:not(:disabled):hover { filter: brightness(1.07); }
.nextButton { border-radius: var(--radius, 12px); padding: 0.65rem 1.12rem; color: var(--bg, #fff); background: var(--primary-japon, #db2f21); font-weight: 600; letter-spacing: 0.01em; }
.nextButton:hover { transform: translateY(-1px); filter: brightness(1.05); }
.completionContainer { padding: 0.55rem 0.2rem 0.3rem; }
.completion { display: flex; flex-direction: column; align-items: flex-start; gap: 0.65rem; border: 1px solid rgba(243, 243, 240, 0.15); border-radius: 12px; background: rgba(243, 243, 240, 0.05); padding: 0.95rem 1rem; }
.themeLight .completion { border: 1px solid rgba(109, 72, 28, 0.2); background: rgba(255, 255, 255, 0.8); }
.completionTitle { margin: 0; color: var(--bg, #fff); font-family: var(--font-nohemi, sans-serif); font-size: 1rem; line-height: 1.2; }
.themeLight .completionTitle { color: #1d130c; }
.completionText { margin: 0; color: rgba(243, 243, 240, 0.72); font-size: 0.88rem; line-height: 1.42; }
.themeLight .completionText { color: rgba(29, 19, 12, 0.72); }
.secondaryButton { border: 1px solid rgba(243, 243, 240, 0.28); background: rgba(243, 243, 240, 0.08); color: var(--bg, #fff); border-radius: 999px; padding: 0.55rem 0.88rem; cursor: pointer; font-family: var(--font-nohemi, sans-serif); font-size: 0.84rem; transition: filter 0.2s ease; }
.themeLight .secondaryButton { border: 1px solid rgba(109, 72, 28, 0.3); background: rgba(109, 72, 28, 0.08); color: #1d130c; }
.secondaryButton:hover { filter: brightness(1.08); }
.experienceChips { display: flex; flex-direction: column; gap: 0.55rem; width: 100%; }
.experienceChip { width: 100%; padding: 0.78rem 1rem; border-radius: var(--radius, 12px); border: 1px solid transparent; font-family: var(--font-nohemi, sans-serif); font-size: 0.9rem; font-weight: 400; line-height: 1.3; text-align: left; cursor: pointer; transition: background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease; }
.experienceChipDark { background: rgba(243, 243, 240, 0.07); border-color: rgba(243, 243, 240, 0.14); color: var(--bg, #fff); }
.experienceChipDark:hover:not(.experienceChipSelected) { background: rgba(243, 243, 240, 0.12); border-color: rgba(243, 243, 240, 0.24); }
.experienceChipLight { background: rgba(109, 72, 28, 0.06); border-color: rgba(109, 72, 28, 0.18); color: #2a1a10; }
.experienceChipLight:hover:not(.experienceChipSelected) { background: rgba(109, 72, 28, 0.11); border-color: rgba(109, 72, 28, 0.3); }
.experienceChipSelected { background: var(--primary-japon, #db2f21) !important; border-color: var(--primary-japon, #db2f21) !important; color: #fff !important; box-shadow: 0 2px 10px rgba(191, 149, 63, 0.22); }
@media (max-width: 768px) {
  .formContainer { max-width: min(92vw, 560px); margin-top: 0; margin-inline: auto; padding: 1.25rem 1rem 1rem; }
  .contactQuickActions { flex-direction: column; align-items: flex-start; margin-top: 0.8rem; }
  .formTitle { font-size: clamp(1.32rem, 6.7vw, 1.76rem); }
  .stepIndicatorRow { padding-bottom: 0.85rem; overflow-x: auto; scrollbar-width: none; }
  .stepIndicatorRow::-webkit-scrollbar { display: none; }
  .backButton, .nextButton { flex: 1 1 0%; min-width: 0; }
}
`;

// ----------------------------------------------------------------------------
// LÓGICA PRINCIPAL DEL FORMULARIO ORIGINAL (SIN DEPENDENCIAS EXTERNAS)
// ----------------------------------------------------------------------------
type ImageSectionFormTheme = "dark" | "light";
type StepFieldKey =
  | "name"
  | "phone"
  | "email"
  | "travelDate"
  | "travelers"
  | "japanWishes"
  | "experienceType";
type TravelFormValues = Record<StepFieldKey, string>;
type TravelFormErrors = Partial<Record<StepFieldKey, string>>;
type TravelFormTouched = Partial<Record<StepFieldKey, boolean>>;

export type ExperienceOption = { label: string; value: string };
export type ImageSectionFormConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  contactEmail?: string;
  contactPhoneDisplay?: string;
  contactPhoneLink?: string;
  experienceOptions?: readonly [
    ExperienceOption,
    ExperienceOption,
    ExperienceOption,
  ];
  onSubmit?: (values: TravelFormValues) => void | Promise<void>;
};

const STEP_ORDER: StepFieldKey[] = [
  "name",
  "phone",
  "email",
  "travelDate",
  "travelers",
  "japanWishes",
  "experienceType",
];
const INITIAL_VALUES: TravelFormValues = {
  name: "",
  phone: "",
  email: "",
  travelDate: "",
  travelers: "",
  japanWishes: "",
  experienceType: "",
};
const FIELD_LABELS: Record<StepFieldKey, string> = {
  name: "Nombre",
  phone: "Celular",
  email: "Correo electrónico",
  travelDate: "Fecha aproximada de viaje",
  travelers: "Número de viajeros",
  japanWishes: "¿Qué te gustaría vivir en Japón?",
  experienceType: "¿Con qué tipo de experiencia conectas más? (opcional)",
};

const STEP_VARIANTS: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

function validateField(field: StepFieldKey, value: string): string | undefined {
  const trimmedValue = value.trim();
  switch (field) {
    case "name":
      return !trimmedValue
        ? "Ingresa tu nombre."
        : trimmedValue.length < 2
          ? "Debe tener al menos 2 caracteres."
          : undefined;
    case "phone": {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
      return !trimmedValue
        ? "Ingresa tu celular."
        : !phoneRegex.test(trimmedValue)
          ? "Ingresa un número válido."
          : undefined;
    }
    case "email":
      return !trimmedValue
        ? "Ingresa tu correo electrónico."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
          ? "Ingresa un correo válido."
          : undefined;
    case "travelDate": {
      if (!trimmedValue) return "Selecciona una fecha aproximada.";
      const [year, month] = trimmedValue.split("-");
      const selected = new Date(Number(year), Number(month) - 1);
      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth());
      if (selected < currentMonth)
        return "Selecciona el mes actual o uno futuro.";
      return undefined;
    }
    case "travelers": {
      const parsed = Number(trimmedValue);
      return !trimmedValue
        ? "Indica el número de viajeros."
        : parsed < 1 || parsed > 20
          ? "Debe ser un valor entre 1 y 20."
          : undefined;
    }
    case "japanWishes":
      return !trimmedValue
        ? "Cuéntanos qué te gustaría vivir."
        : trimmedValue.length < 12
          ? "Agrega un poco más de detalle (mínimo 12 caracteres)."
          : undefined;
    default:
      return undefined;
  }
}

function validateRequiredFields(values: TravelFormValues): TravelFormErrors {
  const nextErrors: TravelFormErrors = {};
  for (const fieldKey of STEP_ORDER) {
    const error = validateField(fieldKey, values[fieldKey]);
    if (error) nextErrors[fieldKey] = error;
  }
  return nextErrors;
}

function ImageSectionForm({
  config,
  idPrefix = "image-form",
  theme = "dark",
}: {
  config: ImageSectionFormConfig;
  idPrefix?: string;
  theme?: ImageSectionFormTheme;
}) {
  const isLightTheme = theme === "light";
  const [stepperInstanceKey, setStepperInstanceKey] = useState(0);
  const [values, setValues] = useState<TravelFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<TravelFormErrors>({});
  const [touched, setTouched] = useState<TravelFormTouched>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYearMonth = new Date().toISOString().slice(0, 7); // Formato nativo "YYYY-MM"

  const setFieldValue = useCallback(
    (field: StepFieldKey, nextValue: string) => {
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      if (touched[field])
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, nextValue),
        }));
    },
    [touched],
  );

  const touchField = useCallback(
    (field: StepFieldKey) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, values[field]),
      }));
    },
    [values],
  );

  const validateStepByIndex = useCallback(
    (stepIndex: number) => {
      const field = STEP_ORDER[stepIndex - 1];
      if (!field) return true;
      setTouched((prev) => ({ ...prev, [field]: true }));
      const nextError = validateField(field, values[field]);
      setErrors((prev) => ({ ...prev, [field]: nextError }));
      return !nextError;
    },
    [values],
  );

  const handleBeforeStepChange = useCallback(
    (targetStep: number, fromStep: number) => {
      if (targetStep <= fromStep) return true;
      return validateStepByIndex(fromStep);
    },
    [validateStepByIndex],
  );

  const handleBeforeComplete = useCallback(() => {
    const nextErrors = validateRequiredFields(values);
    setErrors(nextErrors);
    const nextTouched: TravelFormTouched = {};
    STEP_ORDER.forEach((f) => (nextTouched[f] = true));
    setTouched(nextTouched);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  const handleFinalSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await config.onSubmit?.(values);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [config, values]);

  return (
    <div
      className={`${styles.formContainer} ${isLightTheme ? styles.themeLight : styles.themeDark}`}
    >
      {(config.eyebrow || config.title || config.subtitle) && (
        <div className={styles.formHead}>
          {config.eyebrow && (
            <p className={styles.formEyebrow}>{config.eyebrow}</p>
          )}
          {config.title && <h3 className={styles.formTitle}>{config.title}</h3>}
          {config.subtitle && (
            <p className={styles.formSub}>{config.subtitle}</p>
          )}
        </div>
      )}
      <Stepper
        key={stepperInstanceKey}
        className={styles.stepperRoot}
        theme={theme}
        onBeforeStepChange={handleBeforeStepChange}
        onBeforeComplete={handleBeforeComplete}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Atrás"
        nextButtonText="Siguiente"
        completeButtonText={isSubmitting ? "Enviando..." : config.submitLabel}
        completionContent={
          isSubmitted ? (
            <div className={styles.completion}>
              <h4 className={styles.completionTitle}>Solicitud enviada</h4>
              <p className={styles.completionText}>
                Gracias por compartir tu idea de viaje. Te contactaremos pronto.
              </p>
              <button
                type="button"
                onClick={() => {
                  setValues(INITIAL_VALUES);
                  setErrors({});
                  setTouched({});
                  setIsSubmitted(false);
                  setStepperInstanceKey((prev) => prev + 1);
                }}
                className={styles.secondaryButton}
              >
                Llenar de nuevo
              </button>
            </div>
          ) : (
            <div className={styles.completion}>
              <h4 className={styles.completionTitle}>
                Procesando solicitud...
              </h4>
            </div>
          )
        }
        contactEmail={config.contactEmail}
        contactPhoneDisplay={config.contactPhoneDisplay}
        contactPhoneLink={config.contactPhoneLink}
      >
        <Step>
          <StepFieldShell
            label={FIELD_LABELS.name}
            htmlFor={`${idPrefix}-name`}
            error={touched.name ? errors.name : undefined}
          >
            <input
              id={`${idPrefix}-name`}
              type="text"
              placeholder="Tu nombre completo"
              className={styles.formInput}
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              onBlur={() => touchField("name")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={FIELD_LABELS.phone}
            htmlFor={`${idPrefix}-phone`}
            error={touched.phone ? errors.phone : undefined}
            hint="Ingresa código de país y número. Ej: +52 55..."
          >
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              placeholder="+52 55 1234 5678"
              className={styles.formInput}
              value={values.phone}
              onChange={(e) => setFieldValue("phone", e.target.value)}
              onBlur={() => touchField("phone")}
              aria-invalid={touched.phone && Boolean(errors.phone)}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={FIELD_LABELS.email}
            htmlFor={`${idPrefix}-email`}
            error={touched.email ? errors.email : undefined}
          >
            <input
              id={`${idPrefix}-email`}
              type="email"
              placeholder="tu@email.com"
              className={styles.formInput}
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              onBlur={() => touchField("email")}
            />
          </StepFieldShell>
        </Step>

        {/* INPUT DE FECHA NATIVO */}
        <Step>
          <StepFieldShell
            label={FIELD_LABELS.travelDate}
            htmlFor={`${idPrefix}-travelDate`}
            error={touched.travelDate ? errors.travelDate : undefined}
            hint="Selecciona mes y año estimado."
          >
            <input
              id={`${idPrefix}-travelDate`}
              type="month"
              min={currentYearMonth}
              className={styles.formInput}
              value={values.travelDate}
              onChange={(e) => setFieldValue("travelDate", e.target.value)}
              onBlur={() => touchField("travelDate")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={FIELD_LABELS.travelers}
            htmlFor={`${idPrefix}-travelers`}
            error={touched.travelers ? errors.travelers : undefined}
            hint="Ingresa un número entre 1 y 20."
          >
            <input
              id={`${idPrefix}-travelers`}
              type="number"
              min={1}
              max={20}
              placeholder="Ejemplo: 2"
              className={styles.formInput}
              value={values.travelers}
              onChange={(e) => setFieldValue("travelers", e.target.value)}
              onBlur={() => touchField("travelers")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={FIELD_LABELS.japanWishes}
            htmlFor={`${idPrefix}-japanWishes`}
            error={touched.japanWishes ? errors.japanWishes : undefined}
          >
            <textarea
              id={`${idPrefix}-japanWishes`}
              rows={5}
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Templos, gastronomía, arte..."
              value={values.japanWishes}
              onChange={(e) => setFieldValue("japanWishes", e.target.value)}
              onBlur={() => touchField("japanWishes")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={FIELD_LABELS.experienceType}
            htmlFor={`${idPrefix}-experienceType`}
            error={touched.experienceType ? errors.experienceType : undefined}
          >
            {config.experienceOptions && config.experienceOptions.length > 0 ? (
              <ExperienceChips
                options={config.experienceOptions}
                value={values.experienceType}
                theme={theme}
                onChange={(val) => setFieldValue("experienceType", val)}
              />
            ) : null}
          </StepFieldShell>
        </Step>
      </Stepper>
    </div>
  );
}

function ExperienceChips({ options, value, onChange, theme }: any) {
  return (
    <div className={styles.experienceChips}>
      {options.map((opt: any) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(isSelected ? "" : opt.value)}
            className={[
              styles.experienceChip,
              theme === "light"
                ? styles.experienceChipLight
                : styles.experienceChipDark,
              isSelected ? styles.experienceChipSelected : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function StepFieldShell({ label, htmlFor, error, hint, children }: any) {
  return (
    <div className={styles.stepFieldShell}>
      <label htmlFor={htmlFor} className={styles.formLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : hint ? (
        <p className={styles.hintText}>{hint}</p>
      ) : null}
    </div>
  );
}

function Stepper({
  children,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeStepChange = () => true,
  onBeforeComplete = () => true,
  backButtonText,
  nextButtonText,
  completeButtonText,
  completionContent,
  theme,
  contactEmail,
  contactPhoneDisplay,
  contactPhoneLink,
  ...rest
}: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [highestVisitedStep, setHighestVisitedStep] = useState(1);

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = useCallback(
    (newStep: number) => {
      setCurrentStep(newStep);
      setHighestVisitedStep((prev) =>
        Math.max(prev, Math.min(newStep, totalSteps)),
      );
      if (newStep > totalSteps) onFinalStepCompleted();
      else onStepChange(newStep);
    },
    [onFinalStepCompleted, onStepChange, totalSteps],
  );

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    if (
      !isLastStep &&
      !isCompleted &&
      onBeforeStepChange(currentStep + 1, currentStep)
    ) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };
  const handleComplete = () => {
    if (onBeforeComplete()) {
      setDirection(1);
      updateStep(totalSteps + 1);
    }
  };
  const handleStepClick = (clickedStep: number) => {
    if (
      clickedStep === currentStep ||
      clickedStep < 1 ||
      clickedStep > totalSteps
    )
      return;
    if (
      clickedStep > currentStep &&
      !onBeforeStepChange(clickedStep, currentStep)
    )
      return;
    setDirection(clickedStep > currentStep ? 1 : -1);
    updateStep(clickedStep);
  };

  return (
    <div className={styles.stepperContainer} {...rest}>
      <div className={styles.stepIndicatorRow}>
        {stepsArray.map((_, i) => (
          <React.Fragment key={i + 1}>
            <StepIndicator
              step={i + 1}
              currentStep={currentStep}
              isClickable={i + 1 <= highestVisitedStep}
              onClickStep={handleStepClick}
              theme={theme}
            />
            {i < totalSteps - 1 && (
              <div className={styles.stepConnector}>
                <motion.div
                  className={styles.stepConnectorInner}
                  variants={{
                    incomplete: { width: 0, backgroundColor: "transparent" },
                    complete: {
                      width: "100%",
                      backgroundColor: "var(--primary-japon, #db2f21)",
                    },
                  }}
                  initial={false}
                  animate={currentStep > i + 1 ? "complete" : "incomplete"}
                  transition={{ duration: 0.34 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {isCompleted ? (
        <motion.div
          className={styles.completionContainer}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {completionContent}
        </motion.div>
      ) : (
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={styles.stepContent}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>
      )}
      {!isCompleted && (
        <div className={styles.stepFooter}>
          <div className={styles.stepFooterNav}>
            <button
              type="button"
              onClick={handleBack}
              className={styles.backButton}
              disabled={currentStep === 1}
            >
              {backButtonText}
            </button>
            <button
              type="button"
              onClick={isLastStep ? handleComplete : handleNext}
              className={styles.nextButton}
            >
              {isLastStep ? completeButtonText : nextButtonText}
            </button>
          </div>
          <div className={styles.contactQuickActions}>
            <span className={styles.contactActionLabel}>
              Contáctanos ahora:
            </span>
            <a
              href={`mailto:${contactEmail}`}
              className={styles.contactActionLink}
            >
              {contactEmail}
            </a>
            <a
              href={`tel:${contactPhoneLink}`}
              className={styles.contactActionLink}
            >
              {contactPhoneDisplay}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: any) {
  const [parentHeight, setParentHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current)
      setParentHeight(containerRef.current.offsetHeight);
  }, [children]);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <motion.div
            ref={containerRef}
            key={currentStep}
            custom={direction}
            variants={STEP_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38 }}
            style={{ position: "absolute", left: 0, right: 0, top: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return <div className={styles.stepPanel}>{children}</div>;
}

function StepIndicator({
  step,
  currentStep,
  isClickable,
  onClickStep,
  theme,
}: any) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";
  const isLightTheme = theme === "light";
  return (
    <motion.button
      type="button"
      onClick={() => isClickable && onClickStep(step)}
      className={styles.stepIndicator}
      style={
        !isClickable ? { pointerEvents: "none", opacity: 0.45 } : undefined
      }
      animate={status}
      initial={false}
    >
      <motion.span
        variants={{
          inactive: {
            backgroundColor: isLightTheme
              ? "rgba(109, 72, 28, 0.12)"
              : "rgba(243, 243, 240, 0.05)",
            color: isLightTheme ? "#2a1a10" : "#fff",
            borderColor: "transparent",
          },
          active: {
            backgroundColor: "var(--primary-japon, #db2f21)",
            color: "#fff",
            borderColor: "var(--primary-japon, #db2f21)",
          },
          complete: {
            backgroundColor: "var(--primary-japon, #db2f21)",
            color: "#fff",
            borderColor: "var(--primary-japon, #db2f21)",
          },
        }}
        transition={{ duration: 0.28 }}
        className={styles.stepIndicatorInner}
      >
        {status === "complete" ? (
          <CheckIcon className={styles.checkIcon} />
        ) : status === "active" ? (
          <span className={styles.activeDot} />
        ) : (
          <span className={styles.stepNumber}>{step}</span>
        )}
      </motion.span>
    </motion.button>
  );
}

// Icono SVG Nativo, libre de dependencias
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.08, type: "tween", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL PARA FRAMER (EXPONE PROPIEDADES AL PANEL)
// ----------------------------------------------------------------------------
export default function FramerTravelForm(props: any) {
  const config: ImageSectionFormConfig = {
    eyebrow: props.eyebrow,
    title: props.title,
    subtitle: props.subtitle,
    submitLabel: props.submitLabel,
    contactEmail: props.contactEmail,
    contactPhoneDisplay: props.contactPhoneDisplay,
    contactPhoneLink: props.contactPhoneLink,
    experienceOptions: [
      { label: props.exp1, value: props.exp1 },
      { label: props.exp2, value: props.exp2 },
      { label: props.exp3, value: props.exp3 },
    ],
    onSubmit: (values) => {
      console.log("Datos del formulario para enviar:", values);
      // Conectar aquí con Formspark, Typeform API, Make, etc.
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageSectionForm config={config} theme={props.theme} />
      </div>
    </>
  );
}

// ----------------------------------------------------------------------------
// CONTROLES DE PROPIEDADES EN FRAMER (PANEL DERECHO)
// ----------------------------------------------------------------------------
addPropertyControls(FramerTravelForm, {
  theme: {
    type: ControlType.Enum,
    options: ["dark", "light"],
    defaultValue: "dark",
    title: "Theme",
  },
  eyebrow: {
    type: ControlType.String,
    defaultValue: "SOLICITUD DE VIAJE",
    title: "Eyebrow",
  },
  title: {
    type: ControlType.String,
    defaultValue: "Empieza tu viaje",
    title: "Title",
  },
  subtitle: {
    type: ControlType.String,
    defaultValue:
      "Cuéntanos sobre tu viaje ideal y un experto se pondrá en contacto contigo.",
    title: "Subtitle",
    displayTextArea: true,
  },
  submitLabel: {
    type: ControlType.String,
    defaultValue: "Enviar Solicitud",
    title: "Btn Enviar",
  },
  contactEmail: {
    type: ControlType.String,
    defaultValue: "hola@japonpremium.com",
    title: "Email",
  },
  contactPhoneDisplay: {
    type: ControlType.String,
    defaultValue: "+52 55 1234 5678",
    title: "Teléfono (Vista)",
  },
  contactPhoneLink: {
    type: ControlType.String,
    defaultValue: "+525512345678",
    title: "Teléfono (Link)",
  },
  exp1: {
    type: ControlType.String,
    defaultValue: "Lujo relajado",
    title: "Opción Exp 1",
  },
  exp2: {
    type: ControlType.String,
    defaultValue: "Aventura curada",
    title: "Opción Exp 2",
  },
  exp3: {
    type: ControlType.String,
    defaultValue: "Cultural profundo",
    title: "Opción Exp 3",
  },
});
