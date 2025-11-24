import React from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatCPF } from "../../utils/format";

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filterName: string;
  filterCPF: string;
  onFilterNameChange: (value: string) => void;
  onFilterCPFChange: (value: string) => void;
  onClearFilters: () => void;
  employeeCount: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  onClose,
  filterName,
  filterCPF,
  onFilterNameChange,
  onFilterCPFChange,
  onClearFilters,
  employeeCount,
}) => {
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCPF(value);
    onFilterCPFChange(formatted);
  };

  const hasActiveFilters = filterName || filterCPF;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { width: { xs: "100%", sm: 400 } },
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Filtros</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Filtrar por Nome"
              variant="outlined"
              fullWidth
              value={filterName}
              onChange={(e) => onFilterNameChange(e.target.value)}
              placeholder="Digite o nome..."
            />

            <TextField
              label="Filtrar por CPF"
              variant="outlined"
              fullWidth
              value={filterCPF}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {employeeCount} funcionário(s) encontrado(s)
              </Typography>
            </Box>

            {hasActiveFilters && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={onClearFilters}
                sx={{ mt: 2 }}
              >
                Limpar Filtros
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
