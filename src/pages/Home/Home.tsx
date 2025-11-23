import React from "react";
import { Box } from "@mui/material";

import Header from "../../components/Header/Header";

const Home: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
    </Box>
  );
};

export default Home;
