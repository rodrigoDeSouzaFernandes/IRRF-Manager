import { describe, it, expect } from 'vitest';
import { calculateBaseSalary, calculateIRRF, DEPENDENT_DEDUCTION } from '../irrf';

describe('IRRF Calculations', () => {
  describe('calculateBaseSalary', () => {
    it('should calculate base salary correctly without dependents', () => {
      const result = calculateBaseSalary(5000, 500, 0);
      expect(result).toBe(4500);
    });

    it('should calculate base salary correctly with dependents', () => {
      const result = calculateBaseSalary(5000, 500, 2);
      const expected = 5000 - 500 - 2 * DEPENDENT_DEDUCTION;
      expect(result).toBe(expected);
    });

    it('should handle zero gross salary', () => {
      const result = calculateBaseSalary(0, 0, 0);
      expect(result).toBe(0);
    });

    it('should handle large number of dependents', () => {
      const result = calculateBaseSalary(10000, 1000, 5);
      const expected = 10000 - 1000 - 5 * DEPENDENT_DEDUCTION;
      expect(result).toBe(expected);
    });
  });

  describe('calculateIRRF', () => {
    it('should return 0 for salary up to 2259.20', () => {
      expect(calculateIRRF(2259.2)).toBe(0);
      expect(calculateIRRF(1000)).toBe(0);
      expect(calculateIRRF(0)).toBe(0);
    });

    it('should calculate correctly for bracket 2259.21 to 2826.65 (7.5%)', () => {
      const salary = 2500;
      const expected = salary * 0.075 - 169.44;
      expect(calculateIRRF(salary)).toBeCloseTo(expected, 2);
    });

    it('should calculate correctly for bracket 2826.66 to 3751.05 (15%)', () => {
      const salary = 3000;
      const expected = salary * 0.15 - 381.44;
      expect(calculateIRRF(salary)).toBeCloseTo(expected, 2);
    });

    it('should calculate correctly for bracket 3751.06 to 4664.68 (22.5%)', () => {
      const salary = 4000;
      const expected = salary * 0.225 - 662.77;
      expect(calculateIRRF(salary)).toBeCloseTo(expected, 2);
    });

    it('should calculate correctly for salary above 4664.68 (27.5%)', () => {
      const salary = 5000;
      const expected = salary * 0.275 - 896;
      expect(calculateIRRF(salary)).toBeCloseTo(expected, 2);
    });

    it('should handle edge cases at bracket boundaries', () => {
      expect(calculateIRRF(2259.21)).toBeCloseTo(2259.21 * 0.075 - 169.44, 2);
      expect(calculateIRRF(2826.65)).toBeCloseTo(2826.65 * 0.075 - 169.44, 2);
      expect(calculateIRRF(2826.66)).toBeCloseTo(2826.66 * 0.15 - 381.44, 2);
      expect(calculateIRRF(3751.05)).toBeCloseTo(3751.05 * 0.15 - 381.44, 2);
      expect(calculateIRRF(3751.06)).toBeCloseTo(3751.06 * 0.225 - 662.77, 2);
      expect(calculateIRRF(4664.68)).toBeCloseTo(4664.68 * 0.225 - 662.77, 2);
      expect(calculateIRRF(4664.69)).toBeCloseTo(4664.69 * 0.275 - 896, 2);
    });
  });
});

