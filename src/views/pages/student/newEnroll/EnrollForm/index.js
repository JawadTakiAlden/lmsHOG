import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { gridSpacing } from '../../../../../constant';
import { Formik } from 'formik';
import * as yup from 'yup'
import useGetStudentList from '../../../../../api/useGetStudentList';
import useGetVisibleCourses from '../../../../../api/useGetVisibleCourses';
import useCreateEnroll from '../../../../../api/useCreateEnroll';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

const EnrollForm = () => {
    const studentsList = useGetStudentList()
    const courses = useGetVisibleCourses()
    const createEnroll = useCreateEnroll()
    const handelSubmit = (values) => {
        createEnroll.callFuntion(values)
    };
  return (
    <Box
        sx={{
            p : 2,
            mt : 3
        }}
    >
        <Formik
            onSubmit={handelSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {
                ({
                    handleSubmit,
                    values,
                    handleChange,
                    handleBlur,
                    touched,
                    errors
                }) => (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={gridSpacing} sx={{mb : 2}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                <InputLabel >Student</InputLabel>
                                <Select
                                    value={values.student_id}
                                    label="Student"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name='student_id'
                                >
                                    {
                                        studentsList.isLoading && <Box sx={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , p : 2}}><CircularProgress /></Box>
                                    }
                                    {
                                        studentsList.error && <Button color='error' variant='contained' onClick={studentsList.refetch}>refresh</Button>
                                    }
                                    {
                                        studentsList?.data?.data?.data.map(student => (
                                            <MenuItem key={student.id} value={student.id}>{student.full_name} ---- {student.phone}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {
                                    touched.student_id && errors.student_id &&  <FormHelperText error>
                                        {errors.student_id}
                                    </FormHelperText>
                                }
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                <InputLabel>Course</InputLabel>
                                <Select
                                    value={values.course_id}
                                    label="Course"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name='course_id'
                                >
                                    {
                                        courses.isLoading && <Box sx={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , p : 2}}><CircularProgress /></Box>
                                    }
                                    {
                                        courses.error && <Button color='error' variant='contained' onClick={courses.refetch}>refresh</Button>
                                    }
                                    {
                                        courses?.data?.data?.data.map(course => (
                                            <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                                        )) 
                                    }
                                </Select>
                                {
                                    touched.course_id && errors.course_id &&  <FormHelperText error>
                                        {errors.course_id}
                                    </FormHelperText>
                                }
                            </FormControl>
                            </Grid>
                        </Grid>
                        {/* <Button disabled={} variant='contained' type='submit'>Create Enroll</Button> */}
                        <LoadingButton
                            color="primary"
                            type='submit'
                            loading={createEnroll.isPending}
                            loadingPosition="start"
                            startIcon={<Save />}
                            variant="contained"
                            >
                                <span>Create</span>
                            </LoadingButton>
                    </form>
                )
            }
        </Formik>
        
        
    </Box>
  )
}

const initialValues = {
    student_id : '',
    course_id : ''
}

const validationSchema = yup.object({
    student_id : yup.number().required('student is required'),
    course_id : yup.number().required('course is required'),
})

export default EnrollForm