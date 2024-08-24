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
import { gridSpacing } from "../../../../constant";
import useGetCategories from "../../../../api/useGetCategories";
import useGetTeachers from "../../../../api/useGetTeachers";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined, ImageOutlined } from "@mui/icons-material";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import useCreateCourse from "../../../../api/useCreateCourse";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const CreateCourse = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const categories = useGetCategories();
  const teachers = useGetTeachers();
  const createCourse = useCreateCourse();
  const { t } = useTranslation();
  const handelCreateCourse = (values) => {
    let teachers = values.teachers.map((teacher) => teacher.id);
    let categories = values.categories.map((category) => category.id);
    createCourse.callFuntion({ ...values, teachers, categories });
  };
  return (
    <Box>
      <Formik
        onSubmit={handelCreateCourse}
        initialValues={{
          name: "",
          image: "",
          is_visible: true,
          is_open: false,
          telegram_channel_link: "",
          teachers: [],
          categories: [],
          values: [],
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
          image: yup
            .mixed()
            .test("fileRequired", "Image is required", (value) => {
              return !!value;
            }),
        })}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("courses.create_course.labels.name")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("courses.create_course.labels.name")}
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
                    {t("courses.create_course.labels.telegram_channel_link")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t(
                      "courses.create_course.labels.telegram_channel_link"
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
                      label={t("courses.create_course.labels.categories")}
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
                      label={t("courses.create_course.labels.teachers")}
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
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  options={values.values}
                  value={values.values}
                  onChange={(e, v) => {
                    setFieldValue("values", v);
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("courses.create_course.labels.values_learned")}
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<ImageOutlined />}
                >
                  {t("courses.create_course.labels.image_upload")}
                  <VisuallyHiddenInput
                    onBlur={handleBlur}
                    name="image"
                    accept="image/jpg,image/png,image/jpeg"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                    type="file"
                  />
                </Button>
                {touched.image && errors.image && (
                  <FormHelperText error>{errors.image}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="is_visible"
                      value={values.is_visible}
                      defaultChecked={values.is_visible}
                      onChange={handleChange}
                    />
                  }
                  label={t("courses.create_course.labels.is_visible")}
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="is_open"
                      value={values.is_open}
                      defaultChecked={values.is_open}
                      onChange={handleChange}
                    />
                  }
                  label={t("courses.create_course.labels.is_open")}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                my: 1,
                py: 1,
                gap: "10px",
              }}
            >
              <LoadingButton
                variant="contained"
                color="primary"
                startIcon={<CreateOutlined />}
                type="submit"
                loading={createCourse.isPending}
              >
                {t("courses.create_course.labels.create_btn")}
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCourse;
