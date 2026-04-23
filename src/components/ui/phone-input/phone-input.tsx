"use client";

import React from "react";
import RPNInput from "react-phone-number-input/input";
import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumber,
  type Country,
  type Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import labels from "react-phone-number-input/locale/es.json";
import { cn } from "@/lib/utils";
import styles from "./phone-input.module.css";

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: Country;
  onCountryChange?: (country: Country) => void;
  invalid?: boolean;
  theme?: "dark" | "light";
};

const FALLBACK_COUNTRY: Country = "MX";
const COUNTRY_OPTIONS = getCountries();
const PHONE_LABELS = labels as Record<string, string | undefined>;

function resolveCountry(country?: Country): Country {
  if (country && isSupportedCountry(country)) {
    return country;
  }

  return FALLBACK_COUNTRY;
}

function getCountryPrefix(country: Country): string {
  return `+${getCountryCallingCode(country)}`;
}

function safeParsePhoneNumber(value: string) {
  try {
    return parsePhoneNumber(value);
  } catch {
    return undefined;
  }
}

function valueMatchesCountry(value: string, country: Country): boolean {
  if (!value || !value.startsWith("+")) {
    return true;
  }

  const parsed = safeParsePhoneNumber(value);
  if (parsed?.country) {
    return parsed.country === country;
  }

  if (parsed?.countryCallingCode) {
    return parsed.countryCallingCode === getCountryCallingCode(country);
  }

  return value.startsWith(getCountryPrefix(country));
}

function getNationalDigits(value: string, fallbackCountry: Country): string {
  const parsed = safeParsePhoneNumber(value);
  if (parsed?.nationalNumber) {
    return parsed.nationalNumber;
  }

  const digits = value.replace(/\D/g, "");
  if (!digits) {
    return "";
  }

  const fallbackCallingCode = getCountryCallingCode(fallbackCountry);
  return digits.startsWith(fallbackCallingCode)
    ? digits.slice(fallbackCallingCode.length)
    : digits;
}

function rebasePhoneValue(
  value: string,
  fromCountry: Country,
  toCountry: Country,
): string {
  const nationalDigits = getNationalDigits(value, fromCountry);
  const targetPrefix = getCountryPrefix(toCountry);

  return nationalDigits ? `${targetPrefix}${nationalDigits}` : targetPrefix;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(
    {
      value,
      onChange,
      defaultCountry = FALLBACK_COUNTRY,
      onCountryChange,
      invalid = false,
      theme = "dark",
      className,
      placeholder,
      ...inputProps
    },
    ref,
  ) {
    const [country, setCountry] = React.useState<Country>(() =>
      resolveCountry(defaultCountry),
    );

    React.useEffect(() => {
      setCountry(resolveCountry(defaultCountry));
    }, [defaultCountry]);

    const countryName = PHONE_LABELS[country] ?? country;
    const callingCode = getCountryCallingCode(country);
    const Flag = flags[country];
    const normalizedValue = React.useMemo(() => {
      if (!value) {
        return undefined;
      }

      return valueMatchesCountry(value, country)
        ? (value as Value)
        : undefined;
    }, [value, country]);

    React.useEffect(() => {
      if (value && normalizedValue === undefined) {
        const parsedCountry = safeParsePhoneNumber(value)?.country;
        const sourceCountry: Country =
          parsedCountry && isSupportedCountry(parsedCountry)
            ? (parsedCountry as Country)
            : country;
        const rebasedValue = rebasePhoneValue(value, sourceCountry, country);

        if (rebasedValue !== value) {
          onChange?.(rebasedValue);
          return;
        }

        onChange?.("");
      }
    }, [value, normalizedValue, onChange, country]);

    return (
      <div
        className={cn(
          styles.root,
          theme === "light" ? styles.rootLight : styles.rootDark,
          invalid && styles.invalid,
          className,
        )}
      >
        <label className={styles.countryPicker}>
          <span className={styles.flagSlot} aria-hidden="true">
            {Flag ? <Flag title={countryName} /> : null}
          </span>

          <select
            value={country}
            onChange={(event) => {
              const nextCountry = resolveCountry(event.target.value as Country);
              setCountry(nextCountry);

              if (value) {
                onChange?.(rebasePhoneValue(value, country, nextCountry));
              }

              onCountryChange?.(nextCountry);
            }}
            className={styles.countrySelect}
            aria-label="Seleccionar pais"
          >
            {COUNTRY_OPTIONS.map((countryCode) => {
              const optionLabel = PHONE_LABELS[countryCode] ?? countryCode;
              const optionCode = getCountryCallingCode(countryCode);

              return (
                <option key={countryCode} value={countryCode}>
                  {optionLabel} (+{optionCode})
                </option>
              );
            })}
          </select>
        </label>

        <RPNInput
          ref={ref}
          country={country}
          international
          withCountryCallingCode
          value={normalizedValue}
          onChange={(nextValue) => onChange?.(nextValue ?? "")}
          className={styles.numberInput}
          placeholder={placeholder ?? `+${callingCode} 55 1234 5678`}
          {...inputProps}
        />
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
