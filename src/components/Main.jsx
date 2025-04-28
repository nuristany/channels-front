import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const Main = ({children}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: `${theme.custom.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.custom.primaryAppBar.height}px)`,
        pt: 0,
        overflow: "auto",
      }}
    >
      <Box>
      {children}
      </Box>
    </Box>
  );
};

export default Main;
