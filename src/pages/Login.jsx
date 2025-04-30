import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useAuth from "../context/useAuth";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Button
} from "@mui/material";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { Checkbox } from "@mui/material";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const success = await loginUser(values.email, values.password);
      setSubmitting(false);
      if (success) {
        navigate("/");
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutLinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            name="email"
            placeholder="Email"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            name="password"
            placeholder="Password"
            fullWidth
            type="password"
            sx={{ mb: 2 }}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          disabled={formik.isSubmitting}
          >
          Sign In
        </Button>
          </Box>
      </Paper>
    </Container>
  );
};

export default Login;

// <form onSubmit={formik.handleSubmit}>
//   <h2>Login</h2>
//   <input
//     type="email"
//     name="email"
//     placeholder="Email"
//     value={formik.values.email}
//     onChange={formik.handleChange}
//   />
//   <input
//     type="password"
//     name="password"
//     placeholder="Password"
//     value={formik.values.password}
//     onChange={formik.handleChange}
//   />
//   {formik.errors.password && <div>{formik.errors.password}</div>}
//   <button type="submit" disabled={formik.isSubmitting}>
//     Login
//   </button>
// </form>
