import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSidebar from "../FilterSidebar";

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  filterName: "",
  filterCPF: "",
  onFilterNameChange: vi.fn(),
  onFilterCPFChange: vi.fn(),
  onClearFilters: vi.fn(),
  employeeCount: 5,
};

const setup = (propsOverrides = {}) => {
  const user = userEvent.setup();
  const props = { ...defaultProps, ...propsOverrides };
  render(<FilterSidebar {...props} />);
  return { user, props };
};

describe("FilterSidebar (component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sidebar title and employee count", () => {
    setup();
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("5 funcionário(s) encontrado(s)")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const { user, props } = setup();
    await user.click(screen.getByRole("button"));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("calls onFilterNameChange when typing in the name field", async () => {
    const { user, props } = setup();
    const nameInput = screen.getByLabelText("Filtrar por Nome");
    await user.type(nameInput, "Maria");
    expect(props.onFilterNameChange).toHaveBeenCalledWith("M");
    expect(props.onFilterNameChange).toHaveBeenCalledWith("a");
    expect(props.onFilterNameChange).toHaveBeenCalledWith("r");
    expect(props.onFilterNameChange).toHaveBeenCalledWith("i");
    expect(props.onFilterNameChange).toHaveBeenCalledWith("a");
  });

  it("calls onFilterCPFChange with formatted value when typing in the CPF field", async () => {
    const { user, props } = setup();
    const cpfInput = screen.getByLabelText("Filtrar por CPF");
    await user.type(cpfInput, "98765432100");
    expect(props.onFilterCPFChange).toHaveBeenCalled();
  });

  it("shows 'Limpar Filtros' button when there are active filters", () => {
    setup({ filterName: "Maria" });
    expect(screen.getByRole("button", { name: "Limpar Filtros" })).toBeInTheDocument();
  });

  it("calls onClearFilters when 'Limpar Filtros' button is clicked", async () => {
    const { user, props } = setup({ filterName: "Maria" });
    const clearButton = screen.getByRole("button", { name: "Limpar Filtros" });
    await user.click(clearButton);
    expect(props.onClearFilters).toHaveBeenCalled();
  });

  it("does not show 'Limpar Filtros' button if no filters are active", () => {
    setup({ filterName: "", filterCPF: "" });
    const clearButton = screen.queryByRole("button", { name: "Limpar Filtros" });
    expect(clearButton).toBeNull();
  });
});
