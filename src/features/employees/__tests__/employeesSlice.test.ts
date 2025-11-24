import { describe, it, expect } from "vitest";
import employeesReducer, {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../employeesSlice";
import { type Employee } from "../../../types/Employee";

describe("employeesSlice", () => {
  const mockEmployee: Employee = {
    name: "João Silva",
    cpf: "12345678901",
    grossSalary: 5000,
    pensionDiscount: 500,
    dependents: 2,
  };

  describe("addEmployee", () => {
    it("should add a new employee with calculated IRRF", () => {
      const initialState = { list: [] };
      const action = addEmployee(mockEmployee);
      const state = employeesReducer(initialState, action);

      expect(state.list).toHaveLength(1);
      expect(state.list[0].name).toBe(mockEmployee.name);
      expect(state.list[0].cpf).toBe(mockEmployee.cpf);
      expect(state.list[0].baseSalary).toBeDefined();
      expect(state.list[0].IRRFdiscount).toBeDefined();
    });

    it("should add multiple employees", () => {
      const initialState = { list: [] };
      const employee2: Employee = {
        ...mockEmployee,
        cpf: "98765432100",
        name: "Maria Santos",
      };

      let state = employeesReducer(initialState, addEmployee(mockEmployee));
      state = employeesReducer(state, addEmployee(employee2));

      expect(state.list).toHaveLength(2);
    });
  });

  describe("updateEmployee", () => {
    it("should update an existing employee", () => {
      const initialState = {
        list: [{ ...mockEmployee, baseSalary: 4000, IRRFdiscount: 100 }],
      };

      const updatedEmployee: Employee = {
        ...mockEmployee,
        name: "João Silva Atualizado",
        grossSalary: 6000,
      };

      const action = updateEmployee(updatedEmployee);
      const state = employeesReducer(initialState, action);

      expect(state.list).toHaveLength(1);
      expect(state.list[0].name).toBe("João Silva Atualizado");
      expect(state.list[0].grossSalary).toBe(6000);
      expect(state.list[0].baseSalary).toBeDefined();
      expect(state.list[0].IRRFdiscount).toBeDefined();
    });

    it("should not update if employee does not exist", () => {
      const initialState = { list: [] };
      const action = updateEmployee(mockEmployee);
      const state = employeesReducer(initialState, action);

      expect(state.list).toHaveLength(0);
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee by CPF", () => {
      const initialState = {
        list: [
          mockEmployee,
          { ...mockEmployee, cpf: "98765432100", name: "Maria" },
        ],
      };

      const action = deleteEmployee("12345678901");
      const state = employeesReducer(initialState, action);

      expect(state.list).toHaveLength(1);
      expect(state.list[0].cpf).toBe("98765432100");
    });

    it("should not delete if CPF does not exist", () => {
      const initialState = { list: [mockEmployee] };
      const action = deleteEmployee("99999999999");
      const state = employeesReducer(initialState, action);

      expect(state.list).toHaveLength(1);
    });
  });
});
