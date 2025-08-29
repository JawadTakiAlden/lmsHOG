import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteCourse from "../../../../api/useDeleteCourse";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const DeleteTab = ({ data }) => {
  const deleteCourse = useDeleteCourse();
  const [open, setOpen] = React.useState(false);
  const [courseName, setCourseName] = useState("");
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          boxShadow: "inset 1px 1px 10px -6px #888",
          // borderRadius : '10px',
          overflow: "hidden",
          my: 2,
        }}
      >
        <Typography
          sx={{
            color: "#cc0011",
            border: "1px solid #cc0011",
            p: 2,
            mb: 2,
            textTransform: "capitalize",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          {t("courses.detaisl.delete_tab.h1")}
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {t("courses.detaisl.delete_tab.desc")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Button onClick={handleClickOpen} color="error" variant="contained">
            {t("courses.detaisl.delete_tab.delete_btn")}
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            deleteCourse.callFuntion();
          },
        }}
      >
        <DialogTitle>
          {t("courses.detaisl.delete_tab.dialog.title")} {data.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("courses.detaisl.delete_tab.dialog.text")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
            label={t("courses.detaisl.delete_tab.dialog.input_label")}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("courses.detaisl.delete_tab.dialog.cancel_btn")}
          </Button>
          <LoadingButton
            color="error"
            disabled={courseName !== data.name}
            loading={deleteCourse.isPending}
            type="submit"
          >
            {t("courses.detaisl.delete_tab.dialog.create_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTab;
