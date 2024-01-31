import { CameraOutlined, CreateOutlined, ImageOutlined, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import { LoadingButton } from "@mui/lab";
import useCreateNewAccount from "../../../../api/useCreateNewAccount";
import Profile from '../../../../assets/images/profile.png'

const initialValues = {
    full_name : '',
    phone : '',
    password : '',
    type : 'student'
};

const validationSchema = yup.object({
  full_name : yup.string().required('name is required'),
  phone : yup.string().required('phone is required'),
  password : yup.string().required('password is required'),
  type : yup.string().required('type is required'),
});

const CreateAccount = () => {

  const createAccount = useCreateNewAccount()
  
  const handelCreateAccount = (values) => {
    createAccount.callFunction(values)
  };

  const { handleChange, handleBlur, values, handleSubmit , errors, touched , setFieldValue} =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: handelCreateAccount
    });

    

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        
      <Box
        sx={{
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center'
          }}
        >
          {
            values.image ? (
              <Box
                sx={{
                  width : '200px',
                  height : '200px',
                  overflow : 'hidden',
                  borderRadius : '50%',
                  mb : 2,
                  boxShadow : '0px 2px 10px #ccc'
                }}
              >
                <img src={URL.createObjectURL(values.image)} alt="profile" width={'200px'} style={{height : '100%'}} />
              </Box>
            ) : (
              <Box
                sx={{
                  width : '200px',
                  height : '200px',
                  overflow : 'hidden',
                  borderRadius : '50%',
                  mb : 2,
                  boxShadow : '0px 2px 10px #ccc'
                }}
              >
                <img src={Profile} alt="profile" width={'200px'} style={{height : '100%'}} />
              </Box>
            )
          }
        </Box>
        <Formik>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Ful Name</InputLabel>
              <OutlinedInput
                type="text"
                label="Full Name"
                name="full_name"
                onChange={handleChange}
                value={values.full_name}
                error={touched.full_name && errors.full_name}
                onBlur={handleBlur}
              />
              {touched.full_name && errors.full_name && (
                <FormHelperText error>{errors.full_name}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Phone</InputLabel>
              <OutlinedInput
                type="text"
                label="Phone"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                error={touched.phone && errors.phone}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error>{errors.phone}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type="text"
                label="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
                error={touched.password && errors.password}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
                error={touched.type && errors.type}
                label={'Account Type'}
              >
                <MenuItem value={'student'}>Student</MenuItem>
                <MenuItem value={'teacher'}>Teacher</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
              </Select>
              {touched.type && errors.type && (
                <FormHelperText error>{errors.type}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ mb: 4 }}>
                <Button component="label" variant="contained" startIcon={<ImageOutlined />}>
                    Upload Image
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/png , image/jpg , image/jpeg"
                        onChange={(e) => {
                            setFieldValue('image',e.target.files[0])
                        }}
                    />
                </Button>
            </FormControl>
            <LoadingButton
                  color="primary"
                  type='submit'
                  fullWidth
                  loading={createAccount.isPending}
                  loadingPosition="start"
                  startIcon={<CreateOutlined />}
                  variant="contained"
                >
                    <span>Create Account</span>
              </LoadingButton>
          </form>
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateAccount;
