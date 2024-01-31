import { CreateOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Checkbox, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useRef } from 'react'
import * as yup from 'yup'
import useCreateChapter from '../../../../../../api/useCreateChapter'

const AddChapterForm = ({course_id}) => {
    const handelAddChapter = (values) => {
        createChapterRequest.callFuntion({
            ...values,
            course_id : course_id
        })
    }
    const {handleChange , handleSubmit , handleBlur , handleReset , values , errors , touched } = useFormik({
        initialValues : initialValues,
        validationSchema : validationSchema,
        onSubmit : handelAddChapter,
    })
    const createChapterRequest = useCreateChapter(handleReset)
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            transition: 'height 0.4s ease',
            borderRadius : '15px',
            backgroundColor : '#0794EB0A',
            p : 2,
            my : 3
        }}
    >
        <Box
            sx={{
                maxWidth : '800px'
            }}
        >
            <Formik>
                <form style={{boxSizing :'border-box'}} onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ }}>
                        <InputLabel>Chapter Name</InputLabel>
                        <OutlinedInput
                        type="text"
                        label="Chapter Name"
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
                    <FormControl>
                        <Checkbox
                            icon={<VisibilityOffOutlined />} 
                            checkedIcon={<VisibilityOutlined />} 
                            onChange={handleChange}
                            name='is_visible'
                            checked={values.is_visible}
                        />
                    </FormControl>
                    <LoadingButton
                        color="primary"
                        type='submit'
                        fullWidth
                        loading={createChapterRequest.isPending}
                        loadingPosition="start"
                        startIcon={<CreateOutlined />}
                        variant="contained"
                    >
                        <span>Create</span>
                    </LoadingButton>
                </form>
            </Formik>
        </Box>
    </Box>
  )
}

const initialValues = {
    name : '',
    is_visible : false,
}

const validationSchema = yup.object({
    name : yup.string().required('chapter name is required')
})

export default AddChapterForm