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
import { gridSpacing } from "../../../../constant";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined, ImageOutlined } from "@mui/icons-material";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import useCreateQuestion from "../../../../api/useCreateQuestion";
import * as yup from "yup";
import filterObjectFromNullValues from "../../../../utils/filterObjectFromNullValues";
import { useTranslation } from "react-i18next";

const CreateQuestion = () => {
  const createQuestion = useCreateQuestion();
  const { t } = useTranslation();

  const createQuestionHandler = (values) => {
    createQuestion.callFuntion(filterObjectFromNullValues(values));
  };
  return (
    <Box>
      <Formik
        onSubmit={createQuestionHandler}
        validationSchema={yup.object({
          title: yup.string().when("image", {
            is: null,
            then: (schema) => schema.required("title is required "),
          }),
          clarification_text: yup.string().when("clarification_image", {
            is: null,
            then: (schema) => schema.required("clarification is required "),
          }),
          image: yup.mixed().nullable(),
          clarification_image: yup.mixed().nullable(),
        })}
        initialValues={{
          title: "",
          image: null,
          clarification_text: "",
          clarification_image: null,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
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
                    {t("questions.create_question.labels.title")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("questions.create_question.labels.title")}
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
                <FormControl sx={{ mb: 4 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<ImageOutlined />}
                  >
                    {t("questions.create_question.labels.image")}
                    <VisuallyHiddenInput
                      type="file"
                      onBlur={handleBlur}
                      name="image"
                      accept="image/png , image/jpg , image/jpeg"
                      onChangeCapture={(e) => {
                        setFieldValue("image", e.target.files[0]);
                      }}
                    />
                  </Button>
                  {touched.image && errors.image && (
                    <FormHelperText error>{errors.image}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {values.image ? (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "fit-content",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "1px 1px 10px -6px #000000cc",
                      mb: 2,
                    }}
                  >
                    <img
                      src={values.image && URL.createObjectURL(values.image)}
                      alt="clarification"
                      style={{
                        objectFit: "fill",
                        width: "100%",
                        maxHeight: "300px",
                        maxWidth: "500px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Grid>
              ) : undefined}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t("questions.create_question.labels.clarification_text")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t(
                      "questions.create_question.labels.clarification_text"
                    )}
                    name="clarification_text"
                    onChange={handleChange}
                    value={values.clarification_text}
                    error={
                      touched.clarification_text && errors.clarification_text
                    }
                    onBlur={handleBlur}
                  />
                  {touched.clarification_text && errors.clarification_text && (
                    <FormHelperText error>
                      {errors.clarification_text}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ mb: 4 }}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<ImageOutlined />}
                  >
                    {t("questions.create_question.labels.clarification_image")}
                    <VisuallyHiddenInput
                      type="file"
                      onBlur={handleBlur}
                      name="clarification_image"
                      accept="image/png , image/jpg , image/jpeg"
                      onChangeCapture={(e) => {
                        setFieldValue("clarification_image", e.target.files[0]);
                      }}
                    />
                  </Button>
                </FormControl>
              </Grid>
              {values.clarification_image ? (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "fit-content",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "1px 1px 10px -6px #000000cc",
                      mb: 2,
                    }}
                  >
                    <img
                      src={
                        values.clarification_image &&
                        URL.createObjectURL(values.clarification_image)
                      }
                      alt="clarification"
                      style={{
                        objectFit: "fill",
                        width: "100%",
                        maxHeight: "300px",
                        maxWidth: "500px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Grid>
              ) : undefined}
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                loading={createQuestion.isPending}
                startIcon={<CreateOutlined />}
              >
                {t("questions.create_question.labels.create_btn")}
              </LoadingButton>
              <Button onClick={handleReset} color="warning" variant="outlined">
                {t("questions.create_question.labels.reset_btn")}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateQuestion;
