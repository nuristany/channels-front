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
  Button,
  Grid,
  Link,
} from "@mui/material";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { Checkbox } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid item>
            <Link
              component={RouterLink}
              to="/forgot"
              sx={{ listStyle: "none", textDecoration: "none" }}
            >
              Forgot Password
            </Link>
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to="/register"
              sx={{ listStyle: "none", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
