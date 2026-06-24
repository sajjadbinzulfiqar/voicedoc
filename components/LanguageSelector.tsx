"use client";

import type { LanguageCode } from "@/lib/types";
import { languages } from "@/lib/constants";
import { Select } from "@/components/ui/select";

type LanguageSelectorProps = {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
  disabled?: boolean;
};

export function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
  return (
    <Select
      label="Consultation language"
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as LanguageCode)}
      options={languages.map((language) => ({ value: language.code, label: `${language.label} · ${language.nativeLabel}` }))}
    />
  );
}
