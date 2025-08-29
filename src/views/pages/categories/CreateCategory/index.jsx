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
import React from "react";
import { gridSpacing } from "../../../../constant";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined, Restore } from "@mui/icons-material";
import useCreateCategory from "../../../../api/useCreateCategory";
import { useTranslation } from "react-i18next";

const CreateCategory = () => {
  const createCategory = useCreateCategory();
  const { t } = useTranslation();
  const handleCreate = (values) => {
    createCategory.callFuntion(values);
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
      <Formik
        initialValues={{
          name: "",
          is_visible: true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreate}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                  <InputLabel>
                    {t("categories.create_category.labels.name")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("categories.create_category.labels.name")}
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    error={touched.name && errors.name}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  label={t("categories.create_category.labels.is_visible")}
                  name="is_visible"
                  onChange={handleChange}
                  value={values.is_visible}
                  checked={values.is_visible}
                  control={<Checkbox />}
                />
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
                    loading={createCategory.isPending}
                  >
                    {t("categories.create_category.labels.create_btn")}
                  </LoadingButton>
                  <Button
                    color="warning"
                    startIcon={<Restore />}
                    variant="outlined"
                    size="large"
                    onClick={handleReset}
                  >
                    {t("categories.create_category.labels.reset_btn")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object({
  name: yup.string().max(255).required("category name is required"),
});
export default CreateCategory;
