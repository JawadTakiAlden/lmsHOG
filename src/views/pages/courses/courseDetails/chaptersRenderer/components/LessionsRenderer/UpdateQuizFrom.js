import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { CreateOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useUpdateQuizInChapter from "../../../../../../../api/useUpdateQuizInChapter";
const UpdateQuizFrom = ({ quiz, handelEditClose }) => {
  const { t } = useTranslation();
  const update = useUpdateQuizInChapter(quiz.id_from_pivot);
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
          update.callFunction(values);
        }}
        initialValues={{
          is_visible: quiz.is_visible,
          is_free: quiz.is_free,
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FormControlLabel
              sx={{ mb: 2 }}
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.is_visible"
              )}
              name="is_visible"
              onChange={handleChange}
              checked={values.is_visible}
              control={<Checkbox />}
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.is_free"
              )}
              name="is_free"
              onChange={handleChange}
              checked={values.is_free}
              control={<Checkbox />}
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
                loading={update.isPending}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_quiz_form.labels.update_btn"
                )}
              </LoadingButton>
              <Button color="warning" onClick={handelEditClose}>
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

export default UpdateQuizFrom;
