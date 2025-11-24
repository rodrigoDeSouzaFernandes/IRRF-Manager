import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";

import Header from "../../components/Header/Header";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import EmployeeFormModal from "../../components/EmployeeFormModal/EmployeeFormModal";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../features/employees/employeesSlice";
import { type Employee } from "../../types/Employee";
import type { EmployeeFormInput } from "../../components/EmployeeFormModal/types";

const Home: React.FC = () => {
  const [createEmployeeModalOpen, setCreateEmployeeModalOPen] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const handleAddEmployee = (data: EmployeeFormInput) => {
    const employee: Employee = {
      name: data.name,
      cpf: data.cpf,
      grossSalary: Number(data.grossSalary),
      descontoPrevidencia: Number(data.descontoPrevidencia),
      dependents: data.dependents,
    };

    dispatch(addEmployee(employee));
    setCreateEmployeeModalOPen(false);
  };

  return (
    <>
      <Box>
        <Header />
        <Container>
          <Button
            variant="contained"
            sx={{ width: "fit-content", ml: "auto", mt: 2 }}
            onClick={() => setCreateEmployeeModalOPen(true)}
          >
            <Add sx={{ width: 18, mr: 1 }} />
            Add new employee
          </Button>
          <EmployeeList />
        </Container>
      </Box>
      <EmployeeFormModal
        open={createEmployeeModalOpen}
        title="Add new employee"
        onClose={() => setCreateEmployeeModalOPen(false)}
        onSubmit={handleAddEmployee}
      />
    </>
  );
};

export default Home;
