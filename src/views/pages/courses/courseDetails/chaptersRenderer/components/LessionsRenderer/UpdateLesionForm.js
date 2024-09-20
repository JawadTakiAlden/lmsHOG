import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { gridSpacing } from "../../../../../../../constant";
import {
  CancelOutlined,
  CreateOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import useUpdateLesion from "../../../../../../../api/useUpdateLesion";
import { useTranslation } from "react-i18next";
import useGetVideos from "../../../../../../../api/useGetVideos";
import VisuallyHiddenInput from "../../../../../../../components/VisuallyHiddenInput/VisuallyHiddenInput";
import useDebounce from "../../../../../../../utils/useDebounce";

const UpdateLesionForm = ({ lesion, handelClose }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const [videoUriOpen, setVideoUriOpen] = useState(false);
  const updateLesion = useUpdateLesion({ lesion_id: lesion.id });
  const handleUpdateLesion = (values) => {
    let dataChangedToSend = {
      ...(values.pdfFile && { pdfFile: values.pdfFile }),
      ...(values.videoURI && { videoURI: values.videoURI.uri }),
      is_visible: +values.is_visible,
      is_open: +values.is_open,
      title: values.title,
      time: values.time,
      description: values.description,
      source: values.source,
    };
    updateLesion.callFunction(dataChangedToSend);
  };

  const {
    handleSubmit,
    values,
    touched,
    setFieldValue,
    errors,
    handleChange,
    handleBlur,
  } = useFormik({
    onSubmit: handleUpdateLesion,
    validationSchema: validationSchema,
    initialValues: {
      is_visible: lesion.is_visible,
      is_open: lesion.is_open,
      title: lesion.title,
      time: lesion.time,
      type: lesion.type,
      description: lesion.description,
      source: lesion.source,
    },
  });

  const videos = useGetVideos(inputValue, values.source);

  useEffect(() => {
    videos.refetch();
  }, [values.source]);

  const handelRefetchOnSearch = useDebounce(() => {
    videos.refetch();
  }, 500);

  useEffect(() => {
    handelRefetchOnSearch();
  }, [inputValue]);

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
              <InputLabel>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.title"
                )}
              </InputLabel>
              <OutlinedInput
                type="text"
                label={t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.title"
                )}
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
          {values.type === "pdf" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>
                  {t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.time"
                  )}
                </InputLabel>
                <OutlinedInput
                  type="number"
                  label={t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.time"
                  )}
                  name="time"
                  onChange={handleChange}
                  value={values.time}
                  error={touched.time && errors.time}
                  onBlur={handleBlur}
                  inputProps={{
                    min: 0,
                  }}
                />
                {touched.time && errors.time && (
                  <FormHelperText error>{errors.time}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}
          {values.type === "pdf" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>
                  {t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.description"
                  )}
                </InputLabel>
                <OutlinedInput
                  type="text"
                  label={t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.description"
                  )}
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
          )}
          {values.type === "video" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t("source")}</InputLabel>
                <Select
                  value={values.source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="source"
                  label={t("source")}
                  error={touched.source && errors.source}
                >
                  {lesionSource.map((source) => (
                    <MenuItem value={source}>{source}</MenuItem>
                  ))}
                </Select>
                {touched.source && errors.source && (
                  <FormHelperText error>{errors.source}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}
          {values.type === "video" ? (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Autocomplete
                  open={videoUriOpen}
                  onOpen={() => {
                    setVideoUriOpen(true);
                  }}
                  onClose={() => {
                    setVideoUriOpen(false);
                  }}
                  filterOptions={(x) => x}
                  disableCloseOnSelect
                  isOptionEqualToValue={(option, value) =>
                    option.uri === value.uri
                  }
                  id="videoURI"
                  name={"videoURI"}
                  onBlur={handleBlur}
                  getOptionLabel={(option) => option.name}
                  options={videos?.data?.data?.data || []}
                  loading={videos.isLoading || videos.isRefetching}
                  onChange={(event, newValue) => {
                    setFieldValue("videoURI", newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t(
                        "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.link"
                      )}
                      name="videoURI"
                      onBlur={handleBlur}
                      error={touched.videoURI && errors.videoURI}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {videos.isLoading || videos.isRefetching ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {touched.videoURI && errors.videoURI && (
                  <FormHelperText error>{errors.videoURI}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="contained"
                startIcon={<PictureAsPdfOutlined />}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.update_lesion_form.labels.file"
                )}
                <VisuallyHiddenInput
                  type="file"
                  name="pdfFile"
                  onBlur={handleBlur}
                  accept="application/pdf"
                  onChange={(e) => {
                    setFieldValue("pdfFile", e.target.files[0]);
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
    </Box>
  );
};

const validationSchema = yup.object({
  videoURI: yup.mixed(),
  time: yup.number().when("type", {
    is: "pdf",
    then: (schema) => schema.min(0).required("estimated time is required"),
  }),
  title: yup.string().nullable().max(255),
  description: yup.string().nullable().max(600),
});

export default UpdateLesionForm;
