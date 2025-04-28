import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useChannels } from "../../hooks/useChannels";

const SecondaryDraw = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.custom.secondaryDraw.width}px`,
        justifyContent: "flex-end",
        pr: 20,
        height: `calc(100vh - ${theme.custom.primaryAppBar.height}px )`,
        mt: `${theme.custom.primaryAppBar.height}px`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};
export default SecondaryDraw;
