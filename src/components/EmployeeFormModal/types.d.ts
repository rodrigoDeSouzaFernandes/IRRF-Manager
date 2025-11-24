import type { employeeSchema } from "./schemas/employeeFormSchema";

export type EmployeeFormInput = z.infer<typeof employeeSchema>;

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormInput) => void;
  employee?: Employee | null;
  title: string;
}

interface IuseEmployeeFormModalProps {
  onClose: () => void;
  onSubmit: (data: EmployeeFormInput) => void;
  employee: Employee;
}
