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
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
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
import useDebounce from "../../../../../../../utils/useDebounce";

const lesionTypes = ["video", "pdf"];
const lesionSource = ["vimeo-1", "vimeo-2", "vimeo-3"];

const AddLesionForm = ({ chapter, handelClose }) => {
  const [videoUriOpen, setVideoUriOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const createLesion = useCreateLesion();

  const { t } = useTranslation();
  const handleCreateNewLesion = (values) => {
    let valuesToSubmit = {
      is_visible: values.is_visible,
      is_open: values.is_open,
      type: values.type,
      chapter_id: values.chapter_id,
      title: values.title,
      time: values.time,
    };
    if (values.type === "pdf") {
      valuesToSubmit.pdfFile = values.pdfFile;
    } else {
      valuesToSubmit.videoURI = values.videoURI.uri;
      valuesToSubmit.original_video_name = values.videoURI.name;
      valuesToSubmit.source = values.source;
    }
    createLesion.callFunction(valuesToSubmit);
  };
  const {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    onSubmit: handleCreateNewLesion,
    validationSchema: validationSchema,
    initialValues: {
      videoURI: "",
      pdfFile: null,
      is_visible: true,
      is_open: false,
      type: "video",
      source: "vimeo-1",
      chapter_id: chapter.id,
      title: "",
      time: 0,
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{t("source")}</InputLabel>
              <Select
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                name="type"
                label={t("source")}
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.title"
                )}
              </InputLabel>
              <OutlinedInput
                type="text"
                label={t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.title"
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
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.time"
                  )}
                </InputLabel>
                <OutlinedInput
                  type="number"
                  label={t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.time"
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
          {values.type === "video" ? (
            <Grid item xs={12} sm={6}>
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
                      "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.link"
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
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="contained"
                startIcon={<PictureAsPdfOutlined />}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.file"
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
              control={
                <Switch
                  name="is_visible"
                  value={values.is_visible}
                  onChange={handleChange}
                  defaultChecked={values.is_visible}
                />
              }
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.is_visible"
              )}
            />
            <FormControlLabel
              control={
                <Switch
                  name="is_open"
                  value={values.is_open}
                  onChange={handleChange}
                  defaultChecked={values.is_open}
                />
              }
              label={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.is_open"
              )}
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
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.create_btn"
            )}
          </LoadingButton>
          <Button
            variant="contained"
            color="error"
            startIcon={<CancelOutlined />}
            onClick={handelClose}
          >
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.add_lesion_form.labels.cancel_btn"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const validationSchema = yup.object({
  type: yup.string().required("type is required"),
  pdfFile: yup.mixed().when("type", {
    is: "pdf",
    then: (schema) => schema.required("pdf file is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  videoURI: yup.mixed().when("type", {
    is: "video",
    then: (schema) => schema.required("video is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  time: yup.number().when("type", {
    is: "pdf",
    then: (schema) => schema.min(0),
  }),
});

export default AddLesionForm;
