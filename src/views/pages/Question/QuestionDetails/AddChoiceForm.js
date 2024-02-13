import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import * as yup from 'yup'
import VisuallyHiddenInput from '../../../../components/VisuallyHiddenInput/VisuallyHiddenInput';
import { CancelOutlined, CreateOutlined, ImageOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { gridSpacing } from '../../../../constant';
import useCreateChoice from '../../../../api/useCreateChoice';

const AddChoiceForm = ({handelClose}) => {
    const createChoice  = useCreateChoice()
    const createChoiceHandler = (values) => {
        createChoice.callFuntion(values)
        // console.log(values)
    }
  return (
    <Box>
      <Formik
        onSubmit={createChoiceHandler}
        validationSchema={yup.object({})}
        initialValues={{
          title: "",
          image: "",
          is_visible: false,
          is_true: false,
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
                  <InputLabel>Choice Title</InputLabel>
                  <OutlinedInput
                    type="text"
                    label="Choice Title"
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
                    Choice Image
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
              <FormControlLabel
                label="Visibility"
                value={values.is_visible}
                onChange={handleChange}
                name="is_visible"
                control={
                  <Checkbox
                  />
                }
              />
              <FormControlLabel
                label="True"
                value={values.is_true}
                onChange={handleChange}
                name="is_true"
                control={
                  <Checkbox
                  />
                }
              />
              </Grid>
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
                loading={createChoice.isPending}
                startIcon={<CreateOutlined />}
              >
                Create
              </LoadingButton>
              <Button startIcon={<CancelOutlined />} disabled={createChoice.isPending} onClick={() => {
                handleReset()
                handelClose()
              }} color="error" variant="outlined">
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddChoiceForm