import React from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

function DrawToggle({ open, toggleDrawer }) {
  return (
    <Box
      sx={{
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeft
          sx={{
            transform: open ? "rotate(0deg)" : "rotate(180deg)", // Rotate icon when collapsed
            transition: "transform 0.3s ease",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default DrawToggle;
