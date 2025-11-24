import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import { useEmployeeFormModal } from "./useEmployeeFormModal";
import type { EmployeeFormModalProps } from "./types";
import { Controller } from "react-hook-form";

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  title,
}) => {
  const {
    register,
    control,
    handleSubmit,
    handleFormSubmit,
    handleClose,
    handleCPFChange,
    errors,
  } = useEmployeeFormModal({ onClose, onSubmit, employee });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 0 }}>
            <Grid size={12}>
              <TextField
                label="Nome"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="CPF"
                placeholder="000.000.000-00"
                max={14}
                fullWidth
                {...register("cpf")}
                onChange={handleCPFChange}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                disabled={!!employee}
                inputProps={{
                  maxLength: 14,
                  readOnly: !!employee,
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="grossSalary"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Salário Bruto"
                    fullWidth
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.grossSalary}
                    helperText={errors.grossSalary?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="descontoPrevidencia"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Desconto Previdência"
                    fullWidth
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.descontoPrevidencia}
                    helperText={errors.descontoPrevidencia?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Número de Dependentes"
                type="text"
                fullWidth
                inputProps={{ step: "1", min: "0" }}
                {...register("dependents", {
                  valueAsNumber: true,
                  setValueAs: (v) => (v === "" ? -1 : Number(v)),
                  required: "Campo obrigatório",
                })}
                error={!!errors.dependents}
                helperText={errors.dependents?.message}
                onBeforeInput={(event) => {
                  const char = event.data;
                  const notNumber = /^\D$/;
                  if (!char) return;
                  if (notNumber.test(char)) {
                    event.preventDefault();
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
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
