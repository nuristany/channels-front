// import { AppBar, Toolbar, Typography, Container, IconButton } from "@mui/material";
// import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";  // ✅ Correct Icon
// import { Outlet, Link } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div>
//       {/* ✅ Fixed position so it stays at the top */}
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           {/* ✅ Icon button with proper styling */}
//           <IconButton color="inherit">
//             <CatchingPokemonIcon />
//           </IconButton>

//           {/* ✅ Styled Link */}
//           <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//             <Typography variant="h6">Chat App</Typography>
//           </Link>
//         </Toolbar>
//       </AppBar>

//       {/* ✅ Adds top padding so content isn't hidden behind AppBar */}
//       <Container sx={{ mt: 10 }}>
//         <Outlet />
//       </Container>
//     </div>
//   );
// };

// export default Layout;


