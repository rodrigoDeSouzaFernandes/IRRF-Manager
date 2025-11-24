import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  formatCPF,
  formatCurrency,
  parseCurrency,
  unformatCPF,
} from "../../utils/format";
import { useEffect } from "react";
import type { EmployeeFormInput, IuseEmployeeFormModalProps } from "./types";
import { employeeSchema } from "./schemas/employeeFormSchema";

export const useEmployeeFormModal = ({
  onClose,
  onSubmit,
  employee,
}: IuseEmployeeFormModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      cpf: "",
      grossSalary: "",
      descontoPrevidencia: "",
      dependents: 0,
    },
  });

  useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("cpf", formatCPF(employee.cpf));
      setValue(
        "grossSalary",
        formatCurrency(employee.grossSalary).replace("R$", "").trim()
      );
      setValue(
        "descontoPrevidencia",
        formatCurrency(employee.descontoPrevidencia).replace("R$", "").trim()
      );
      setValue("dependents", employee.dependents);
    } else {
      reset();
    }
  }, [employee, setValue, reset]);

  const handleFormSubmit = (data: EmployeeFormInput) => {
    onSubmit({
      ...data,
      cpf: unformatCPF(data.cpf),
      grossSalary: parseCurrency(data.grossSalary),
      descontoPrevidencia: parseCurrency(data.descontoPrevidencia),
    } as any);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCPF(value);
    setValue("cpf", formatted, { shouldValidate: true });
  };


  return {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    handleFormSubmit,
    handleClose,
    handleCPFChange,
    errors,
  };
};
