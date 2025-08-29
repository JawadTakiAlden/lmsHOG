import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../constant";
import { CreateOutlined, ImageOutlined } from "@mui/icons-material";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import useCreateNews from "../../../../api/useCreateNews";
import { useTranslation } from "react-i18next";

const CreateNews = () => {
  const createNews = useCreateNews();
  const { t } = useTranslation();
  const handelCreate = (values) => {
    createNews.callFunction(values);
  };
  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
        }}
      >
        <Formik
          onSubmit={handelCreate}
          initialValues={{
            title: "",
            is_visible: false,
            position: 1,
          }}
          validationSchema={validationSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleReset,
            handleSubmit,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                    <InputLabel>
                      {t("news.create_news.labels.title")}
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      label={t("news.create_news.labels.title")}
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                    <InputLabel>
                      {t("news.create_news.labels.position")}
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      label={t("news.create_news.labels.position")}
                      name="position"
                      onChange={handleChange}
                      value={values.position}
                      error={touched.position && errors.position}
                      onBlur={handleBlur}
                    />
                    {touched.position && errors.position && (
                      <FormHelperText error>{errors.position}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    label={t("news.create_news.labels.is_visible")}
                    name="is_visible"
                    onChange={handleChange}
                    checked={values.is_visible}
                    control={<Checkbox />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ mb: 4 }}>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<ImageOutlined />}
                    >
                      {t("news.create_news.labels.image")}
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/png , image/jpg , image/jpeg"
                        onChangeCapture={(e) => {
                          setFieldValue("image", e.target.files[0]);
                        }}
                      />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <LoadingButton
                      color="success"
                      variant="contained"
                      size="large"
                      type="submit"
                      startIcon={<CreateOutlined />}
                      loading={createNews.isPending}
                    >
                      {t("news.create_news.labels.create_btn")}
                    </LoadingButton>
                    <Button
                      color="warning"
                      variant="outlined"
                      size="large"
                      onClick={handleReset}
                    >
                      {t("news.create_news.labels.reset_btn")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const validationSchema = yup.object({
  title: yup.string().nullable().max(255),
  position: yup.number().min(0).required("position is required"),
});

export default CreateNews;
