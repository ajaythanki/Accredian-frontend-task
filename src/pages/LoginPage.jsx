import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import { useLoginMutation } from "../redux/features/auth/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../redux/features/auth/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, mutateAsync, data } = useLoginMutation();
  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter email",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter password",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: value.length > 0 ? false : true,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);

    if (formValues.email.value.trim() && formValues.password.value.trim()) {
      mutateAsync({
        email: formValues.email.value.trim(),
        password: formValues.password.value.trim(),
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(setUser(data.user));
      window.localStorage.setItem("authUser", JSON.stringify(data.user));
    }
  }, [isSuccess, data]);

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            variant="outlined"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={handleChange}
            error={formValues.email.error}
            value={formValues.email.value}
            helperText={
              formValues.email.error ? formValues.email.errorMessage : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={formValues.password.error}
            value={formValues.password.value}
            helperText={
              formValues.password.error ? formValues.password.errorMessage : ""
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginPage;