import {
  Autocomplete,
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { gridSpacing } from "../../../../../constant";
import { Formik } from "formik";
import * as yup from "yup";
import useGetVisibleCourses from "../../../../../api/useGetVisibleCourses";
import useCreateEnroll from "../../../../../api/useCreateEnroll";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useGetAllAccounts from "../../../../../api/useGetAllAccounts";

const EnrollForm = () => {
  const studentsList = useGetAllAccounts();
  const courses = useGetVisibleCourses();
  const { t } = useTranslation();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const createEnroll = useCreateEnroll();
  const handelSubmit = (values) => {
    createEnroll.callFuntion(values);
  };
  return (
    <Box
      sx={{
        p: 2,
        mt: 3,
      }}
    >
      <Formik
        onSubmit={handelSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleBlur, touched, errors, setFieldValue , values}) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  open={studentsOpen}
                  onOpen={() => {
                    setStudentsOpen(true);
                  }}
                  onClose={() => {
                    setStudentsOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option.phone === value.phone
                  }}
                  getOptionLabel={(option) => option.phone}
                  options={studentsList?.data?.data?.data || []}
                  loading={studentsList.isLoading}
                  freeSolo
                  name={"student_id"}
                  onBlur={handleBlur}
                  onChange={(e, v) => {
                    setFieldValue("student_id", v?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "students.new_enroll.new_enroll_form.labels.student"
                      )}
                      name="student_id"
                      onBlur={handleBlur}
                      error={!!touched.student_id && !!errors.student_id}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {studentsList.isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {touched.student_id && errors.student_id && (
                  <FormHelperText error>{errors.student_id}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  open={coursesOpen}
                  onOpen={() => {
                    setCoursesOpen(true);
                  }}
                  onClose={() => {
                    setCoursesOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => option.name}
                  options={courses?.data?.data?.data || []}
                  loading={courses.isLoading}
                  disableCloseOnSelect
                  id="course_id"
                  name={"course_id"}
                  onBlur={handleBlur}
                  onChange={(e, v) => {
                    setFieldValue("course_id", v?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "students.new_enroll.new_enroll_form.labels.course"
                      )}
                      name="course_id"
                      onBlur={handleBlur}
                      error={!!touched.course_id && !!errors.course_id}
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
                {touched.course_id && errors.course_id && (
                  <FormHelperText error>{errors.course_id}</FormHelperText>
                )}
              </Grid>
            </Grid>
            <LoadingButton
              color="primary"
              type="submit"
              loading={createEnroll.isPending}
              loadingPosition="start"
              startIcon={<Save />}
              variant="contained"
            >
              <span>
                {t("students.new_enroll.new_enroll_form.labels.create_btn")}
              </span>
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
  student_id: "",
  course_id: "",
};

const validationSchema = yup.object({
  student_id: yup.number().required("student is required"),
  course_id: yup.number().required("course is required"),
});

export default EnrollForm;
