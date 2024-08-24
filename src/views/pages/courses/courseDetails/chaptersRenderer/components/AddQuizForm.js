import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import useAddQuizToChapter from "../../../../../../api/useAddQuizToChapter";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined } from "@mui/icons-material";
import useGetQuizzes from "../../../../../../api/useGetQuizzes";
import { useTranslation } from "react-i18next";
const AddQuizForm = ({ chapter, handelClose }) => {
  const quizzes = useGetQuizzes();
  const { t } = useTranslation();
  const addQuizToChapter = useAddQuizToChapter();
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#fff",
        borderRadius: "12px",
        my: 2,
      }}
    >
      <Formik
        onSubmit={(values) => {
          addQuizToChapter.callFunction(values);
        }}
        initialValues={{
          quiz_id: "",
          is_visible: true,
          chapter_id: chapter.id,
          is_free: false,
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
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.quiz"
                )}
              </InputLabel>
              <Select
                value={values.quiz_id}
                label={t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.quiz"
                )}
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
                      "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.refetch_btn"
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
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.is_visible"
              )}
              control={
                <Switch
                  name="is_visible"
                  onChange={handleChange}
                  defaultChecked={values.is_visible}
                  value={values.is_visible}
                />
              }
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.is_free"
              )}
              control={
                <Switch
                  name="is_free"
                  onChange={handleChange}
                  defaultChecked={values.is_free}
                  value={values.is_free}
                />
              }
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 3,
              }}
            >
              <LoadingButton
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                startIcon={<CreateOutlined />}
                loading={addQuizToChapter.isPending}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.create_btn"
                )}
              </LoadingButton>
              <Button color="warning" onClick={handelClose}>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.cancel_btn"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddQuizForm;
