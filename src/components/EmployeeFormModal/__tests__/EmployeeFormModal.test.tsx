import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeFormModal from "../EmployeeFormModal";
import { useEmployeeFormModal } from "../useEmployeeFormModal";
import type { Employee } from "../../../types/Employee";
import type { JSX } from "react";

vi.mock("../useEmployeeFormModal", () => ({
  useEmployeeFormModal: vi.fn(),
}));

vi.mock("react-hook-form", () => ({
  Controller: ({
    render,
  }: {
    render: (fieldProps: { field: { value: string; onChange: () => void } }) => JSX.Element;
  }) => render({ field: { value: "", onChange: vi.fn() } }),
}));

const mockedHook = useEmployeeFormModal as MockedFunction<
  typeof useEmployeeFormModal
>;

const createHookReturn = () => {
  const register = vi.fn(() => ({
    name: "",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  const handleFormSubmit = vi.fn();
  const handleSubmit = vi.fn(
    (callback: () => void) =>
      () => {
        callback();
      }
  );
  return {
    register,
    control: {},
    handleSubmit,
    handleFormSubmit,
    handleClose: vi.fn(),
    handleCPFChange: vi.fn(),
    reset: vi.fn(),
    setValue: vi.fn(),
    watch: vi.fn(),
    errors: {},
  };
};

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
  employee: undefined as Employee | undefined,
  title: "Cadastrar Funcionário",
};

const setup = (
  overrides: Partial<ReturnType<typeof useEmployeeFormModal>> = {},
  propsOverrides: Partial<typeof defaultProps> = {}
) => {
  const hookReturn = { ...createHookReturn(), ...overrides };
  mockedHook.mockReturnValue(hookReturn as ReturnType<typeof useEmployeeFormModal>);
  const user = userEvent.setup();
  const props = { ...defaultProps, ...propsOverrides };
  render(<EmployeeFormModal {...props} />);
  return { hookReturn, user };
};

describe("EmployeeFormModal (component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders provided title", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Cadastrar Funcionário" })
    ).toBeInTheDocument();
  });

  it("disables CPF field when editing an employee", () => {
    const employee: Employee = {
      name: "João Silva",
      cpf: "12345678901",
      grossSalary: 5000,
      descontoPrevidencia: 500,
      dependents: 2,
    };

    setup({}, { employee, title: "Editar Funcionário" });

    const cpfInput = screen.getByLabelText("CPF");
    expect(cpfInput).toBeDisabled();
  });

  it("calls handleSubmit with handleFormSubmit when form is submitted", async () => {
    const { hookReturn, user } = setup();

    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(hookReturn.handleSubmit).toHaveBeenCalledWith(
      hookReturn.handleFormSubmit
    );
    expect(hookReturn.handleFormSubmit).toHaveBeenCalled();
  });

  it("calls handleClose when cancel button is clicked", async () => {
    const { hookReturn, user } = setup();

    await user.click(screen.getByText("Cancelar"));

    expect(hookReturn.handleClose).toHaveBeenCalled();
  });

  it("forward CPF input changes to hook handler", async () => {
    const { hookReturn, user } = setup();
    const cpfInput = screen.getByLabelText("CPF");

    await user.type(cpfInput, "123");

    expect(hookReturn.handleCPFChange).toHaveBeenCalled();
  });
});