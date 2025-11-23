import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const employeeSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  salarioBruto: z.number().min(0, "Salário deve ser maior que zero"),
  descontoPrevidencia: z
    .number()
    .min(0, "Desconto deve ser maior ou igual a zero"),
  dependentes: z.number().min(0, "Dependentes deve ser maior ou igual a zero"),
});

type EmployeeFormInput = z.infer<typeof employeeSchema>;

const EmployeeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeSchema),
  });

  const onFormSubmit = (data: EmployeeFormInput) => {
    alert("onSubmit");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label="Nome"
            fullWidth
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="CPF"
            placeholder="000.000.000-00"
            fullWidth
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Salário Bruto"
            type="number"
            fullWidth
            {...register("salarioBruto", { valueAsNumber: true })}
            error={!!errors.salarioBruto}
            helperText={errors.salarioBruto?.message}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Desconto Previdência"
            type="number"
            fullWidth
            {...register("descontoPrevidencia", { valueAsNumber: true })}
            error={!!errors.descontoPrevidencia}
            helperText={errors.descontoPrevidencia?.message}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Dependentes"
            type="number"
            fullWidth
            {...register("dependentes", { valueAsNumber: true })}
            error={!!errors.dependentes}
            helperText={errors.dependentes?.message}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
