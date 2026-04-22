"use client";

import { Button } from "@/components/ui/button/button";
import styles from "./form.module.css";

type ImageSectionFormProps = {
  config: ImageSectionFormConfig;
  idPrefix?: string;
};

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

export type ImageSectionFormConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  fields: readonly FormFieldConfig[];
};

export default function ImageSectionForm({
  config,
  idPrefix = "image-form",
}: ImageSectionFormProps) {
  return (
    <form
      className={styles.formContainer}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className={styles.formHead}>
        <p className={styles.formEyebrow}>{config.eyebrow}</p>
        <h3 className={styles.formTitle}>{config.title}</h3>
        <p className={styles.formSub}>{config.subtitle}</p>
      </div>

      {config.fields.map((field) => {
        const fieldId = `${idPrefix}-${field.id}`;

        return (
          <div key={field.id} className={styles.formGroup}>
            <label htmlFor={fieldId} className={styles.formLabel}>
              {field.label}
            </label>

            {field.as === "textarea" ? (
              <textarea
                id={fieldId}
                name={field.id}
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder={field.placeholder}
                rows={field.rows ?? 4}
                required={field.required}
              />
            ) : field.as === "select" ? (
              <select
                id={fieldId}
                name={field.id}
                className={`${styles.formInput} ${styles.formSelect}`}
                defaultValue=""
                required={field.required}
              >
                <option value="" disabled>
                  {field.placeholder ?? "Selecciona una opcion"}
                </option>
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type ?? "text"}
                id={fieldId}
                name={field.id}
                className={styles.formInput}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        );
      })}

      <Button type="button" className={styles.formButton}>
        {config.submitLabel}
      </Button>
    </form>
  );
}
