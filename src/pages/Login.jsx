import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useAuth from "../context/useAuth";

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
    <form onSubmit={formik.handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && <div>{formik.errors.password}</div>}
      <button type="submit" disabled={formik.isSubmitting}>
        Login
      </button>
    </form>
  );
};

export default Login;

