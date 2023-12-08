import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useSignupMutation,
  useVerifyUserMutation,
} from "../redux/features/auth/hooks/useAuth";

export default function SignUpPage() {
  const [formValues, setFormValues] = useState({
    firstName: {
      value: "",
      error: false,
      errorMessage: "You must enter first name",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "You must enter last name",
    },
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
    otp: {
      value: "",
      error: false,
      errorMessage: "You must enter OTP",
    },
  });
  const navigate = useNavigate();

  const {
    mutateAsync: verifyMutation,
    isSuccess: isVerifySuccess,
    // data: signUpData,
  } = useVerifyUserMutation();
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formValues.otp.value.length !== 4)
      return toast.error("Invalid OTP", { id: "userverification" });
    verifyMutation({ verificationCode: formValues.otp.value });
  };
  const {
    mutateAsync: signupMutation,
    isSuccess: isSignupSuccess,
    isPending: isSignupPending,
    // data:signupData
  } = useSignupMutation();

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
    if (
      formValues.email.value.trim() &&
      formValues.password.value.trim() &&
      formValues.firstName.value.trim() &&
      formValues.lastName.value.trim()
    ) {
      signupMutation({
        username: formValues.firstName.value + " " + formValues.lastName.value,
        email: formValues.email.value.trim(),
        password: formValues.password.value.trim(),
      });
    }
  };

  if (isVerifySuccess) {
    navigate("/");
  }
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          display={!isSignupSuccess}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                disabled={isSignupPending}
                onChange={handleChange}
                error={formValues.firstName.error}
                value={formValues.firstName.value}
                helperText={
                  formValues.firstName.error
                    ? formValues.firstName.errorMessage
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                disabled={isSignupPending}
                onChange={handleChange}
                error={formValues.lastName.error}
                value={formValues.lastName.value}
                helperText={
                  formValues.lastName.error
                    ? formValues.lastName.errorMessage
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={isSignupPending}
                onChange={handleChange}
                error={formValues.email.error}
                value={formValues.email.value}
                helperText={
                  formValues.email.error ? formValues.email.errorMessage : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                disabled={isSignupPending}
                onChange={handleChange}
                error={formValues.password.error}
                value={formValues.password.value}
                helperText={
                  formValues.password.error
                    ? formValues.password.errorMessage
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login" variant="body2">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {isSignupSuccess && (
            <Box
              component="form"
              noValidate
              onSubmit={handleVerifyOTP}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="otp"
                    label="OTP"
                    type="password"
                    id="otp"
                    autoComplete="new-otp"
                    disabled={!isSignupSuccess}
                    onChange={handleChange}
                    error={formValues.otp.error}
                    value={formValues.otp.value}
                    helperText={
                      formValues.otp.error ? formValues.otp.errorMessage : ""
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Verify
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}