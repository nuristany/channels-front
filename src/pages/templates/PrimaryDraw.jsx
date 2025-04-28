import {
  Box,
  Typography,
  useMediaQuery,
  styled,
  CircularProgress,
} from "@mui/material";
import {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { useTheme } from "@mui/material/styles";
import DrawerToggle from "../../components/DrawToggle";
import MuiDrawer from "@mui/material/Drawer";
import { useChannels } from "../../hooks/useChannels";
import { useCategories } from "../../hooks/useCategories";

const openedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  width: theme.custom.primaryDraw.closed,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: theme.custom.primaryDraw.width,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const PrimaryDraw = ({ children }) => {
  const { data: channels, isLoading, error } = useChannels();
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");
  const [open, setOpen] = useState(!below600);

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const toggleDrawer = () => setOpen((prev) => !prev);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error fetching categories. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.custom.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.custom.primaryAppBar.height}px)`,
          display: "flex",
          flexDirection: "column", // Stack toggle button and categories
        },
      }}
    >
      {/* Drawer Toggle and Content */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 1,
          borderBottom: "1px solid #ccc", // Separates header from list
        }}
      >
        {open && <Box sx={{ fontWeight: "bold", ml: 1 }}>Popular Channels</Box>}
        <DrawerToggle open={open} toggleDrawer={toggleDrawer} />
      </Box>
      {/* Children (i.e. PopularChannels Component) */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
        {Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child, { open }) : child
        )}
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
