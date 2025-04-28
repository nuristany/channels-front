import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./theme/theme"; // Import the theme
import ProtectedRoute from "./context/ProtectedRoute";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import PrimaryAppBar from "./pages/PrimaryAppBar";
import SecondaryDraw from "./pages/templates/SecondaryDraw";
import ExploreCategoryList from "./components/ExplorCategoryList";

import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PrimaryAppBar />
        <Routes>
          <Route
            path="/"
            element={

                <Home />
      
            }
          />
          <Route path="/category/:categoryId" element={<Home />} />
          <Route path="/channel/:channelId/chat" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


// src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme/theme';
// import ProtectedRoute from './context/ProtectedRoute';
// import Chat from './pages/Chat';
// import Home from './pages/Home';
// import PrimaryAppBar from './pages/PrimaryAppBar';
// import SecondaryDraw from './pages/templates/SecondaryDraw';
// import ExploreCategoryList from './components/ExplorCategoryList';
// import Login from './pages/Login';
// import './App.css';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <PrimaryAppBar />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/category/:categoryId" element={<Home />} />
//             <Route path="/channel/:channelId/chat" element={<Home />} />
//           </Route>
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
