import { CancelOutlined, CreateOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import useCreateQuiz from "../../../../api/useCreateQuiz";
import * as yup from "yup";
import useGetQuizzes from "../../../../api/useGetQuizzes";
import useAddQuestionToPreExistingQuiz from "../../../../api/useAddQuestionToPreExistingQuiz";
const AddToPreExistingQuizModel = ({ open, handleClose, table }) => {
  const createQuiz = useAddQuestionToPreExistingQuiz();
  const quizzes = useGetQuizzes()
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
            quiz_id: "",
            is_visible: false,
          }}
          validationSchema={yup.object({
            quiz_id: yup.string().max(255).required("select quiz rqeuired"),
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
                <InputLabel>Quiz</InputLabel>
                <Select
                  value={values.quiz_id}
                  label="Quiz"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="quiz_id"
                  error={touched.quiz_id && errors.quiz_id}
                >
                    {
                        quizzes.isLoading ?
                        ( <Box sx={{display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                            <CircularProgress />
                        </Box>)
                        : quizzes.isError ? (
                            <Button fullWidth onClick={() => quizzes.refetch}>try agian</Button>
                        )
                        : (
                            quizzes?.data?.data?.data?.map(quiz => (
                                <MenuItem value={quiz.id}>{quiz.title}</MenuItem>
                            ))
                        )
                    }
                </Select>
                {touched.quiz_id && errors.quiz_id && (
                  <FormHelperText error>{errors.quiz_id}</FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                sx={{ mb: 2 }}
                label="Initial Visibility For Questions Added"
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

export default AddToPreExistingQuizModel;
