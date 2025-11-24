import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";
import { deleteEmployee } from "../../features/employees/employeesSlice";
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
import {
  formatCPF,
  formatCurrency,
  unformatCPF,
  parseCurrency,
} from "../../utils/format";
import { type Employee } from "../../types/Employee";

import { updateEmployee } from "../../features/employees/employeesSlice";

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const [filterName, setFilterName] = useState("");
  const [filterCPF, setFilterCPF] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const nameMatch = emp.name
        .toLowerCase()
        .includes(filterName.toLowerCase());
      const cpfMatch = emp.cpf.includes(unformatCPF(filterCPF));
      return nameMatch && cpfMatch;
    });
  }, [employees, filterName, filterCPF]);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    // TODO: Implement edit modal
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    // TODO: Implement delete modal
  };

  const handleEditSubmit = (data: {
    name: string;
    cpf: string;
    grossSalary: string | number;
    descontoPrevidencia: string | number;
    dependents: number;
  }) => {
    if (selectedEmployee) {
      const grossSalary =
        typeof data.grossSalary === "string"
          ? parseCurrency(data.grossSalary)
          : data.grossSalary;
      const descontoPrevidencia =
        typeof data.descontoPrevidencia === "string"
          ? parseCurrency(data.descontoPrevidencia)
          : data.descontoPrevidencia;

      dispatch(
        updateEmployee({
          ...data,
          cpf: selectedEmployee.cpf,
          grossSalary,
          descontoPrevidencia,
        } as Employee)
      );
    }
    // TODO: Implement edit modal
    setSelectedEmployee(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployee(selectedEmployee.cpf));
    }
    // TODO: Implement delete modal
    setSelectedEmployee(null);
  };

  const handleClearFilters = () => {
    setFilterName("");
    setFilterCPF("");
  };

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
    </>
  );
};

export default EmployeeList;
