import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../../../../constant";
import { CancelOutlined, CreateOutlined, PictureAsPdfOutlined } from "@mui/icons-material";
import useUpdateLesion from "../../../../../../../api/useUpdateLesion";
import { useTranslation } from "react-i18next";
import useGetVideos from "../../../../../../../api/useGetVideos";
import VisuallyHiddenInput from "../../../../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";

const lesionTypes = ["video", "pdf"];

const UpdateLesionForm = ({ lesion, handelClose }) => {
  const {t} = useTranslation()
  const videos = useGetVideos();
  const updateLesion = useUpdateLesion({ lesion_id: lesion.id });
  const handleUpdateLesion = (values) => {
    let dataChangedToSend = {
      ...(values.pdfFile && {pdfFile : values.pdfFile}),
      ...(values.videoURI && {videoURI : values.videoURI}),
      is_visible : +values.is_visible,
      is_open : +values.is_open,
      title : values.title,
      time : values.time,
      description : values.description
    }
    updateLesion.callFunction(dataChangedToSend)
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "12px",
        p: 2,
        mt: 2,
      }}
    >
      <Formik
        onSubmit={handleUpdateLesion}
        validationSchema={validationSchema}
        initialValues={{
          is_visible : lesion.is_visible,
          is_open : lesion.is_open,
          title : lesion.title,
          time : lesion.time,
          type : lesion.type,
          description : lesion.description
        }}
      >
        {({
          handleSubmit,
          values,
          touched,
          setFieldValue,
          errors,
          handleChange,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.type')}</InputLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.type')}
                    error={touched.type && errors.type}
                  >
                    {lesionTypes.map((type) => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                  {touched.type && errors.type && (
                    <FormHelperText error>{errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.title')}</InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.title')}
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    error={touched.title && errors.title}
                    onBlur={handleBlur}
                  />
                  {touched.title && errors.title && (
                    <FormHelperText error>{errors.title}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {
                values.type === 'pdf' && <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.time')}</InputLabel>
                  <OutlinedInput
                    type="number"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.time')}
                    name="time"
                    onChange={handleChange}
                    value={values.time}
                    error={touched.time && errors.time}
                    onBlur={handleBlur}
                    inputProps={{
                      min : 0,
                    }}
                  />
                  {touched.time && errors.time && (
                    <FormHelperText error>{errors.time}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              }
              {
                values.type === 'pdf' && <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.description')}</InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.description')}
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
              </Grid>
              }
              {values.type === "video" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.link')}</InputLabel>
                    <Select
                      value={values.videoURI}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="videoURI"
                      label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.link')}
                      error={touched.videoURI && errors.videoURI}
                    >
                      {videos.isLoading ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      ) : videos.isError ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={videos.refetch}
                          >
                            {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.refetch_btn')}
                          </Button>
                        </Box>
                      ) : (
                        videos?.data?.data?.data.map((video) => (
                          <MenuItem value={video.uri}>{video.name}</MenuItem>
                        ))
                      )}
                    </Select>
                    {touched.videoURI && errors.videoURI && (
                      <FormHelperText error>{errors.videoURI}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} >
                  <Button component="label" variant="contained" startIcon={<PictureAsPdfOutlined />}>
                  {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.file')}
                    <VisuallyHiddenInput
                        type="file"
                        name="pdfFile"
                        onBlur={handleBlur}
                        accept="application/pdf"
                        onChange={(e) => {
                            setFieldValue('pdfFile',e.target.files[0])
                        }}
                    />
                </Button>
                {touched.pdfFile && errors.pdfFile && (
                    <FormHelperText error>{errors.pdfFile}</FormHelperText>
                  )}
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
              <FormControlLabel
                  control={<Switch defaultChecked={values.is_visible} />}
                  label="Visible"
                  name="is_visible"
                  value={values.is_visible}
                  onChange={handleChange}
                />
              <FormControlLabel
                  control={<Switch defaultChecked={values.is_open} />}
                  label="Free"
                  name="is_open"
                  value={values.is_open}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                mt: 2,
              }}
            >
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                loading={updateLesion.isPending}
                startIcon={<CreateOutlined />}
              >
                Update
              </LoadingButton>
              <Button
                variant="contained"
                disabled={updateLesion.isPending}
                color="error"
                startIcon={<CancelOutlined />}
                onClick={handelClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object({
});

export default UpdateLesionForm;
