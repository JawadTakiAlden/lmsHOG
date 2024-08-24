import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Switch,
} from "@mui/material";
import { gridSpacing } from "../../../../../../constant";
import { LoadingButton } from "@mui/lab";
import { UpdateOutlined } from "@mui/icons-material";
import useUpdateChapter from "../../../../../../api/useUpdateChapter";
import { useTranslation } from "react-i18next";

const UpdateChapterForm = ({ chapter, handelClose }) => {
  const updateChapter = useUpdateChapter();
  const { t } = useTranslation();
  const handleChapterUpdateSubmit = (values) => {
    updateChapter.callFunction({ ...values, chapter_id: chapter.id });
  };
  return (
    <Box
      sx={{
        my: 2,
      }}
    >
      <Formik
        initialValues={{
          name: chapter.name,
          is_visible: chapter.is_visible,
        }}
        onSubmit={handleChapterUpdateSubmit}
        validationSchema={yup.object({
          name: yup.string().max(255).required("name is required"),
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
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>
                    {t(
                      "courses.detaisl.details_tab.chapter_renderer.chapter_card.update_chapter_form.labels.name"
                    )}
                  </InputLabel>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="is_visible"
                      defaultChecked={values.is_visible}
                      onChange={handleChange}
                      value={values.is_visible}
                    />
                  }
                  label={t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.update_chapter_form.labels.is_visible"
                  )}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                my: 2,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <LoadingButton
                color="primary"
                variant="contained"
                startIcon={<UpdateOutlined />}
                type="submit"
                loading={updateChapter.isPending}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.update_chapter_form.labels.update_btn"
                )}
              </LoadingButton>
              <Button color="error" variant="outlined" onClick={handelClose}>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.update_chapter_form.labels.cancel_btn"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateChapterForm;
