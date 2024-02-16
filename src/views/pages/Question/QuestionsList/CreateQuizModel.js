import { CancelOutlined, CreateOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import useCreateQuiz from "../../../../api/useCreateQuiz";
import * as yup from 'yup'

const CreateQuizModel = ({ open, handleClose, table }) => {
  const createQuiz = useCreateQuiz();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Quiz</DialogTitle>
      <DialogContent>
        <DialogContentText>
          All selected questions will be in quiz with visibility on , if you
          want to create some question's visibility off you should make that
          from quiz details page
        </DialogContentText>
        <Formik
          onSubmit={(values) => {
            let rowsSelected = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            let valuesToSubmit = {
              questions: rowsSelected,
              ...values,
            };
            createQuiz.callFuntion(valuesToSubmit);
          }}
          initialValues={{
            title: "",
            is_visible: false,
            description: "",
          }}
          validationSchema={yup.object({
            title: yup.string().max(255).required("title of quiz rqeuired"),
            description: yup.string().max(255).nullable(),
          })}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, mt: 2 }} fullWidth>
                <InputLabel>Quiz Title</InputLabel>
                <OutlinedInput
                  type="text"
                  label="Quiz Title"
                  name="title"
                  required
                  onChange={handleChange}
                  value={values.title}
                  error={touched.title && errors.title}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <FormHelperText error>{errors.title}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Description</InputLabel>
                <OutlinedInput
                  type="text"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={touched.description && errors.description}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                sx={{ mb: 2 }}
                label="Initial Visibility Of All Question Inside Quiz"
                name="is_visible"
                onChange={handleChange}
                checked={values.is_visible}
                control={<Checkbox />}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  startIcon={<CreateOutlined />}
                  loading={createQuiz.isPending}
                >
                  Create
                </LoadingButton>
                {/* <Button color="warning" onClick={handleReset}>
                      Reset
                    </Button> */}
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          color="error"
          variant="outlined"
          startIcon={<CancelOutlined />}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQuizModel;
