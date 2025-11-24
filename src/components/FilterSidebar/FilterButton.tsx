import React from "react";
import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export const FilterButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      startIcon={<FilterListIcon />}
      onClick={onClick}
      sx={{ mb: 2 }}
    >
      Filtrar
    </Button>
  );
};
