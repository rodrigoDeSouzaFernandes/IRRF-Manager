import { useMemo, useState } from "react";
import { type RootState, type AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import type { Employee } from "../../types/Employee";
import { parseCurrency, unformatCPF } from "../../utils/format";
import {
  deleteEmployee,
  updateEmployee,
} from "../../features/employees/employeesSlice";
import type { EmployeeFormInput } from "../EmployeeFormModal/EmployeeFormModal";

export const useEmployeeList = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const [filterName, setFilterName] = useState<string>("");
  const [filterCPF, setFilterCPF] = useState<string>("");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState<boolean>(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    // TODO: Implement delete modal
  };

  const handleEditSubmit = (data: EmployeeFormInput) => {
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
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
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
    handleEditClose,
    handleDeleteConfirm,
    handleClearFilters,
    filterSidebarOpen,
    setFilterSidebarOpen,
    filterCPF,
    filterName,
    setFilterCPF,
    setFilterName,
    selectedEmployee,
    isEditModalOpen,
  };
};
