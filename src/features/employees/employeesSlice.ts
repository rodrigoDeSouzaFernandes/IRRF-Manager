import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Employee } from '../../types/Employee';
import { calculateBaseSalary, calculateIRRF } from '../../utils/irrf';

interface EmployeesState {
  list: Employee[];
}

// Dados fake iniciais para demonstração
const getInitialEmployees = (): Employee[] => {
  const fakeEmployees: Omit<Employee, 'baseSalary' | 'IRRFdiscount'>[] = [
    {
      name: 'João Silva',
      cpf: '12345678901',
      grossSalary: 5000,
      pensionDiscount: 500,
      dependents: 2,
    },
    {
      name: 'Maria Santos',
      cpf: '98765432100',
      grossSalary: 3000,
      pensionDiscount: 300,
      dependents: 1,
    },
    {
      name: 'Pedro Oliveira',
      cpf: '11122233344',
      grossSalary: 8000,
      pensionDiscount: 800,
      dependents: 0,
    },
    {
      name: 'Ana Costa',
      cpf: '55566677788',
      grossSalary: 2500,
      pensionDiscount: 250,
      dependents: 3,
    },
  ];

  return fakeEmployees.map((emp) => {
    const baseSalary = calculateBaseSalary(
      emp.grossSalary,
      emp.pensionDiscount,
      emp.dependents
    );
    const IRRFdiscount = calculateIRRF(baseSalary);
    return { ...emp, baseSalary, IRRFdiscount };
  });
};

const initialState: EmployeesState = {
  list: getInitialEmployees(),
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      const baseSalary = calculateBaseSalary(
        action.payload.grossSalary,
        action.payload.pensionDiscount,
        action.payload.dependents
      );
      const IRRFdiscount = calculateIRRF(baseSalary);
      state.list.push({ ...action.payload, baseSalary, IRRFdiscount });
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex(emp => emp.cpf === action.payload.cpf);
      if (index !== -1) {
        const baseSalary = calculateBaseSalary(
          action.payload.grossSalary,
          action.payload.pensionDiscount,
          action.payload.dependents
        );
        const IRRFdiscount = calculateIRRF(baseSalary);
        state.list[index] = { ...action.payload, baseSalary, IRRFdiscount };
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(emp => emp.cpf !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
