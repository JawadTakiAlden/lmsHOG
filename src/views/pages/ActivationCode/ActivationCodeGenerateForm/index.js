import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../constant";
import useGetCourses from "../../../../api/useGetCourses";
import { LoadingButton } from "@mui/lab";
import { NoteAddOutlined } from "@mui/icons-material";
import useGenerateActivationCode from "../../../../api/useGenerateActivationCode";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(id, courses, theme) {
  return {
    fontWeight:
    courses.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const ActivationCodeGenerateForm = () => {
  const courses = useGetCourses();
  const theme =  useTheme()
  const generateCodes = useGenerateActivationCode();
  const handelGenerate = (values) => {
    generateCodes.callFuntion(values);
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        backgroundColor: "#fff",
        p: 3,
      }}
    >
      <Formik
        onSubmit={handelGenerate}
        initialValues={{
          type: "single",
          quantity: 1,
          number_of_courses: 1,
          courses: [],
        }}
        validationSchema={validationSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleReset,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Code Type</InputLabel>
                  <Select
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.type}
                    error={touched.type && errors.type}
                    label={"Code Type"}
                  >
                    <MenuItem value={"single"}>single</MenuItem>
                    <MenuItem value={"shared"}>shared</MenuItem>
                    <MenuItem value={"shared_selected"}>
                      shared selected
                    </MenuItem>
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Quantity</InputLabel>
                  <OutlinedInput
                    type="number"
                    label="Quantity"
                    name="quantity"
                    onChange={handleChange}
                    value={values.quantity}
                    error={touched.quantity && errors.quantity}
                    onBlur={handleBlur}
                    inputProps={{
                      min: 1,
                      max: 200,
                    }}
                  />
                  {touched.quantity && errors.quantity && (
                    <FormHelperText error>{errors.quantity}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {values.type === "shared_selected" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Number Of Courses</InputLabel>
                    <OutlinedInput
                      type="number"
                      label="Number Of Courses"
                      name="number_of_courses"
                      onChange={handleChange}
                      fullWidth
                      value={values.number_of_courses}
                      error={
                        touched.number_of_courses && errors.number_of_courses
                      }
                      onBlur={handleBlur}
                      inputProps={{
                        max: 200,
                      }}
                    />
                    {touched.number_of_courses && errors.number_of_courses && (
                      <FormHelperText error>
                        {errors.number_of_courses}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : undefined}
              {values.type === "single" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Courses</InputLabel>
                    <Select
                      fullWidth
                      value={values.courses}
                      name="courses"
                      onChange={(event) => {
                        setFieldValue("courses", [event.target.value]);
                      }}
                      input={<OutlinedInput label="Courses" />}
                    >
                      {courses.isLoading ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress color="primary" />
                        </Box>
                      ) : courses.isError ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button color="warning" variant="outlined">
                            Refetch
                          </Button>
                        </Box>
                      ) : courses?.data?.data?.data.length === 0 ? (
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary={"No Courses To Select"}
                        />
                      ) : (
                        courses?.data?.data?.data.map((course) => {
                          return (
                            <MenuItem key={course.id} value={course.id}>
                              <ListItemText primary={course.name} />
                            </MenuItem>
                          );
                        })
                      )}
                      {}
                    </Select>
                    {touched.courses && errors.courses && (
                      <FormHelperText error>{errors.courses}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : undefined}
              {values.type === "shared" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Courses</InputLabel>
                    <Select
                      fullWidth
                      value={values.courses}
                      name="courses"
                      multiple
                      onChange={(event) => {
                        // console.log(event.target.value)
                        const {
                          target: { value },
                        } = event;
                        setFieldValue('courses',
                          value,
                        );
                        setFieldValue("courses", [event.target.value]);
                      }}
                      input={<OutlinedInput label="Courses" />}
                    >
                      {courses.isLoading ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress color="primary" />
                        </Box>
                      ) : courses.isError ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button color="warning" variant="outlined">
                            Refetch
                          </Button>
                        </Box>
                      ) : courses?.data?.data?.data.length === 0 ? (
                        <ListItemText
                          sx={{ textAlign: "center" }}
                          primary={"No Courses To Select"}
                        />
                      ) : (
                        courses?.data?.data?.data.map((course) => {
                          return (
                            <MenuItem
              key={course.id}
              value={course.id}
              style={getStyles(course.id, values.courses, theme)}
            >
              {course.name}
            </MenuItem>
                          );
                        })
                      )}
                      {}
                    </Select>
                    {touched.courses && errors.courses && (
                      <FormHelperText error>{errors.courses}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : undefined}
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
                    startIcon={<NoteAddOutlined />}
                    loading={generateCodes.isPending}
                  >
                    Save
                  </LoadingButton>
                  <Button color="warning" onClick={handleReset}>
                    Reset
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

const validationSchema = yup.object({
  type: yup.string(),
  // number_of_courses : yup.number().when('type', {
  //     is: (val) => val === 'shared_selected',
  //     then: yup().number().min(1),
  //     otherwise: yup.number()
  // }),
  // courses : yup.array().when('type' , {
  //     is  : (val) => val === 'shared',
  //     then : yup.array().length(2),
  //     otherwise : yup.array()
  // }),
  quantity: yup
    .number()
    .min(1)
    .max(200)
    .required("number of codes you are want to generate is rquried"),
});

export default ActivationCodeGenerateForm;
