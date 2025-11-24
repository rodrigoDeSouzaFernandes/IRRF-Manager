import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../contexts/ThemeContext";

const Header: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar position="static" elevation={2} sx={{br:0}}>
      <Container>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gerenciador de Funcionários
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={toggleMode}
              aria-label="toggle dark mode"
              sx={{ ml: 2 }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
