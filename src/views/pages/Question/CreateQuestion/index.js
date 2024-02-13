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

const CreateQuestion = () => {
  const createQuestion = useCreateQuestion();

  const createQuestionHandler = (values) => {
    createQuestion.callFuntion(values)
  };
  return (
    <Box>
      <Formik
        onSubmit={createQuestionHandler}
        validationSchema={yup.object({})}
        initialValues={{
          title: "",
          image: "",
          clarification_text: "",
          clarification_image: "",
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
                  <InputLabel>Question Title</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Question Title"
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
                    Title Image
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
                        maxWidth : '100%'
                      }}
                    />
                  </Box>
                </Grid>
              ) : undefined}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Clarification</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Clarification"
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
                    Clarification Image
                    <VisuallyHiddenInput
                      type="file"
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
                Create
              </LoadingButton>
              <Button onClick={handleReset} color="error" variant="outlined">
                Reset
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateQuestion;
