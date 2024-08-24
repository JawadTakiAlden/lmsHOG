import {
  Box,
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
import { LoadingButton } from "@mui/lab";
import { SaveOutlined } from "@mui/icons-material";
import useUpdateCatgeory from "../../../../api/useUpdateCatgeory";
import { useTranslation } from "react-i18next";

const DetailsTab = ({ data }) => {
  const updateCatgeory = useUpdateCatgeory();
  const { t } = useTranslation();
  const handelUpdate = (values) => {
    updateCatgeory.callFunction(values);
  };

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            name: data.name,
            is_visible: data.is_visible,
          }}
          validationSchema={validationSchema}
          onSubmit={handelUpdate}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1} direction={"column"}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                    <InputLabel>
                      {t("categories.detail.DetailsTab.labels.name")}
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      label={t("categories.detail.DetailsTab.labels.name")}
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
                <Grid item xs={12}>
                  <FormControlLabel
                    label={t("categories.detail.DetailsTab.labels.is_visible")}
                    control={
                      <Checkbox
                        checked={values.is_visible}
                        name="is_visible"
                        onChange={handleChange}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    color="inherit"
                    variant="contained"
                    size="large"
                    type="submit"
                    startIcon={<SaveOutlined />}
                    loading={updateCatgeory.isPending}
                  >
                    {t("categories.detail.DetailsTab.labels.save_btn")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
});
export default DetailsTab;
