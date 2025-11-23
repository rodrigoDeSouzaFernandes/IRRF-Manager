export const DEPENDENT_DEDUCTION = 189.59;

export function calculateBaseSalary(
  grossSalary: number,
  pensionDiscount: number,
  dependents: number
): number {
  return grossSalary - pensionDiscount - dependents * DEPENDENT_DEDUCTION;
}

export function calculateIRRF(grossSalary: number): number {
  if (grossSalary <= 2259.2) return 0;
  if (grossSalary <= 2826.65) return grossSalary * 0.075 - 169.44;
  if (grossSalary <= 3751.05) return grossSalary * 0.15 - 381.44;
  if (grossSalary <= 4664.68) return grossSalary * 0.225 - 662.77;
  return grossSalary * 0.275 - 896;
}
