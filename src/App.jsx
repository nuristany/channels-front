import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import ProtectedRoute from "./context/ProtectedRoute";
import Home from "./pages/Home";
import PrimaryAppBar from "./pages/PrimaryAppBar";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PrimaryAppBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Home />} />
            <Route path="/channel/:channelId/chat" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

