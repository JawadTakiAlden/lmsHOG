import React, { useState } from "react";
import {
  FormControl,
  Box,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginRequest from "../../../api/LoginRequest";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const naviaget = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {t} = useTranslation()

  const loginMutation = useMutation({
    mutationFn: LoginRequest,
    mutationKey: ["login-admin"],
    onSuccess: (data) => {
      const message = data?.data?.message;
      const token = data?.data?.data?.token;
      const user = data?.data?.data?.user;
      localStorage.setItem("token_admin_house_of_geniuses", token);
      localStorage.setItem(
        "profile_admin_house_of_geniuses",
        JSON.stringify(user)
      );
      enqueueSnackbar(message, { variant: "success" });
      naviaget("/dashboard/default");
    },
    onError: (error) => {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
        }}
      >
        <Formik
          initialValues={{
            phone: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            phone: Yup.string().required("Phone is required"),
            password: Yup.string().min(4).required("password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            handleChange, handleSubmit, handleBlur, values, errors, touched, isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>{t('login_page.login_form.input_labels.phone')}</InputLabel>
                <OutlinedInput
                  type="text"
                  label={t('login_page.login_form.input_labels.phone')}
                  name="phone"
                  autoFocus
                  onChange={handleChange}
                  value={values.phone}
                  error={touched.phone && errors.phone}
                  onBlur={handleBlur} />
                {touched.phone && errors.phone && (
                  <FormHelperText error>{errors.phone}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
                <InputLabel>{t('login_page.login_form.input_labels.password')}</InputLabel>
                <OutlinedInput
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  name="password"
                  endAdornment={<InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>}
                  label={t('login_page.login_form.input_labels.password')} />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                color="primary"
                type='submit'
                fullWidth
                loading={loginMutation.isPending}
                loadingPosition="start"
                startIcon={<Login />}
                variant="contained"
              >
                <span>{t('login_page.login_form.sign_in_btn')}</span>
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}


export default LoginForm;
