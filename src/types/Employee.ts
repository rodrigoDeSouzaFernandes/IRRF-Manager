export interface Employee {
  name: string;
  cpf: string;
  grossSalary: number;
  descontoPrevidencia: number;
  dependents: number;
  baseSalary?: number;
  IRRFdiscount?: number;
}
