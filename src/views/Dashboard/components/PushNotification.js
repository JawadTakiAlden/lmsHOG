import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import usePushNotification from "../../../api/usePushNotification";
import { NotificationAddOutlined } from "@mui/icons-material";

const PushNotification = () => {
    const {t} = useTranslation()
    const notification = usePushNotification()
  const NotifyHandler = (values) => {
    notification.callFunction(values);
  };
  return (
    <Box
      sx={{
        mt: 2,
        p: { xs: 2, sm: 3, md: 4, lg: 5 },
        borderRadius: "12px",
        boxShadow: "1px 1px 10px -6px rgba(0,0,0,0.4)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Notification
      </Typography>
      <Typography
        sx={{
            textTransform : 'capitalize',
            mb : 2
        }}
      >
        get touch with your user by push new notification for them
      </Typography>
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        validationSchema={yup.object({
          title: yup.string().required("Title of Notification is required"),
          body: yup.string().required("body of Notification is required"),
        })}
        onSubmit={NotifyHandler}
      >
        {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            handleReset,
            touched
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>
                {t("dashboard.notification.labels.title")}
              </InputLabel>
              <OutlinedInput
                type="text"
                label={t("dashboard.notification.labels.title")}
                name="title"
                onChange={handleChange}
                value={values.title}
                error={touched.title && errors.title}
                onBlur={handleBlur}
              />
              {touched.title && errors.title && (
                <FormHelperText error>{errors.title}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>
                {t("dashboard.notification.labels.body")}
              </InputLabel>
              <OutlinedInput
                type="text"
                label={t("dashboard.notification.labels.body")}
                name="body"
                onChange={handleChange}
                value={values.body}
                error={touched.body && errors.body}
                onBlur={handleBlur}
              />
              {touched.body && errors.body && (
                <FormHelperText error>{errors.body}</FormHelperText>
              )}
            </FormControl>
            <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center',
                    gap : '10px'
                }}
            >
                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                    loading={notification.isPending}
                    startIcon={<NotificationAddOutlined />}
                >
                    Push
                </LoadingButton>
                <Button
                    size="large"
                    variant="outlined"
                    color="warning"
                    onClick={handleReset}
                >
                    reset
                </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PushNotification;
