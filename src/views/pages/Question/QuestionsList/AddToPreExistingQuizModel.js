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
import { useTranslation } from "react-i18next";
const AddToPreExistingQuizModel = ({ open, handleClose, table }) => {
  const createQuiz = useAddQuestionToPreExistingQuiz();
  const { t } = useTranslation();
  const quizzes = useGetQuizzes();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("quizzes.add_to_pre_existing_model.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("quizzes.add_to_pre_existing_model.text")}
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
                <InputLabel>
                  {t("quizzes.add_to_pre_existing_model.labels.quiz")}
                </InputLabel>
                <Select
                  value={values.quiz_id}
                  label={t("quizzes.add_to_pre_existing_model.labels.quiz")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="quiz_id"
                  error={touched.quiz_id && errors.quiz_id}
                >
                  {quizzes.isLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : quizzes.isError ? (
                    <Button fullWidth onClick={() => quizzes.refetch}>
                      {t(
                        "quizzes.add_to_pre_existing_model.labels.refetch_btn"
                      )}
                    </Button>
                  ) : (
                    quizzes?.data?.data?.data?.map((quiz) => (
                      <MenuItem value={quiz.id}>{quiz.title}</MenuItem>
                    ))
                  )}
                </Select>
                {touched.quiz_id && errors.quiz_id && (
                  <FormHelperText error>{errors.quiz_id}</FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                sx={{ mb: 2 }}
                label={t("quizzes.add_to_pre_existing_model.labels.is_visible")}
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
                  {t("quizzes.add_to_pre_existing_model.labels.create_btn")}
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
          {t("quizzes.add_to_pre_existing_model.labels.cancel_btn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToPreExistingQuizModel;
