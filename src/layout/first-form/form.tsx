"use client";

import { DatePicker, type DateValue } from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { CalendarDate } from "@internationalized/date";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import React, {
  Children,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PhoneInput from "@/components/ui/phone-input/phone-input";
import styles from "./form.module.css";

type ImageSectionFormProps = {
  config: ImageSectionFormConfig;
  idPrefix?: string;
  theme?: ImageSectionFormTheme;
};

export type ImageSectionFormTheme = "dark" | "light";

type FormOption = {
  label: string;
  value: string;
};

type FormFieldConfig = {
  id: string;
  label: string;
  as?: "input" | "textarea" | "select";
  type?: "text" | "email" | "tel" | "number" | "date";
  placeholder?: string;
  rows?: number;
  options?: readonly FormOption[];
  required?: boolean;
};

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

export type ImageSectionFormConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  fields?: readonly FormFieldConfig[];
  labels?: Partial<Record<StepFieldKey, string>>;
  hints?: Partial<Record<StepFieldKey, string>>;
  contactEmail?: string;
  contactPhoneDisplay?: string;
  contactPhoneLink?: string;
  onSubmit?: (values: TravelFormValues) => void | Promise<void>;
};

type RenderStepIndicatorProps = {
  step: number;
  currentStep: number;
  isClickable: boolean;
  onStepClick: (clicked: number) => void;
};

type StepperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  onBeforeStepChange?: (targetStep: number, fromStep: number) => boolean;
  onBeforeComplete?: () => boolean;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
  completionContent?: ReactNode;
  theme?: ImageSectionFormTheme;
  contactEmail?: string;
  contactPhoneDisplay?: string;
  contactPhoneLink?: string;
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

const INPUT_HINTS: Partial<Record<StepFieldKey, string>> = {
  phone: "Elige tu pais y la lada se agrega automaticamente.",
  travelDate: "Selecciona mes y año estimado.",
  travelers: "Ingresa un numero entre 1 y 20.",
};

const CONTACT_EMAIL = "hola@japonpremium.com";
const CONTACT_PHONE_DISPLAY = "+52 55 1234 5678";
const CONTACT_PHONE_LINK = "+525512345678";

const STEP_VARIANTS: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

function parseMonthToCalendarDate(value: string): CalendarDate | null {
  if (!/^\d{4}-\d{2}$/.test(value)) {
    return null;
  }

  const [yearString, monthString] = value.split("-");
  const year = Number(yearString);
  const month = Number(monthString);

  if (!Number.isInteger(year) || !Number.isInteger(month)) {
    return null;
  }

  if (month < 1 || month > 12) {
    return null;
  }

  return new CalendarDate(year, month, 1);
}

function formatMonthValue(date: DateValue): string {
  return `${date.year}-${`${date.month}`.padStart(2, "0")}`;
}

function parseMonthToDate(value: string): Date | null {
  const parsedMonth = parseMonthToCalendarDate(value);
  if (!parsedMonth) return null;
  return new Date(parsedMonth.year, parsedMonth.month - 1, 1);
}

function validateField(field: StepFieldKey, value: string): string | undefined {
  const trimmedValue = value.trim();

  switch (field) {
    case "name": {
      if (!trimmedValue) return "Ingresa tu nombre.";
      if (trimmedValue.length < 2) return "Debe tener al menos 2 caracteres.";
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'`´.\-\s]+$/u.test(trimmedValue)) {
        return "Usa solo letras y espacios.";
      }
      return undefined;
    }
    case "phone": {
      if (!trimmedValue) return "Ingresa tu celular.";
      if (!isValidPhoneNumber(trimmedValue)) {
        return "Ingresa un numero valido para el pais seleccionado.";
      }
      return undefined;
    }
    case "email": {
      if (!trimmedValue) return "Ingresa tu correo electronico.";
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(trimmedValue)) {
        return "Ingresa un correo valido.";
      }
      return undefined;
    }
    case "travelDate": {
      if (!trimmedValue) return "Selecciona una fecha aproximada.";
      const selectedDate = parseMonthToDate(trimmedValue);
      if (!selectedDate) return "Selecciona una fecha valida.";

      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      if (selectedDate < currentMonthStart) {
        return "Selecciona el mes actual o una fecha futura.";
      }
      return undefined;
    }
    case "travelers": {
      if (!trimmedValue) return "Indica el numero de viajeros.";
      const parsed = Number(trimmedValue);
      if (!Number.isInteger(parsed)) return "Ingresa un numero entero.";
      if (parsed < 1 || parsed > 20) {
        return "Debe ser un valor entre 1 y 20.";
      }
      return undefined;
    }
    case "japanWishes": {
      if (!trimmedValue) return "Cuéntanos que te gustaria vivir.";
      if (trimmedValue.length < 12) {
        return "Agrega un poco mas de detalle (minimo 12 caracteres).";
      }
      return undefined;
    }
    case "experienceType":
      return undefined;
    default:
      return undefined;
  }
}

