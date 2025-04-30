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
import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
 const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post(
          "https://channels-backend-production.up.railway.app/auth/users/",
          {
            email: values.email,
            password: values.password,
          }
        ),
          navigate("/login");
      } catch (error) {
        setErrors({
          email: "Registration failed",
        });
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
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            placeholder="Email"
            fullWidth
            autoFocus
            sx={{ mb: 1 }}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
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
