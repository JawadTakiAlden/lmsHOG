import { Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Switch } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { gridSpacing } from "../../../../../../../constant";
import { CancelOutlined, CreateOutlined, InputOutlined } from "@mui/icons-material";
import useCreateLesion from "../../../../../../../api/useCreateLesion";
import { LoadingButton } from "@mui/lab";
import * as yup from 'yup'

const lesionTypes = ['video' , 'pdf']

const AddLesionForm = ({ chapter , handelClose }) => {
    const createLesion = useCreateLesion()
  const handleCreateNewLesion = (values) => {
    createLesion.callFunction(values)
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",

        borderRadius: "12px",
        p: 2,
        mt : 2
      }}
    >
      <Formik
        onSubmit={handleCreateNewLesion}
        validationSchema={validationSchema}
        initialValues={{
          title: "",
          link: "",
          type : 'video',
          is_open: false,
          is_visible: true,
          chapter_id: chapter.id,
          time: 0,
        }}
      >
        {({ handleSubmit,values,touched,errors,handleChange,handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Title</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    error={
                      touched.title &&
                      errors.title
                    }
                    onBlur={handleBlur}
                  />
                  {touched.title &&
                    errors.title && (
                      <FormHelperText error>
                        {errors.title}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    label={'Type'}
                    error={
                        touched.type &&
                        errors.type
                      }
                  >
                    {
                        lesionTypes.map(type => (
                            <MenuItem value={type}>{type}</MenuItem>
                        ))
                    }
                  </Select>
                  {touched.type &&
                    errors.type && (
                      <FormHelperText error>
                        {errors.type}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Link</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Link"
                    name="link"
                    onChange={handleChange}
                    value={values.link}
                    error={
                      touched.link &&
                      errors.link
                    }
                    onBlur={handleBlur}
                  />
                  {touched.link &&
                    errors.link && (
                      <FormHelperText error>
                        {errors.link}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Time</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Time"
                    name="time"
                    onChange={handleChange}
                    value={values.time}
                    inputProps={{
                        min : 0
                    }}
                    error={
                      touched.time &&
                      errors.time
                    }
                    onBlur={handleBlur}
                  />
                  {touched.time &&
                    errors.time && (
                      <FormHelperText error>
                        {errors.time}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Switch />}
                  label="Visible"
                  name="is_visible"
                  value={values.is_visible}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Switch  />}
                  label="Free"
                  name="is_open"
                  value={values.is_open}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'flex-end',
                    gap : '10px',
                    mt : 2
                }}
            >
                <LoadingButton variant="contained" type="submit" color="primary" loading={createLesion.isPending} startIcon={<CreateOutlined />}>
                    Create
                </LoadingButton>
                <Button variant="contained" color="error" startIcon={<CancelOutlined />} onClick={handelClose}>Cancel</Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object({
    title  : yup.string().max(255).required('title is required'),
    link : yup.string().required('link of lesion is required'),
    time : yup.number().min(0).required('time of lesion is required'),
    
})

export default AddLesionForm;
