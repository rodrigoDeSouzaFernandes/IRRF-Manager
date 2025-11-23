import { describe, it, expect } from 'vitest';
import { formatCPF, unformatCPF, formatCurrency, validateCPF } from '../format';

describe('Format Utilities', () => {
  describe('formatCPF', () => {
    it('should format CPF correctly', () => {
      expect(formatCPF('12345678901')).toBe('123.456.789-01');
    });

    it('should return original string if CPF is invalid length', () => {
      expect(formatCPF('123456789')).toBe('123456789');
      expect(formatCPF('123456789012')).toBe('123456789012');
    });

    it('should handle already formatted CPF', () => {
      expect(formatCPF('123.456.789-01')).toBe('123.456.789-01');
    });
  });

  describe('unformatCPF', () => {
    it('should remove formatting from CPF', () => {
      expect(unformatCPF('123.456.789-01')).toBe('12345678901');
      expect(unformatCPF('12345678901')).toBe('12345678901');
    });

    it('should handle strings with other characters', () => {
      expect(unformatCPF('abc123.456.789-01def')).toBe('12345678901');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      const normalize = (str: string) => str.replace(/\u00A0/g, ' ');
      expect(normalize(formatCurrency(1000))).toBe('R$ 1.000,00');
      expect(normalize(formatCurrency(1234.56))).toBe('R$ 1.234,56');
      expect(normalize(formatCurrency(0))).toBe('R$ 0,00');
    });

    it('should handle large numbers', () => {
      const normalize = (str: string) => str.replace(/\u00A0/g, ' ');
      expect(normalize(formatCurrency(1000000))).toBe('R$ 1.000.000,00');
    });

    it('should handle decimal values', () => {
      const normalize = (str: string) => str.replace(/\u00A0/g, ' ');
      expect(normalize(formatCurrency(99.99))).toBe('R$ 99,99');
    });
  });

  describe('validateCPF', () => {
    it('should validate CPF format correctly', () => {
      expect(validateCPF('12345678901')).toBe(true);
      expect(validateCPF('123.456.789-01')).toBe(true);
      expect(validateCPF('123456789')).toBe(false);
      expect(validateCPF('123456789012')).toBe(false);
    });
  });
});

