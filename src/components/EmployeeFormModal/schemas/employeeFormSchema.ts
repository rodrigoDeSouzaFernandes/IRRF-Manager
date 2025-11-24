import z from "zod";
import { parseCurrency, unformatCPF } from "../../../utils/format";

export const employeeSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .refine((val) => unformatCPF(val).length === 11, "CPF deve ter 11 dígitos"),
  grossSalary: z
    .string()
    .nonempty("Campo obrigatório")
    .refine((val) => {
      const num = parseCurrency(val);
      return num > 0;
    }, "Salário deve ser maior que zero"),
  pensionDiscount: z
    .string()
    .nonempty("Campo obrigatório")
    .refine((val) => {
      const num = parseCurrency(val);
      return num >= 0;
    }, "Desconto deve ser maior ou igual a zero"),
  dependents: z
    .string()
    .nonempty("Campo obrigatório")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && Number.isInteger(num) && num >= 0;
    }, "Dependentes deve ser um número inteiro maior ou igual a zero"),
});
