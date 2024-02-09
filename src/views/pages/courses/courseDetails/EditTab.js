import {
  Autocomplete,
  Box,
  Button,
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

const EditTab = ({ data }) => {
  const categories = useGetCategories()
  const teachers = useGetTeachers()
  const [image , setImage] = useState(null)
  const initialValues = {
    name : data.name,
    telegram_channel_link : data.telegram_channel_link,
    is_open : data.is_open,
    is_visible : data.is_visible,
    categories : data.categories,
    teachers : data.teachers
  };

  const updateHandler = (values) => {
    console.log(values)
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          image ? (
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
      <Formik initialValues={initialValues} onSubmit={updateHandler} validationSchema={validationSchema}>
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
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Course Name</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Course Name"
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
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Telegram Link</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Telegram Link"
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
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Autocomplete
                    multiple
                    getOptionLabel={(option) => option.name}
                    loading={categories.isLoading}
                    options={categories?.data?.data?.data || []}
                    value={values.categories}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    filterSelectedOptions
                    autoHighlight
                    onChange={(e , v) => {
                      setFieldValue('categories' , v)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categories"
                        placeholder="Categories"
                        name="categories"
                      />
                    )}
                  />
                  {touched.categories &&
                    errors.categories && (
                      <FormHelperText error>
                        {errors.categories}

                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Autocomplete
                    multiple
                    options={teachers?.data?.data?.data || []}
                    loading={teachers.isLoading}
                    getOptionLabel={(option) => option.full_name}
                    value={values.teachers}
                    autoHighlight
                    onChange={(e , v) => {
                      setFieldValue('teachers' , v)
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Teachers"
                        placeholder="Teachers"
                        name="teachers"
                      />
                    )}
                  />
                  {touched.teachers &&
                    errors.teachers && (
                      <FormHelperText error>
                        {errors.teachers}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked={initialValues.is_visible}  />}
                  label="Visible"
                  name="is_visible"
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Switch defaultChecked={initialValues.is_open} />}
                  label="Free"
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
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png , image/jpg , image/jpeg"
                      onChange={(e) => {
                        setImage(e.target.files[0])
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
                    justifyContent : 'flex-end',
                    py: 2,
                  }}
                >
                  <LoadingButton
                  size="large"
                    color="success"
                    type="submit"
                    loadingPosition="start"
                    startIcon={<CreateOutlined />}
                    variant="contained"
                  >
                    <span>Save</span>
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

const validationSchema = yup.object({});


export default EditTab;
