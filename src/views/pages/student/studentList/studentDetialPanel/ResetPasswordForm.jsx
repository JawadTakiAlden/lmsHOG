import {
  PasswordOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useResetPassword from "../../../../../api/useResetPassword";

const ResetPasswordForm = ({ userID }) => {
  const { t } = useTranslation();
  const resetPassword = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelSubmit = (values) => {
    resetPassword.callFunction({ ...values, user: userID });
  };
  return (
    <Box
      sx={{
        my: 2,
        p: 2,
      }}
    >
      <Formik
        onSubmit={handelSubmit}
        initialValues={{
          new_password: "",
        }}
        validationSchema={yup.object({
          new_password: yup
            .string()
            .min(6)
            .max(26)
            .required("new password is required"),
        })}
      >
        {({
          handleSubmit,
          values,
          initialValues,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <FormControl fullWidth sx={{ maxWidth: "500px", mb: 2 }}>
                <InputLabel>
                  {t(
                    "students.student_list.student_detail.reset_password_form.password"
                  )}
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  label={t(
                    "students.student_list.student_detail.reset_password_form.password"
                  )}
                  name="new_password"
                  onChange={handleChange}
                  value={values.new_password}
                  error={touched.new_password && errors.new_password}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.new_password && errors.new_password && (
                  <FormHelperText error>{errors.new_password}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <LoadingButton
              color="primary"
              type="submit"
              disabled={initialValues.new_password === values.new_password}
              loading={resetPassword.isPending}
              loadingPosition="start"
              startIcon={<PasswordOutlined />}
              variant="contained"
            >
              <span>
                {t(
                  "students.student_list.student_detail.reset_password_form.reset_password_btn"
                )}
              </span>
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPasswordForm;
