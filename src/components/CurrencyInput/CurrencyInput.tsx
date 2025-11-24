import React from "react";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { parseCurrency, formatCurrency } from "../../utils/format";

interface CurrencyInputProps
  extends Omit<TextFieldProps, "value" | "onChange" | "type"> {
  value: string;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const CurrencyInput = ({ value, onChange, ...props }: CurrencyInputProps) => {
  const getDisplayValue = () => {
    if (!value || value === "") return "";
    const numValue = parseCurrency(value);
    if (numValue > 0) {
      return formatCurrency(numValue);
    }
    return "";
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
    const event = e.nativeEvent as InputEvent;
    const char = event.data;

    if (char && !/^\d$/.test(char)) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numbersOnly = inputValue.replace(/\D/g, "");

    if (numbersOnly === "") {
      onChange("");
      return;
    }

    const numericValue = parseInt(numbersOnly, 10) / 100;
    const formatted = formatCurrency(numericValue);
    const cleanValue = formatted.replace("R$", "").trim();
    onChange(cleanValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
      ].includes(e.key) ||
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
    ) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const numbersOnly = pastedText.replace(/\D/g, "");

    if (numbersOnly) {
      const numericValue = parseInt(numbersOnly, 10) / 100;
      const formatted = formatCurrency(numericValue);
      const cleanValue = formatted.replace("R$", "").trim();
      onChange(cleanValue);
    }
  };

  return (
    <TextField
      {...props}
      value={getDisplayValue()}
      onBeforeInput={handleBeforeInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
 
    />
  );
};

export default CurrencyInput;
