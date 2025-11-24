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
import EmployeeList from "../EmployeeList";
import { useEmployeeList } from "../useEmployeeList";
import type { Employee } from "../../../types/Employee";

vi.mock("../useEmployeeList", () => ({
  useEmployeeList: vi.fn(),
}));

const mockedUseEmployeeList = useEmployeeList as MockedFunction<
  typeof useEmployeeList
>;

const mockEmployees: Employee[] = [
  {
    name: "João Silva",
    cpf: "12345678901",
    grossSalary: 5000,
    descontoPrevidencia: 500,
    dependents: 2,
    baseSalary: 4000,
    IRRFdiscount: 100,
  },
  {
    name: "Maria Santos",
    cpf: "98765432100",
    grossSalary: 3000,
    descontoPrevidencia: 300,
    dependents: 1,
    baseSalary: 2500,
    IRRFdiscount: 50,
  },
];

const createHookState = (
  overrides: Partial<ReturnType<typeof useEmployeeList>> = {}
) => ({
  filteredEmployees: mockEmployees,
  handleEdit: vi.fn(),
  handleDelete: vi.fn(),
  handleEditSubmit: vi.fn(),
  handleEditClose: vi.fn(),
  handleDeleteClose: vi.fn(),
  handleDeleteConfirm: vi.fn(),
  handleClearFilters: vi.fn(),
  filterSidebarOpen: false,
  setFilterSidebarOpen: vi.fn(),
  filterName: "",
  filterCPF: "",
  setFilterName: vi.fn(),
  setFilterCPF: vi.fn(),
  selectedEmployee: mockEmployees[0],
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  ...overrides,
});

const renderComponent = (
  overrides: Partial<ReturnType<typeof useEmployeeList>> = {}
) => {
  const hookValue = createHookState(overrides);
  mockedUseEmployeeList.mockReturnValue(hookValue);
  const user = userEvent.setup();
  render(<EmployeeList />);
  return { hookValue, user };
};

describe("EmployeeList (component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders employees returned by the hook", () => {
    renderComponent();

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("shows empty state when the hook returns no employees", () => {
    renderComponent({ filteredEmployees: [], selectedEmployee: null });

    expect(
      screen.getByText(/Nenhum funcionário encontrado/i)
    ).toBeInTheDocument();
  });

  it("calls handleEdit when edit button is clicked", async () => {
    const { hookValue, user } = renderComponent();

    const editButtons = screen.getAllByLabelText("editar");
    await user.click(editButtons[0]);

    expect(hookValue.handleEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it("calls handleDelete when delete button is clicked", async () => {
    const { hookValue, user } = renderComponent();

    const deleteButtons = screen.getAllByLabelText("excluir");
    await user.click(deleteButtons[0]);

    expect(hookValue.handleDelete).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it("triggers setFilterSidebarOpen when filter button is clicked", async () => {
    const { hookValue, user } = renderComponent();

    const filterButton = screen.getByText("Filtrar");
    await user.click(filterButton);

    expect(hookValue.setFilterSidebarOpen).toHaveBeenCalledWith(true);
  });

  it("renders edit modal when hook reports it open", () => {
    renderComponent({ isEditModalOpen: true });

    expect(screen.getByText("Editar funcionário")).toBeInTheDocument();
  });

  it("renders delete modal when hook reports it open", () => {
    renderComponent({ isDeleteModalOpen: true });

    expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
  });
});

