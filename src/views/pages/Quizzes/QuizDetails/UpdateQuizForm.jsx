import { CreateOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../constant";
import useUpdateQuiz from "../../../../api/useUpdateQuiz";
import { useTranslation } from "react-i18next";

const UpdateQuizForm = ({ quiz }) => {
  const updateQuiz = useUpdateQuiz();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        my: 3,
        p: 2,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "1px 1px 10px -6px rgba(0,0,0,.4)",
      }}
    >
      <Formik
        onSubmit={(values) => {
          updateQuiz.callFunction(values);
        }}
        initialValues={{
          title: quiz.title,
          description: quiz.description,
        }}
        validationSchema={yup.object({
          title: yup.string().max(255).required("quiz title is required"),
          description: yup.string().max(255).nullable(),
        })}
      >
        {({
          handleBlur,
          handleChange,
          handleReset,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("quizzes.quiz_details.update_from.labels.title")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("quizzes.quiz_details.update_from.labels.title")}
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
                <FormControl fullWidth>
                  <InputLabel>
                    {t("quizzes.quiz_details.update_from.labels.description")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t(
                      "quizzes.quiz_details.update_from.labels.description"
                    )}
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    error={touched.description && errors.description}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
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
                    disabled={
                      JSON.stringify(values) ===
                      JSON.stringify({
                        title: quiz.title,
                        description: quiz.description,
                      })
                    }
                    loading={updateQuiz.isPending}
                  >
                    {t("quizzes.quiz_details.update_from.labels.save_btn")}
                  </LoadingButton>
                  <Button color="warning" onClick={handleReset}>
                    {t("quizzes.quiz_details.update_from.labels.reset_btn")}
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

export default UpdateQuizForm;
