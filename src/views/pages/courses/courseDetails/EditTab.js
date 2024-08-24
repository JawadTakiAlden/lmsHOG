import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../constant";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import { CreateOutlined, ImageOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useGetCategories from "../../../../api/useGetCategories";
import useGetTeachers from "../../../../api/useGetTeachers";
import useUpdateCourse from "../../../../api/useUpdateCourse";
import { useTranslation } from "react-i18next";

const EditTab = ({ data }) => {
  const categories = useGetCategories();
  const teachers = useGetTeachers();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const updateCourse = useUpdateCourse();
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const updateHandler = (values) => {
    let teachers = values.teachers.map((teacher) => teacher.id);
    let categories = values.categories.map((category) => category.id);
    updateCourse.callFunction({ ...values, teachers, categories });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              overflow: "hidden",
              borderRadius: "50%",
              mb: 2,
              boxShadow: "0px 2px 10px #ccc",
            }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="profile"
              width={"200px"}
              style={{ height: "100%" }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              overflow: "hidden",
              borderRadius: "50%",
              mb: 2,
              boxShadow: "0px 2px 10px #ccc",
            }}
          >
            <img
              src={data.image}
              alt="profile"
              width={"200px"}
              style={{ height: "100%" }}
            />
          </Box>
        )}
      </Box>
      <Formik
        onSubmit={updateHandler}
        initialValues={{
          name: data.name,
          is_visible: data.is_visible,
          is_open: data.is_open,
          telegram_channel_link: data.telegram_channel_link,
          teachers: data.teachers,
          categories: data.categories,
        }}
        validationSchema={yup.object({
          name: yup.string().max(255).required("name is required"),
          telegram_channel_link: yup
            .string()
            .required("telegram channel link is required"),
          teachers: yup
            .array()
            .min(1)
            .required("at least you should select one teacher"),
          categories: yup
            .array()
            .min(1)
            .required("at least you should select one category"),
        })}
      >
        {({
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("courses.detaisl.edit_tab.labels.name")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("courses.detaisl.edit_tab.labels.name")}
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
                <FormControl fullWidth>
                  <InputLabel>
                    {t("courses.detaisl.edit_tab.labels.telegram_channel_link")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t(
                      "courses.detaisl.edit_tab.labels.telegram_channel_link"
                    )}
                    name="telegram_channel_link"
                    onChange={handleChange}
                    value={values.telegram_channel_link}
                    error={
                      touched.telegram_channel_link &&
                      errors.telegram_channel_link
                    }
                    onBlur={handleBlur}
                  />
                  {touched.telegram_channel_link &&
                    errors.telegram_channel_link && (
                      <FormHelperText error>
                        {errors.telegram_channel_link}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  open={categoriesOpen}
                  onOpen={() => {
                    setCategoriesOpen(true);
                  }}
                  onClose={() => {
                    setCategoriesOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => option.name}
                  options={categories?.data?.data?.data || []}
                  loading={categories.isLoading}
                  disableCloseOnSelect
                  id="categories"
                  name={"categories"}
                  onBlur={handleBlur}
                  value={values.categories}
                  onChange={(e, v) => {
                    setFieldValue("categories", v);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("courses.detaisl.edit_tab.labels.categories")}
                      name="categories"
                      onBlur={handleBlur}
                      error={touched.categories && errors.categories}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {categories.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {touched.categories && errors.categories && (
                  <FormHelperText error>{errors.categories}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  open={teachersOpen}
                  onOpen={() => {
                    setTeachersOpen(true);
                  }}
                  onClose={() => {
                    setTeachersOpen(false);
                  }}
                  disableCloseOnSelect
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  id="teachers"
                  name={"teachers"}
                  onBlur={handleBlur}
                  getOptionLabel={(option) => option.full_name}
                  options={teachers?.data?.data?.data || []}
                  loading={teachers.isLoading}
                  value={values.teachers}
                  onChange={(e, v) => {
                    setFieldValue("teachers", v);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("courses.detaisl.edit_tab.labels.teachers")}
                      name="teachers"
                      onBlur={handleBlur}
                      error={touched.teachers && errors.teachers}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {teachers.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {touched.teachers && errors.teachers && (
                  <FormHelperText error>{errors.teachers}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked={values.is_visible} />}
                  label={t("courses.detaisl.edit_tab.labels.is_visible")}
                  name="is_visible"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Switch defaultChecked={values.is_open} />}
                  label={t("courses.detaisl.edit_tab.labels.is_open")}
                  name="is_open"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ mb: 4 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<ImageOutlined />}
                  >
                    {t("courses.detaisl.edit_tab.labels.image")}
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png , image/jpg , image/jpeg"
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
                        setImage(e.target.files[0]);
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
                    justifyContent: "flex-end",
                    py: 2,
                  }}
                >
                  <LoadingButton
                    size="large"
                    color="success"
                    type="submit"
                    loadingPosition="start"
                    loading={updateCourse.isPending}
                    startIcon={<CreateOutlined />}
                    variant="contained"
                  >
                    <span>{t("courses.detaisl.edit_tab.labels.save_btn")}</span>
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditTab;
