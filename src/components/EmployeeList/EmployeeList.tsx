import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formatCPF, formatCurrency } from "../../utils/format";
import { useEmployeeList } from "./useEmployeeList";
import { FilterButton } from "../FilterSidebar/FilterButton";
import FilterSidebar from "../FilterSidebar/FilterSidebar";

const EmployeeList: React.FC = () => {
  const {
    filteredEmployees,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteConfirm,
    handleClearFilters,
    filterSidebarOpen,
    setFilterSidebarOpen,
    filterName,
    filterCPF,
    setFilterName,
    setFilterCPF,
  } = useEmployeeList();

  return (
    <>
      <Paper sx={{ mt: 4, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Lista de Funcionários</Typography>
          <FilterButton onClick={() => setFilterSidebarOpen(true)} />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nome</strong>
                </TableCell>
                <TableCell>
                  <strong>CPF</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Salário Bruto</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Desconto Previdência</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Dependentes</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Salário Base IR</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Desconto IRRF</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary">
                      Nenhum funcionário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.cpf} hover>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{formatCPF(employee.cpf)}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(employee.grossSalary)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(employee.descontoPrevidencia)}
                    </TableCell>
                    <TableCell align="center">{employee.dependents}</TableCell>
                    <TableCell align="right">
                      {employee.baseSalary
                        ? formatCurrency(employee.baseSalary)
                        : "-"}
                    </TableCell>
                    <TableCell align="right">
                      {employee.IRRFdiscount
                        ? formatCurrency(employee.IRRFdiscount)
                        : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(employee)}
                        aria-label="editar"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(employee)}
                        aria-label="excluir"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FilterSidebar
        open={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filterName={filterName}
        filterCPF={filterCPF}
        onFilterNameChange={setFilterName}
        onFilterCPFChange={setFilterCPF}
        onClearFilters={handleClearFilters}
        employeeCount={filteredEmployees.length}
      />
    </>
  );
};

export default EmployeeList;
