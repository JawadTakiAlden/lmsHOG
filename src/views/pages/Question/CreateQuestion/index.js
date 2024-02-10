import {
  Box,
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

const CreateQuestion = () => {
  const handelCreateQuestion = (values) => {
    console.log(values);
  };
  return (
    <Box>
      <Formik
        onSubmit={handelCreateQuestion}
        initialValues={{
          title: "",
          clarification_text: "",
        }}
        validationSchema={yup.object({
          title: yup.string().required("title is required"),
          clarification_text: yup
            .string()
            .required("clarification is required"),
        })}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Title</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Title"
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
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateQuestion;
