import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import { type Employee } from "../../types/Employee";
import { formatCPF, unformatCPF, parseCurrency, formatCurrency } from "../../utils/format";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

const employeeSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .refine((val) => unformatCPF(val).length === 11, "CPF deve ter 11 dígitos"),
  grossSalary: z
    .string()
    .refine((val) => {
      const num = parseCurrency(val);
      return num > 0;
    }, "Salário deve ser maior que zero"),
  descontoPrevidencia: z
    .string()
    .refine((val) => {
      const num = parseCurrency(val);
      return num >= 0;
    }, "Desconto deve ser maior ou igual a zero"),
  dependents: z
    .number()
    .int("Dependentes deve ser um número inteiro")
    .min(0, "Dependentes deve ser maior ou igual a zero"),
});

type EmployeeFormInput = z.infer<typeof employeeSchema>;

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormInput) => void;
  employee?: Employee | null;
  title: string;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  title,
}) => {
  const {
    register,
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
      setValue("grossSalary", formatCurrency(employee.grossSalary).replace('R$', '').trim());
      setValue("descontoPrevidencia", formatCurrency(employee.descontoPrevidencia).replace('R$', '').trim());
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Nome"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
              />
              <TextField
                label="CPF"
                placeholder="000.000.000-00"
                fullWidth
                {...register("cpf")}
                onChange={handleCPFChange}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                disabled={!!employee}
                InputProps={{
                  readOnly: !!employee,
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <CurrencyInput
                  label="Salário Bruto"
                  fullWidth
                  value={watch("grossSalary") || ""}
                  onChange={(value) => setValue("grossSalary", value, { shouldValidate: true })}
                  error={!!errors.grossSalary}
                  helperText={errors.grossSalary?.message}
                />
                <CurrencyInput
                  label="Desconto Previdência"
                  fullWidth
                  value={watch("descontoPrevidencia") || ""}
                  onChange={(value) => setValue("descontoPrevidencia", value, { shouldValidate: true })}
                  error={!!errors.descontoPrevidencia}
                  helperText={errors.descontoPrevidencia?.message}
                />
              </Box>
              <TextField
                label="Número de Dependentes"
                type="number"
                fullWidth
                inputProps={{ step: "1", min: "0" }}
                {...register("dependents", { valueAsNumber: true })}
                error={!!errors.dependents}
                helperText={errors.dependents?.message}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmployeeFormModal;

