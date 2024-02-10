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
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
import useCreateNewValue from "../../../../api/useCreateNewValue";
import { LoadingButton } from "@mui/lab";
import { DeleteOutlined } from "@mui/icons-material";
import ValueCard from "./ValueCard";

const ValuesOfCourseTab = ({ course }) => {
  const [open, setOpen] = useState(false);
  const createValue = useCreateNewValue()
  const addValueFormik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: yup.object({
      value: yup.string().required("value is required"),
    }),
    onSubmit: (values) => {
        createValue.callFuntion(values)
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
            Add
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
            no values learned from this course
          </Typography>
        ) : undefined}
        {course.values.map((value) => (
            <ValueCard key={value.id} value={value}/>
        ))}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: addValueFormik.handleSubmit
        }}
      >
        <DialogTitle>add new value</DialogTitle>
        <DialogContent>
          <DialogContentText>
            add value learned from course in the folowing input,you can cancel
            the operation by clicking away of dialog or on cancel button
          </DialogContentText>
          <FormControl sx={{mt : 2}} fullWidth>
            <InputLabel>Vlaue</InputLabel>
            <OutlinedInput
              type="text"
              label="Vlaue"
              name="value"
              onChange={addValueFormik.handleChange}
              value={addValueFormik.values.value}
              error={addValueFormik.touched.value && addValueFormik.errors.value}
              onBlur={addValueFormik.handleBlur}
            />
            {addValueFormik.touched.value && addValueFormik.errors.value && (
              <FormHelperText error>{addValueFormik.errors.value}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            addValueFormik.handleReset()
            }} variant="outlined" color="error" disabled={createValue.isPending}>Cancel</Button>
          <LoadingButton loading={createValue.isPending}  type="submit" variant="contained">Create</LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ValuesOfCourseTab;
