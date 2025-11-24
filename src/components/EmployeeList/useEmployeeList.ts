import { useMemo, useState } from "react";
import { type RootState, type AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import type { Employee } from "../../types/Employee";
import { parseCurrency, unformatCPF } from "../../utils/format";
import {
  deleteEmployee,
  updateEmployee,
} from "../../features/employees/employeesSlice";

export const useEmployeeList = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const [filterName, setFilterName] = useState<string>("");
  const [filterCPF, setFilterCPF] = useState<string>("");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState<boolean>(false);

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

  return {
    filteredEmployees,
    handleEdit,
    handleDelete,
    handleEditSubmit,
    handleDeleteConfirm,
    handleClearFilters,
    filterSidebarOpen,
    setFilterSidebarOpen,
    filterCPF,
    filterName,
    setFilterCPF,
    setFilterName

  };
};
