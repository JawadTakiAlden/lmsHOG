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
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const CreateQuizModel = ({ open, handleClose, table }) => {
  const createQuiz = useCreateQuiz();
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> {t("quizzes.create_quiz_mode.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("quizzes.create_quiz_mode.text")}
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
                <InputLabel>
                  {" "}
                  {t("quizzes.create_quiz_mode.labels.title")}
                </InputLabel>
                <OutlinedInput
                  type="text"
                  label={t("quizzes.create_quiz_mode.labels.title")}
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
                <InputLabel>
                  {t("quizzes.create_quiz_mode.labels.description")}
                </InputLabel>
                <OutlinedInput
                  type="text"
                  label={t("quizzes.create_quiz_mode.labels.description")}
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
                label={t("quizzes.create_quiz_mode.labels.is_visible")}
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
                  {t("quizzes.create_quiz_mode.labels.create_btn")}
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
          {t("quizzes.create_quiz_mode.labels.cancel_btn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQuizModel;
