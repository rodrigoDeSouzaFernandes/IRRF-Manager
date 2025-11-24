export interface Employee {
  name: string;
  cpf: string;
  grossSalary: number;
  pensionDiscount: number;
  dependents: number;
  baseSalary?: number;
  IRRFdiscount?: number;
}
