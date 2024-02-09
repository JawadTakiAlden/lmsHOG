import { ImageOutlined, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
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
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import useUpdateNews from "../../../../api/useUpdateNews";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";

const DetailsTab = ({ data }) => {
  const [news , ] = useState(data)
  const updateNews = useUpdateNews();
  const handelUpdate = (values) => {
    updateNews.callFunction(values);
  };
  return (
    <>
    <Formik
      initialValues={{
        title: news.title,
        is_visible: news.is_visible,
        position: news.position,
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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} direction={"column"}>
            <Grid item xs={12}>
            <Box
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  mb: 2,
                  backgroundImage: `url(${
                    values.image
                      ? URL.createObjectURL(values.image)
                      : news.image
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                <InputLabel>Title</InputLabel>
                <OutlinedInput
                  type="text"
                  label="Title"
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
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                <InputLabel>Position</InputLabel>
                <OutlinedInput
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  label="Position"
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
            
            <Grid item xs={12}>
              <FormControlLabel
                label="Visibility"
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
              <FormControl sx={{ mb: 4 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<ImageOutlined />}
                >
                  Upload Image
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
            <Grid item xs={12}>
              <LoadingButton
                color="inherit"
                variant="contained"
                size="large"
                type="submit"
                startIcon={<SaveOutlined />}
                loading={updateNews.isPending}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
    </>
  );
};

const validationSchema = yup.object({
  title: yup.string().nullable().max(255),
  position: yup.number().min(0).required("position is required"),
});

export default DetailsTab;
