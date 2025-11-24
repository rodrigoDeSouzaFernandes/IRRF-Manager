import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEmployeeFormModal } from "../useEmployeeFormModal";
import type { Employee } from "../../../types/Employee";
import { formatCurrency } from "../../../utils/format";
import type { EmployeeFormInput } from "../types";
import type { ChangeEvent } from "react";

const createEmployee = (): Employee => ({
  name: "João Silva",
  cpf: "12345678901",
  grossSalary: 5000,
  descontoPrevidencia: 500,
  dependents: 2,
});

const createFormData = (): EmployeeFormInput => ({
  name: "Maria Santos",
  cpf: "987.654.321-00",
  grossSalary: formatCurrency(3000).replace("R$", "").trim(),
  descontoPrevidencia: formatCurrency(300).replace("R$", "").trim(),
  dependents: "1",
});

describe("useEmployeeFormModal (hook)", () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  const renderUseEmployeeFormModal = (employee?: Employee) =>
    renderHook((props) => useEmployeeFormModal(props), {
      initialProps: { onClose, onSubmit, employee: employee as Employee },
    });

  it("prefills form fields when employee is provided", () => {
    const employee = createEmployee();
    const { result } = renderUseEmployeeFormModal(employee);

    expect(result.current.watch("name")).toBe(employee.name);
    expect(result.current.watch("cpf")).toBe("123.456.789-01");
    expect(result.current.watch("dependents")).toBe(employee.dependents.toString());
  });

  it("formats CPF input on change", () => {
    const { result } = renderUseEmployeeFormModal();

    act(() => {
      result.current.handleCPFChange({
        target: { value: "12345678901" },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.watch("cpf")).toBe("123.456.789-01");
  });

  it("submits normalized data", () => {
    const { result } = renderUseEmployeeFormModal();
    const formData = createFormData();

    act(() => {
      result.current.handleFormSubmit(formData);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      ...formData,
      cpf: "98765432100",
      grossSalary: 3000,
      descontoPrevidencia: 300,
      dependents: 1,
    });
  });

  it("resets form and calls onClose when handleClose is invoked", () => {
    const { result } = renderUseEmployeeFormModal();

    act(() => {
      result.current.setValue("name", "Temporary");
      result.current.handleClose();
    });

    expect(result.current.watch("name")).toBe("");
    expect(onClose).toHaveBeenCalled();
  });
});
