import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@mui/material";

import { formatCPF, formatCurrency } from "../../utils/format";
import { useEmployeeList } from "./useEmployeeList";
import { FilterButton } from "../FilterSidebar/FilterButton";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import EmployeeFormModal from "../EmployeeFormModal/EmployeeFormModal";
import DeleteEmployeeModal from "../DeleteEmployeeModal/DeleteEmployeeModal";
import type { Employee } from "../../types/Employee";
import { ActionMenu } from "./ActionMenu";

const EmployeeList: React.FC = () => {
  const {
    filteredEmployees,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleEditClose,
    handleClearFilters,
    filterSidebarOpen,
    setFilterSidebarOpen,
    filterName,
    filterCPF,
    setFilterName,
    setFilterCPF,
    selectedEmployee,
    isEditModalOpen,
    handleDeleteConfirm,
    handleDeleteClose,
    isDeleteModalOpen,
  } = useEmployeeList();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          mb: 4,
          p: { xs: 2, sm: 3 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Lista de Funcionários
          </Typography>
          <FilterButton onClick={() => setFilterSidebarOpen(true)} />
        </Box>
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 300px)", // define a altura do container
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 4,
            },
          }}
        >
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead
              sx={{
                position: "sticky",
                top: "0",
                backgroundColor: "background.paper",
                opacity: 1,
                zIndex: 1,
              }}
            >
              <TableRow
                sx={{
                  backgroundColor: "action.hover",
                  "& th": {
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    py: 1.5,
                    borderBottom: "2px solid",
                    borderColor: "divider",
                  },
                }}
              >
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  Salário Bruto
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  Desconto Previdência
                </TableCell>
                <TableCell align="center">Dependentes</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  Salário Base IR
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  Desconto IRRF
                </TableCell>
                <TableCell align="center" sx={{ width: 60 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhum funcionário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow
                    key={employee.cpf}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      "& td": {
                        py: 1.25,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {employee.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatCPF(employee.cpf)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        {formatCurrency(employee.grossSalary)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary">
                        {formatCurrency(employee.pensionDiscount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {employee.dependents}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary">
                        {employee.baseSalary
                          ? formatCurrency(employee.baseSalary)
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary">
                        {employee.IRRFdiscount
                          ? formatCurrency(employee.IRRFdiscount)
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ActionMenu
                        employee={employee}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
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
      <EmployeeFormModal
        open={isEditModalOpen}
        onClose={handleEditClose}
        onSubmit={handleEditSubmit}
        employee={selectedEmployee as Employee | undefined}
        title="Editar funcionário"
      />
      <DeleteEmployeeModal
        open={isDeleteModalOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        employee={selectedEmployee}
      />
    </>
  );
};

export default EmployeeList;
