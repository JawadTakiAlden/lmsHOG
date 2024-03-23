import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteQuestion from "../../../../api/useDeleteQuestion";
import { LoadingButton } from "@mui/lab";
import { CancelOutlined } from "@mui/icons-material";
import Transition from "../../../../components/Transition";
import { useTranslation } from "react-i18next";

const DeleteTab = () => {
  const deleteQuestions = useDeleteQuestion();
  const [open, setOpen] = useState(false);
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
          {t("questions.question_detials.delete_tab.h1")}
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {t("questions.question_detials.delete_tab.desc")}
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
            Delete
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {t("questions.question_detials.delete_tab.dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("questions.question_detials.delete_tab.dialog.text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            startIcon={<CancelOutlined />}
            disabled={deleteQuestions.isPending}
            variant="outlined"
          >
            {t("questions.question_detials.delete_tab.cancel_btn")}
          </Button>
          <LoadingButton
            loading={deleteQuestions.isPending}
            onClick={deleteQuestions.callFuntion}
            color="error"
            variant="contained"
          >
            {t("questions.question_detials.delete_tab.delete_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTab;
