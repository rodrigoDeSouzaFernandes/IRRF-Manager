import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../../../features/employees/employeesSlice";
import { useEmployeeList } from "../useEmployeeList";
import type { Employee } from "../../../types/Employee";
import { formatCurrency } from "../../../utils/format";
import type { ReactNode } from "react";

type UseEmployeeListReturn = ReturnType<typeof useEmployeeList>;
type EmployeeFormData = Parameters<UseEmployeeListReturn["handleEditSubmit"]>[0];

const mockEmployees: Employee[] = [
  {
    name: "João Silva",
    cpf: "12345678901",
    grossSalary: 5000,
    pensionDiscount: 500,
    dependents: 2,
    baseSalary: 4000,
    IRRFdiscount: 100,
  },
  {
    name: "Maria Santos",
    cpf: "98765432100",
    grossSalary: 3000,
    pensionDiscount: 300,
    dependents: 1,
    baseSalary: 2500,
    IRRFdiscount: 50,
  },
];

const createStore = (employees = mockEmployees) =>
  configureStore({
    reducer: {
      employees: employeesReducer,
    },
    preloadedState: {
      employees: {
        list: employees,
      },
    },
  });

const renderUseEmployeeList = (employees = mockEmployees) => {
  const store = createStore(employees);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  const hook = renderHook(() => useEmployeeList(), { wrapper });
  return { ...hook, store };
};

describe("useEmployeeList", () => {
  it("filters employees by name and CPF and clears filters", () => {
    const { result } = renderUseEmployeeList();

    expect(result.current.filteredEmployees).toHaveLength(2);

    act(() => {
      result.current.setFilterName("joão");
    });
    expect(result.current.filteredEmployees).toHaveLength(1);
    expect(result.current.filteredEmployees[0].name).toBe("João Silva");

    act(() => {
      result.current.setFilterCPF("98765432100");
    });
    expect(result.current.filteredEmployees).toHaveLength(0);

    act(() => {
      result.current.handleClearFilters();
    });
    expect(result.current.filterName).toBe("");
    expect(result.current.filterCPF).toBe("");
  });

  it("opens edit modal and updates employee on submit", () => {
    const { result, store } = renderUseEmployeeList();

    act(() => {
      result.current.handleEdit(mockEmployees[0]);
    });

    expect(result.current.selectedEmployee?.cpf).toBe("12345678901");
    expect(result.current.isEditModalOpen).toBe(true);

    const formData: EmployeeFormData = {
      name: "João Silva",
      cpf: mockEmployees[0].cpf,
      grossSalary: formatCurrency(6000),
      pensionDiscount: formatCurrency(600),
      dependents: "3",
    };

    act(() => {
      result.current.handleEditSubmit(formData);
    });

    const updatedEmployee = store.getState().employees.list[0];
    expect(updatedEmployee.grossSalary).toBe(6000);
    expect(updatedEmployee.pensionDiscount).toBe(600);
    expect(updatedEmployee.dependents).toBe(3);
    expect(result.current.selectedEmployee).toBeNull();
    expect(result.current.isEditModalOpen).toBe(false);
  });

  it("opens delete modal and removes employee on confirm", () => {
    const { result, store } = renderUseEmployeeList();

    act(() => {
      result.current.handleDelete(mockEmployees[0]);
    });

    expect(result.current.selectedEmployee?.cpf).toBe("12345678901");
    expect(result.current.isDeleteModalOpen).toBe(true);

    act(() => {
      result.current.handleDeleteConfirm();
    });

    expect(store.getState().employees.list).toHaveLength(1);
    expect(result.current.selectedEmployee).toBeNull();

    act(() => {
      result.current.handleDeleteClose();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
  });
});


