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
import { beforeInput } from "../../utils/beforeInput";

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
                slotProps={{
                  htmlInput: {
                    maxLength: 60,
                  },
                }}
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
                slotProps={{
                  htmlInput: {
                    maxLength: 14,
                    readOnly: !!employee,
                    inputMode: "numeric",
                  },
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
                    slotProps={{
                      htmlInput: {
                        maxLength: 17,
                        inputMode: "numeric",
                      },
                    }}
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
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        maxLength: 17,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dependents"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Número de Dependentes"
                    fullWidth
                    value={field.value || ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        e.target.value = Number(e.target.value).toString();
                      }
                      field.onChange(e);
                    }}
                    error={!!errors.dependents}
                    helperText={errors.dependents?.message}
                    onBeforeInput={beforeInput.onlyNumbers}
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        maxLength: 2,
                      },
                    }}
                  />
                )}
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
