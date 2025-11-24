import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Employee } from "../../../types/Employee";
import DeleteEmployeeModal from "../DeleteEmployeeModal";

const defaultEmployee: Employee = {
  name: "Maria Santos",
  cpf: "98765432100",
  grossSalary: 3000,
  pensionDiscount: 300,
  dependents: 1,
  baseSalary: 2700,
  IRRFdiscount: 150,
};

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  employee: defaultEmployee,
};

const setup = (propsOverrides = {}) => {
  const user = userEvent.setup();
  const props = { ...defaultProps, ...propsOverrides };
  render(<DeleteEmployeeModal {...props} />);
  return { user, props };
};

describe("DeleteEmployeeModal (component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title and confirmation text", () => {
    setup();
    expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
    expect(
      screen.getByText("Tem certeza que deseja excluir o funcionário abaixo?")
    ).toBeInTheDocument();
  });

  it("renders employee details correctly", () => {
    setup();
    expect(screen.getByText(/Maria Santos/)).toBeInTheDocument();
    expect(screen.getByText(/987\.654\.321-00/)).toBeInTheDocument();
    expect(screen.getByText("R$ 3.000,00")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("calls onConfirm and onClose when delete button is clicked", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button", { name: "Excluir" }));
    expect(props.onConfirm).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it("renders error warning text", () => {
    setup();
    expect(
      screen.getByText("Esta ação não pode ser desfeita.")
    ).toBeInTheDocument();
  });

  it("returns null if no employee is provided", () => {
    render(
      <DeleteEmployeeModal
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        employee={null}
      />
    );
    expect(screen.queryByText("Confirmar Exclusão")).not.toBeInTheDocument();
  });
});
