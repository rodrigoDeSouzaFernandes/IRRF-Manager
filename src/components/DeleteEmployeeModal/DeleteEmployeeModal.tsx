import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { type Employee } from "../../types/Employee";
import { formatCPF, formatCurrency } from "../../utils/format";

interface DeleteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: Employee | null;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  open,
  onClose,
  onConfirm,
  employee,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Tem certeza que deseja excluir o funcionário abaixo?
        </Typography>
        <Box
          sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Nome:</strong> {employee.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>CPF:</strong> {formatCPF(employee.cpf)}
          </Typography>
          <Typography variant="body2">
            <strong>Salário Bruto:</strong>{" "}
            {formatCurrency(employee.grossSalary)}
          </Typography>
        </Box>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployeeModal;
