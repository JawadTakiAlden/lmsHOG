import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteQuiz from "../../../../api/useDeleteQuiz";
import { useTranslation } from "react-i18next";

const DeleteSection = ({ quiz }) => {
  const deleteQuiz = useDeleteQuiz();
  const [open, setOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
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
          {t("quizzes.quiz_details.delete_section.h1")}
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {t("quizzes.quiz_details.delete_section.desc")}
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
            {t("quizzes.quiz_details.delete_section.delete_btn")}
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
            deleteQuiz.callFuntion();
          },
        }}
      >
        <DialogTitle>
          {t("quizzes.quiz_details.delete_section.dialog.title")} {quiz.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("quizzes.quiz_details.delete_section.dialog.text")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => setQuizTitle(e.target.value)}
            value={quizTitle}
            label={t("quizzes.quiz_details.delete_section.dialog.input_label")}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("quizzes.quiz_details.delete_section.cancel_btn")}
          </Button>
          <LoadingButton
            color="error"
            disabled={quizTitle !== quiz.title}
            loading={deleteQuiz.isPending}
            type="submit"
          >
            {t("quizzes.quiz_details.delete_section.delete_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSection;
