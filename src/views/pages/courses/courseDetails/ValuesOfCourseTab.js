import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
import useCreateNewValue from "../../../../api/useCreateNewValue";
import { LoadingButton } from "@mui/lab";
import ValueCard from "./ValueCard";
import { useTranslation } from "react-i18next";

const ValuesOfCourseTab = ({ course }) => {
  const [open, setOpen] = useState(false);
  const createValue = useCreateNewValue();
  const { t } = useTranslation();
  const addValueFormik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: yup.object({
      value: yup.string().required("value is required"),
    }),
    onSubmit: (values) => {
      createValue.callFuntion(values);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Box>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button variant="contained" onClick={handleClickOpen} size="large">
            {t("courses.detaisl.values_tab.buttons.0")}
          </Button>
        </Box>
        {course.values.length === 0 ? (
          <Typography
            sx={{
              py: 1,
              px: 2,
              my: 3,
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {t("courses.detaisl.values_tab.no_values")}
          </Typography>
        ) : undefined}
        {course.values.map((value) => (
          <ValueCard key={value.id} value={value} />
        ))}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: addValueFormik.handleSubmit,
        }}
      >
        <DialogTitle>
          {t("courses.detaisl.values_tab.dialogs.add_dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("courses.detaisl.values_tab.dialogs.add_dialog.desc")}
          </DialogContentText>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>
              {t("courses.detaisl.values_tab.dialogs.add_dialog.input_label")}
            </InputLabel>
            <OutlinedInput
              type="text"
              label={t(
                "courses.detaisl.values_tab.dialogs.add_dialog.input_label"
              )}
              name="value"
              onChange={addValueFormik.handleChange}
              value={addValueFormik.values.value}
              error={
                addValueFormik.touched.value && addValueFormik.errors.value
              }
              onBlur={addValueFormik.handleBlur}
            />
            {addValueFormik.touched.value && addValueFormik.errors.value && (
              <FormHelperText error>
                {addValueFormik.errors.value}
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              addValueFormik.handleReset();
            }}
            variant="outlined"
            color="error"
            disabled={createValue.isPending}
          >
            {t("courses.detaisl.values_tab.dialogs.add_dialog.cancel_btn")}
          </Button>
          <LoadingButton
            loading={createValue.isPending}
            type="submit"
            variant="contained"
          >
            {t("courses.detaisl.values_tab.dialogs.add_dialog.create_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ValuesOfCourseTab;
