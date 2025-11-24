import React from "react";
import { Box } from "@mui/material";

import Header from "../../components/Header/Header";
import EmployeeList from "../../components/EmployeeList/EmployeeList";

const Home: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <EmployeeList />
    </Box>
  );
};

export default Home;
