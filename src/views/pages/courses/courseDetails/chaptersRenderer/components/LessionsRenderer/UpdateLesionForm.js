import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../../../../constant";
import { CancelOutlined, CreateOutlined } from "@mui/icons-material";
import useUpdateLesion from "../../../../../../../api/useUpdateLesion";

const lesionTypes = ["video", "pdf"];

const UpdateLesionForm = ({ lesion, handelClose }) => {
  const updateLesion = useUpdateLesion({ lesion_id: lesion.id });
  const handleUpdateLesion = (values) => {
    updateLesion.callFunction(values)
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",

        borderRadius: "12px",
        p: 2,
        mt: 2,
      }}
    >
      <Formik
        onSubmit={handleUpdateLesion}
        validationSchema={validationSchema}
        initialValues={{
          title: lesion.title,
          link: lesion.link,
          type: lesion.type,
          is_open: Boolean(lesion.is_open),
          is_visible: Boolean(lesion.is_visible),
          time: lesion.time,
        }}
      >
        {({
          handleSubmit,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    label={"Type"}
                    error={touched.type && errors.type}
                  >
                    {lesionTypes.map((type) => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Link</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Link"
                    name="link"
                    onChange={handleChange}
                    value={values.link}
                    error={touched.link && errors.link}
                    onBlur={handleBlur}
                  />
                  {touched.link && errors.link && (
                    <FormHelperText error>{errors.link}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Time</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Time"
                    name="time"
                    onChange={handleChange}
                    value={values.time}
                    inputProps={{
                      min: 0,
                    }}
                    error={touched.time && errors.time}
                    onBlur={handleBlur}
                  />
                  {touched.time && errors.time && (
                    <FormHelperText error>{errors.time}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControlLabel
                  control={<Switch defaultChecked={values.is_visible} />}
                  label="Visible"
                  name="is_visible"
                  value={values.is_visible}
                  onChange={handleChange}
                />
              <FormControlLabel
                  control={<Switch defaultChecked={values.is_open} />}
                  label="Free"
                  name="is_open"
                  value={values.is_open}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                mt: 2,
              }}
            >
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                loading={updateLesion.isPending}
                startIcon={<CreateOutlined />}
              >
                Update
              </LoadingButton>
              <Button
                variant="contained"
                disabled={updateLesion.isPending}
                color="error"
                startIcon={<CancelOutlined />}
                onClick={handelClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object({
  title: yup.string().max(255).required("title is required"),
  link: yup.string().required("link of lesion is required"),
  time: yup.number().min(0).required("time of lesion is required"),
});

export default UpdateLesionForm;
