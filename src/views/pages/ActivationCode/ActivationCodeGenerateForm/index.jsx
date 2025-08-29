import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../constant";
import useGetCourses from "../../../../api/useGetCourses";
import { LoadingButton } from "@mui/lab";
import { NoteAddOutlined } from "@mui/icons-material";
import useGenerateActivationCode from "../../../../api/useGenerateActivationCode";
import { useTranslation } from "react-i18next";

const ActivationCodeGenerateForm = () => {
  const courses = useGetCourses();
  const [sharedOpen, setSharedOpen] = useState(false);
  const { t } = useTranslation();
  const generateCodes = useGenerateActivationCode();
  const handelGenerate = (values) => {
    let data = {
      ...values,
    };
    if (values.type === "shared") {
      data.courses = data.courses.map((course) => course.id);
    }
    generateCodes.callFuntion(data);
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        backgroundColor: "#fff",
        p: 3,
      }}
    >
      <Formik
        onSubmit={handelGenerate}
        initialValues={{
          type: "single",
          quantity: 1,
          number_of_courses: 1,
          courses: [],
          title: "",
        }}
        validationSchema={validationSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleReset,
          handleSubmit,
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
                    {t("activation_codes.generate.labels.type")}
                  </InputLabel>
                  <Select
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.type}
                    error={touched.type && errors.type}
                    label={t("activation_codes.generate.labels.type")}
                  >
                    <MenuItem value={"single"}>
                      {t(
                        "activation_codes.generate.labels.type_options.single"
                      )}
                    </MenuItem>
                    <MenuItem value={"shared"}>
                      {t(
                        "activation_codes.generate.labels.type_options.shared"
                      )}
                    </MenuItem>
                    <MenuItem value={"shared_selected"}>
                      {t(
                        "activation_codes.generate.labels.type_options.shared_selected"
                      )}
                    </MenuItem>
                    <MenuItem value={"gift"}>
                      {t("activation_codes.generate.labels.type_options.gift")}
                    </MenuItem>
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("activation_codes.generate.labels.quantity")}
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    label={t("activation_codes.generate.labels.quantity")}
                    name="quantity"
                    onChange={handleChange}
                    value={values.quantity}
                    error={touched.quantity && errors.quantity}
                    onBlur={handleBlur}
                    inputProps={{
                      min: 1,
                      max: 200,
                    }}
                  />
                  {touched.quantity && errors.quantity && (
                    <FormHelperText error>{errors.quantity}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("activation_codes.generate.labels.title")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("activation_codes.generate.labels.title")}
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
              {values.type === "shared_selected" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      {t("activation_codes.generate.labels.num_of_courses")}
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      label={t(
                        "activation_codes.generate.labels.num_of_courses"
                      )}
                      name="number_of_courses"
                      onChange={handleChange}
                      fullWidth
                      value={values.number_of_courses}
                      error={
                        touched.number_of_courses && errors.number_of_courses
                      }
                      onBlur={handleBlur}
                      inputProps={{
                        max: 200,
                      }}
                    />
                    {touched.number_of_courses && errors.number_of_courses && (
                      <FormHelperText error>
                        {errors.number_of_courses}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : undefined}
              {values.type === "single" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>
                      {t("activation_codes.generate.labels.courses")}
                    </InputLabel>
                    <Select
                      fullWidth
                      value={values.courses}
                      name="courses"
                      onChange={(event) => {
                        setFieldValue("courses", [event.target.value]);
                      }}
                      input={
                        <OutlinedInput
                          label={t("activation_codes.generate.labels.courses")}
                        />
                      }
                    >
                      {courses.isLoading ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress color="primary" />
                        </Box>
                      ) : courses.isError ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button color="warning" variant="outlined">
                            {t("activation_codes.generate.labels.refetch_btn")}
                          </Button>
                        </Box>
                      ) : courses?.data?.data?.data.length === 0 ? (
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary={t(
                            "activation_codes.generate.labels.no_courses_text"
                          )}
                        />
                      ) : (
                        courses?.data?.data?.data.map((course) => {
                          return (
                            <MenuItem key={course.id} value={course.id}>
                              <ListItemText primary={course.name} />
                            </MenuItem>
                          );
                        })
                      )}
                      {}
                    </Select>
                    {touched.courses && errors.courses && (
                      <FormHelperText error>{errors.courses}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : undefined}
              {values.type === "shared" ? (
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    open={sharedOpen}
                    onOpen={() => {
                      setSharedOpen(true);
                    }}
                    onClose={() => {
                      setSharedOpen(false);
                    }}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    id="courses"
                    name={"courses"}
                    onBlur={handleBlur}
                    getOptionLabel={(option) => option.name}
                    options={courses?.data?.data?.data || []}
                    loading={courses.isLoading}
                    value={values.courses}
                    onChange={(e, v) => {
                      setFieldValue("courses", v);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("activation_codes.generate.labels.courses")}
                        name="courses"
                        onBlur={handleBlur}
                        error={touched.courses && errors.courses}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {courses.isLoading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              ) : undefined}
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
                    startIcon={<NoteAddOutlined />}
                    loading={generateCodes.isPending}
                  >
                    {t("activation_codes.generate.labels.create_btn")}
                  </LoadingButton>
                  <Button
                    color="warning"
                    variant="outlined"
                    size="large"
                    onClick={handleReset}
                  >
                    {t("activation_codes.generate.labels.reset_btn")}
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
  type: yup.string(),
  title: yup.string().nullable().max(255),
  quantity: yup
    .number()
    .min(1)
    .max(200)
    .required("number of codes you are want to generate is rquried"),
});

export default ActivationCodeGenerateForm;
