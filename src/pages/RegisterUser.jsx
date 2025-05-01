import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/api";

const RegisterUser = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: ""
        },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post(`${API_URL}/auth/users/`, {
          email: values.email,
          password: values.password,
        });
        navigate("/login");
      } catch (error) {
        setErrors({ email: "Registration failed" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={5} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <PersonAddIcon />
        </Avatar>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="email"
            placeholder="Email"
            fullWidth
            autoFocus
            sx={{ mb: 1 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            name="First Name"
            placeholder="Email"
            fullWidth
            autoFocus
            sx={{ mb: 1 }}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            name="Last Name"
            placeholder="Email"
            fullWidth
            autoFocus
            sx={{ mb: 1 }}
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default RegisterUser;

