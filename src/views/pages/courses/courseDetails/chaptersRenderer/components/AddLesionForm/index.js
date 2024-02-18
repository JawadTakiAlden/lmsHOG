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
import React from "react";
import { gridSpacing } from "../../../../../../../constant";
import {
  CancelOutlined,
  CreateOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import useCreateLesion from "../../../../../../../api/useCreateLesion";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import useGetVideos from "../../../../../../../api/useGetVideos";
import VisuallyHiddenInput from "../../../../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import { useTranslation } from "react-i18next";

const lesionTypes = ["video", "pdf"];

const AddLesionForm = ({ chapter, handelClose }) => {
  const createLesion = useCreateLesion();
  const videos = useGetVideos();
  const {t} = useTranslation()
  const handleCreateNewLesion = (values) => {
    let valuesToSubmit = {
          is_visible : values.is_visible,
          is_open : values.is_open ,
          type : values.type,
          chapter_id : values.chapter_id,
          title : values.title,
          time : values.time
    }
    if(values.type === 'pdf'){
      valuesToSubmit.pdfFile = values.pdfFile
    }else{
      valuesToSubmit.videoURI = values.videoURI
    }
    createLesion.callFunction(valuesToSubmit);
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
        onSubmit={handleCreateNewLesion}
        validationSchema={validationSchema}
        initialValues={{
          videoURI: "",
          pdfFile : null,
          is_visible : false,
          is_open : false,
          type : 'video',
          chapter_id : chapter.id,
          title : '',
          time : 0
        }}
      >
        {({
          handleSubmit,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.type')}</InputLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.type')}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.title')}</InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.title')}
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
                  <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.time')}</InputLabel>
                  <OutlinedInput
                    type="number"
                    label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.time')}
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
              {values.type === "video" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.link')}</InputLabel>
                    <Select
                      value={values.videoURI}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="videoURI"
                      label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.link')}
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
                            {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.refetch_btn')}
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
                  {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.file')}
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
                  control={<Switch />}
                  label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.is_visible')}
                  name="is_visible"
                  value={values.is_visible}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Switch />}
                  label={t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.is_open')}
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
                loading={createLesion.isPending}
                startIcon={<CreateOutlined />}
              >
                {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.create_btn')}
              </LoadingButton>
              <Button
                variant="contained"
                color="error"
                startIcon={<CancelOutlined />}
                onClick={handelClose}
              >
                {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.cancel_btn')}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object({
  type : yup.string().required('type is required'),
  pdfFile: yup.mixed().when('type', {
    is: 'pdf',
    then: (schema) => schema.required('pdf file is required'),
    otherwise : (schema) => schema.notRequired()
  }),
  videoURI: yup.string().when('type', {
    is: 'video',
    then: (schema) => schema.required('video is required'),
    otherwise : (schema) => schema.notRequired()
  }),
  time : yup.number().when('type' , {
    is : 'pdf',
    then : (schema) => schema.min(0)
  })
});

export default AddLesionForm;