function validateRequiredFields(values: TravelFormValues): TravelFormErrors {
  const nextErrors: TravelFormErrors = {};

  for (const fieldKey of STEP_ORDER) {
    const fieldError = validateField(fieldKey, values[fieldKey]);
    if (fieldError) {
      nextErrors[fieldKey] = fieldError;
    }
  }

  return nextErrors;
}

export default function ImageSectionForm({
  config,
  idPrefix = "image-form",
  theme = "dark",
}: ImageSectionFormProps) {
  const isLightTheme = theme === "light";
  const [stepperInstanceKey, setStepperInstanceKey] = useState(0);
  const [values, setValues] = useState<TravelFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<TravelFormErrors>({});
  const [touched, setTouched] = useState<TravelFormTouched>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentMonthMin = useMemo(() => {
    const now = new Date();
    return new CalendarDate(now.getFullYear(), now.getMonth() + 1, 1);
  }, []);

  const fieldLabels = useMemo(
    () => ({ ...FIELD_LABELS, ...(config.labels ?? {}) }),
    [config.labels],
  );

  const inputHints = useMemo(
    () => ({ ...INPUT_HINTS, ...(config.hints ?? {}) }),
    [config.hints],
  );

  const contactEmail = config.contactEmail ?? CONTACT_EMAIL;
  const contactPhoneDisplay = config.contactPhoneDisplay ?? CONTACT_PHONE_DISPLAY;
  const contactPhoneLink = config.contactPhoneLink ?? CONTACT_PHONE_LINK;

  const setFieldValue = useCallback(
    (field: StepFieldKey, nextValue: string) => {
      setValues((prev) => ({ ...prev, [field]: nextValue }));

      if (touched[field]) {
        const nextError = validateField(field, nextValue);
        setErrors((prev) => ({ ...prev, [field]: nextError }));
      }
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
    for (const field of STEP_ORDER) {
      nextTouched[field] = true;
    }
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

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    setStepperInstanceKey((prev) => prev + 1);
  }, []);

  return (
    <div
      className={`${styles.formContainer} ${isLightTheme ? styles.themeLight : styles.themeDark}`}
    >
      {(config.eyebrow || config.title || config.subtitle) && (
        <div className={styles.formHead}>
          {config.eyebrow ? (
            <p className={styles.formEyebrow}>{config.eyebrow}</p>
          ) : null}
          {config.title ? (
            <h3 className={styles.formTitle}>{config.title}</h3>
          ) : null}
          {config.subtitle ? (
            <p className={styles.formSub}>{config.subtitle}</p>
          ) : null}
        </div>
      )}

      <Stepper
        key={stepperInstanceKey}
        className={styles.stepperRoot}
        theme={theme}
        onBeforeStepChange={handleBeforeStepChange}
        onBeforeComplete={handleBeforeComplete}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Atras"
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
                onClick={resetForm}
                className={styles.secondaryButton}
              >
                Llenar de nuevo
              </button>
            </div>
          ) : (
            <div className={styles.completion}>
              <h4 className={styles.completionTitle}>Procesando solicitud</h4>
              <p className={styles.completionText}>
                Estamos validando tu informacion.
              </p>
            </div>
          )
        }
        renderStepIndicator={({
          step,
          currentStep,
          isClickable,
          onStepClick,
        }) => (
          <StepIndicator
            step={step}
            currentStep={currentStep}
            isClickable={isClickable}
            onClickStep={onStepClick}
            theme={theme}
          />
        )}
        contactEmail={contactEmail}
        contactPhoneDisplay={contactPhoneDisplay}
        contactPhoneLink={contactPhoneLink}
      >
        <Step>
          <StepFieldShell
            label={fieldLabels.name}
            hint={inputHints.name}
            htmlFor={`${idPrefix}-name`}
            error={touched.name ? errors.name : undefined}
          >
            <input
              id={`${idPrefix}-name`}
              type="text"
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={styles.formInput}
              value={values.name}
              onChange={(event) => setFieldValue("name", event.target.value)}
              onBlur={() => touchField("name")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.phone}
            hint={inputHints.phone}
            htmlFor={`${idPrefix}-phone`}
            error={touched.phone ? errors.phone : undefined}
          >
            <PhoneInput
              id={`${idPrefix}-phone`}
              defaultCountry="MX"
              theme={theme}
              autoComplete="tel"
              aria-invalid={touched.phone && Boolean(errors.phone)}
              value={values.phone}
              onChange={(nextValue) => setFieldValue("phone", nextValue)}
              onBlur={() => touchField("phone")}
              invalid={touched.phone && Boolean(errors.phone)}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.email}
            htmlFor={`${idPrefix}-email`}
            error={touched.email ? errors.email : undefined}
          >
            <input
              id={`${idPrefix}-email`}
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className={styles.formInput}
              value={values.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              onBlur={() => touchField("email")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.travelDate}
            hint={inputHints.travelDate}
            htmlFor={`${idPrefix}-travelDate`}
            error={touched.travelDate ? errors.travelDate : undefined}
          >
            <TravelMonthPicker
              id={`${idPrefix}-travelDate`}
              theme={theme}
              min={currentMonthMin}
              invalid={Boolean(touched.travelDate && errors.travelDate)}
              value={values.travelDate}
              onChange={(nextValue) => setFieldValue("travelDate", nextValue)}
              onBlur={() => touchField("travelDate")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.travelers}
            hint={inputHints.travelers}
            htmlFor={`${idPrefix}-travelers`}
            error={touched.travelers ? errors.travelers : undefined}
          >
            <input
              id={`${idPrefix}-travelers`}
              type="number"
              min={1}
              max={20}
              inputMode="numeric"
              placeholder="Ejemplo: 2"
              className={styles.formInput}
              value={values.travelers}
              onChange={(event) =>
                setFieldValue("travelers", event.target.value)
              }
              onBlur={() => touchField("travelers")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.japanWishes}
            htmlFor={`${idPrefix}-japanWishes`}
            error={touched.japanWishes ? errors.japanWishes : undefined}
          >
            <textarea
              id={`${idPrefix}-japanWishes`}
              rows={5}
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Templos, gastronomia, arte, tradiciones, wellness..."
              value={values.japanWishes}
              onChange={(event) =>
                setFieldValue("japanWishes", event.target.value)
              }
              onBlur={() => touchField("japanWishes")}
            />
          </StepFieldShell>
        </Step>

        <Step>
          <StepFieldShell
            label={fieldLabels.experienceType}
            htmlFor={`${idPrefix}-experienceType`}
            error={touched.experienceType ? errors.experienceType : undefined}
          >
            <textarea
              id={`${idPrefix}-experienceType`}
              rows={4}
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Ej. lujo relajado, aventura curada, cultural profundo..."
              value={values.experienceType}
              onChange={(event) =>
                setFieldValue("experienceType", event.target.value)
              }
              onBlur={() => touchField("experienceType")}
            />
          </StepFieldShell>
        </Step>
      </Stepper>
    </div>
  );
}

type StepFieldShellProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function StepFieldShell({
  label,
  htmlFor,
  error,
  hint,
  children,
}: StepFieldShellProps) {
  return (
    <div className={styles.stepFieldShell}>
      <label htmlFor={htmlFor} className={styles.formLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={styles.hintText}>{hint}</p>
      ) : null}
    </div>
  );
}

type TravelMonthPickerProps = {
  id: string;
  theme: ImageSectionFormTheme;
  min: DateValue;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function TravelMonthPicker({
  id,
  theme,
  min,
  value,
  invalid,
  onChange,
  onBlur,
}: TravelMonthPickerProps) {
  const isLightTheme = theme === "light";
  const selectedValue = useMemo(() => {
    const parsedMonth = parseMonthToCalendarDate(value);
    return parsedMonth ? [parsedMonth] : [];
  }, [value]);

  const controlClassName = [
    styles.travelDatePickerControl,
    isLightTheme ? styles.travelDatePickerControlLight : "",
    invalid ? styles.travelDatePickerControlInvalid : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClassName = [
    styles.travelDatePickerInput,
    isLightTheme ? styles.travelDatePickerInputLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClassName = [
    styles.travelDatePickerTrigger,
    isLightTheme ? styles.travelDatePickerTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const clearTriggerClassName = [
    styles.travelDatePickerClearTrigger,
    isLightTheme ? styles.travelDatePickerClearTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentClassName = [
    styles.travelDatePickerContent,
    isLightTheme ? styles.travelDatePickerContentLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const selectClassName = [
    styles.travelDatePickerSelect,
    isLightTheme ? styles.travelDatePickerSelectLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const viewControlClassName = [
    styles.travelDatePickerViewControl,
    isLightTheme ? styles.travelDatePickerViewControlLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const navTriggerClassName = [
    styles.travelDatePickerNavTrigger,
    isLightTheme ? styles.travelDatePickerNavTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const viewTriggerClassName = [
    styles.travelDatePickerViewTrigger,
    isLightTheme ? styles.travelDatePickerViewTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const tableHeaderClassName = [
    styles.travelDatePickerTableHeader,
    isLightTheme ? styles.travelDatePickerTableHeaderLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const dayCellTriggerClassName = [
    styles.travelDatePickerDayCellTrigger,
    isLightTheme ? styles.travelDatePickerDayCellTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const monthYearCellTriggerClassName = [
    styles.travelDatePickerMonthYearCellTrigger,
    isLightTheme ? styles.travelDatePickerMonthYearCellTriggerLight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DatePicker.Root
      min={min}
      value={selectedValue}
      invalid={invalid}
      positioning={{ placement: "bottom-start" }}
      onValueChange={(details) => {
        const nextDate = details.value[0];
        onChange(nextDate ? formatMonthValue(nextDate) : "");
      }}
    >
      <DatePicker.Control className={controlClassName}>
        <DatePicker.Input
          id={id}
          readOnly
          placeholder="Selecciona mes y año"
          className={inputClassName}
          onBlur={onBlur}
        />
        <DatePicker.Trigger className={triggerClassName}>
          <Calendar size={18} />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger className={clearTriggerClassName}>
          <X size={16} />
        </DatePicker.ClearTrigger>
      </DatePicker.Control>

      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className={contentClassName}>
            <div className={styles.travelDatePickerSelectRow}>
              <DatePicker.YearSelect className={selectClassName} />
              <DatePicker.MonthSelect className={selectClassName} />
            </div>

            <DatePicker.View view="day">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className={viewControlClassName}>
                      <DatePicker.PrevTrigger className={navTriggerClassName}>
                        <ChevronLeft size={18} />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className={viewTriggerClassName}>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className={navTriggerClassName}>
                        <ChevronRight size={18} />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>

                    <DatePicker.Table className={styles.travelDatePickerTable}>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {datePicker.weekDays.map((weekDay, weekDayIndex) => (
                            <DatePicker.TableHeader
                              key={weekDayIndex}
                              className={tableHeaderClassName}
                            >
                              {weekDay.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {datePicker.weeks.map((week, weekIndex) => (
                          <DatePicker.TableRow key={weekIndex}>
                            {week.map((day, dayIndex) => (
                              <DatePicker.TableCell key={dayIndex} value={day}>
                                <DatePicker.TableCellTrigger
                                  className={dayCellTriggerClassName}
                                >
                                  {day.day}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>

            <DatePicker.View view="month">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className={viewControlClassName}>
                      <DatePicker.PrevTrigger className={navTriggerClassName}>
                        <ChevronLeft size={18} />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className={viewTriggerClassName}>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className={navTriggerClassName}>
                        <ChevronRight size={18} />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className={styles.travelDatePickerTable}>
                      <DatePicker.TableBody>
                        {datePicker
                          .getMonthsGrid({ columns: 4, format: "short" })
                          .map((months, rowIndex) => (
                            <DatePicker.TableRow key={rowIndex}>
                              {months.map((month, monthIndex) => (
                                <DatePicker.TableCell
                                  key={monthIndex}
                                  value={month.value}
                                >
                                  <DatePicker.TableCellTrigger
                                    className={monthYearCellTriggerClassName}
                                  >
                                    {month.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>

            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className={viewControlClassName}>
                      <DatePicker.PrevTrigger className={navTriggerClassName}>
                        <ChevronLeft size={18} />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger className={viewTriggerClassName}>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className={navTriggerClassName}>
                        <ChevronRight size={18} />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className={styles.travelDatePickerTable}>
                      <DatePicker.TableBody>
                        {datePicker
                          .getYearsGrid({ columns: 4 })
                          .map((years, rowIndex) => (
                            <DatePicker.TableRow key={rowIndex}>
                              {years.map((year, yearIndex) => (
                                <DatePicker.TableCell
                                  key={yearIndex}
                                  value={year.value}
                                >
                                  <DatePicker.TableCellTrigger
                                    className={monthYearCellTriggerClassName}
                                  >
                                    {year.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
}

function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeStepChange = () => true,
  onBeforeComplete = () => true,
  backButtonText = "Atras",
  nextButtonText = "Siguiente",
  completeButtonText = "Enviar",
  renderStepIndicator,
  completionContent,
  theme = "dark",
  contactEmail = CONTACT_EMAIL,
  contactPhoneDisplay = CONTACT_PHONE_DISPLAY,
  contactPhoneLink = CONTACT_PHONE_LINK,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const [highestVisitedStep, setHighestVisitedStep] = useState(initialStep);

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
      if (newStep > totalSteps) {
        onFinalStepCompleted();
      } else {
        onStepChange(newStep);
      }
    },
    [onFinalStepCompleted, onStepChange, totalSteps],
  );

  const handleBack = () => {
    if (currentStep <= 1) return;
    setDirection(-1);
    updateStep(currentStep - 1);
  };

  const handleNext = () => {
    if (isLastStep || isCompleted) return;
    if (!onBeforeStepChange(currentStep + 1, currentStep)) return;
    setDirection(1);
    updateStep(currentStep + 1);
  };

  const handleComplete = () => {
    if (!onBeforeComplete()) return;
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  const handleStepClick = (clickedStep: number) => {
    if (clickedStep === currentStep) return;
    if (clickedStep < 1 || clickedStep > totalSteps) return;

    if (
      clickedStep > currentStep &&
      !onBeforeStepChange(clickedStep, currentStep)
    ) {
      return;
    }

    setDirection(clickedStep > currentStep ? 1 : -1);
    updateStep(clickedStep);
  };

  return (
    <div className={styles.stepperContainer} {...rest}>
      <div className={styles.stepIndicatorRow}>
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isNotLastStep = index < totalSteps - 1;
          const isClickable = stepNumber <= highestVisitedStep;

          return (
            <React.Fragment key={stepNumber}>
              {renderStepIndicator ? (
                renderStepIndicator({
                  step: stepNumber,
                  currentStep,
                  isClickable,
                  onStepClick: handleStepClick,
                })
              ) : (
                <StepIndicator
                  step={stepNumber}
                  currentStep={currentStep}
                  isClickable={isClickable}
                  onClickStep={handleStepClick}
                  theme={theme}
                />
              )}

              {isNotLastStep && (
                <StepConnector isComplete={currentStep > stepNumber} />
              )}
            </React.Fragment>
          );
        })}
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

type StepContentWrapperProps = {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
};

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(height) => setParentHeight(height)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type SlideTransitionProps = {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
};

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
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
  );
}

type StepProps = {
  children: ReactNode;
};

function Step({ children }: StepProps): JSX.Element {
  return <div className={styles.stepPanel}>{children}</div>;
}

type StepIndicatorProps = {
  step: number;
  currentStep: number;
  isClickable: boolean;
  onClickStep: (step: number) => void;
  theme: ImageSectionFormTheme;
};

function StepIndicator({
  step,
  currentStep,
  isClickable,
  onClickStep,
  theme,
}: StepIndicatorProps) {
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
      onClick={() => {
        if (!isClickable) return;
        onClickStep(step);
      }}
      className={styles.stepIndicator}
      style={
        !isClickable ? { pointerEvents: "none", opacity: 0.45 } : undefined
      }
      animate={status}
      initial={false}
      aria-label={`Ir al paso ${step}`}
    >
      <motion.span
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: isLightTheme
              ? "rgba(109, 72, 28, 0.12)"
              : "var(--black)",
            color: isLightTheme ? "#2a1a10" : "var(--bg)",
            borderColor: isLightTheme
              ? "rgba(109, 72, 28, 0.24)"
              : "rgba(243, 243, 240, 0.15)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--primary-japon)",
            color: "var(--bg)",
            borderColor: "var(--primary-japon)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--primary-japon)",
            color: "var(--bg)",
            borderColor: "var(--primary-japon)",
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

type StepConnectorProps = {
  isComplete: boolean;
};

function StepConnector({ isComplete }: StepConnectorProps) {
  return (
    <div className={styles.stepConnector}>
      <motion.div
        className={styles.stepConnectorInner}
        variants={{
          incomplete: { width: 0, backgroundColor: "transparent" },
          complete: { width: "100%", backgroundColor: "var(--primary-japon)" },
        }}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.34 }}
      />
    </div>
  );
}

type CheckIconProps = React.SVGProps<SVGSVGElement>;

function CheckIcon(props: CheckIconProps) {
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
        transition={{
          delay: 0.08,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
