import type { z } from "zod";
import type { Employee } from "../../types/Employee";
import type { employeeSchema } from "./schemas/employeeFormSchema";

export type EmployeeFormInput = z.infer<typeof employeeSchema>;

export interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormInput) => void;
  employee?: Employee;
  title: string;
}

export interface IuseEmployeeFormModalProps {
  onClose: () => void;
  onSubmit: (data: EmployeeFormInput) => void;
  employee?: Employee;
}
