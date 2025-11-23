import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Employee } from '../../types/Employee';
import { calculateBaseSalary, calculateIRRF } from '../../utils/irrf';

interface EmployeesState {
  list: Employee[];
}

const initialState: EmployeesState = {
  list: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      const salarioBase = calculateBaseSalary(
        action.payload.salarioBruto,
        action.payload.descontoPrevidencia,
        action.payload.dependentes
      );
      const descontoIRRF = calculateIRRF(salarioBase);
      state.list.push({ ...action.payload, salarioBase, descontoIRRF });
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex(emp => emp.cpf === action.payload.cpf);
      if (index !== -1) {
        const salarioBase = calculateBaseSalary(
          action.payload.salarioBruto,
          action.payload.descontoPrevidencia,
          action.payload.dependentes
        );
        const descontoIRRF = calculateIRRF(salarioBase);
        state.list[index] = { ...action.payload, salarioBase, descontoIRRF };
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(emp => emp.cpf !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
