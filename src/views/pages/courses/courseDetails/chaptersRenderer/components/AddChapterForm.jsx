import {
  CreateOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import useCreateChapter from "../../../../../../api/useCreateChapter";
import { useTranslation } from "react-i18next";

const AddChapterForm = ({ course_id }) => {
  const { t } = useTranslation();
  const handelAddChapter = (values) => {
    createChapterRequest.callFuntion({
      ...values,
      course_id: course_id,
    });
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handelAddChapter,
  });
  const createChapterRequest = useCreateChapter(handleReset);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        transition: "height 0.4s ease",
        borderRadius: "15px",
        backgroundColor: "#0794EB0A",
        p: 2,
        my: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
        }}
      >
        <Formik>
          <form style={{ boxSizing: "border-box" }} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{}}>
              <InputLabel>
                {t("courses.detaisl.details_tab.add_chapter_form.labels.name")}
              </InputLabel>
              <OutlinedInput
                type="text"
                label={t(
                  "courses.detaisl.details_tab.add_chapter_form.labels.name"
                )}
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
                name="is_visible"
                checked={values.is_visible}
              />
            </FormControl>
            <LoadingButton
              color="primary"
              type="submit"
              fullWidth
              loading={createChapterRequest.isPending}
              loadingPosition="start"
              startIcon={<CreateOutlined />}
              variant="contained"
            >
              <span>
                {t(
                  "courses.detaisl.details_tab.add_chapter_form.labels.create_btn"
                )}
              </span>
            </LoadingButton>
          </form>
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  name: "",
  is_visible: true,
};

const validationSchema = yup.object({
  name: yup.string().required("chapter name is required"),
});

export default AddChapterForm;
