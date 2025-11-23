export interface Employee {
  nome: string;
  cpf: string;
  salarioBruto: number;
  descontoPrevidencia: number;
  dependentes: number;
  salarioBase?: number;
  descontoIRRF?: number;
}
