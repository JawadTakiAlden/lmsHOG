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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteNews from "../../../../api/useDeleteNews";
import { useTranslation } from "react-i18next";

const DeleteTab = ({ data }) => {
  const deleteNews = useDeleteNews();
  const [open, setOpen] = useState(false);
  const [newsName, setNewsName] = useState("");
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
          {t("news.detail.deleteTab.h1")}
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {t("news.detail.deleteTab.desc")}
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
            {t("news.detail.deleteTab.delete_btn")}
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
            deleteNews.callFuntion();
          },
        }}
      >
        <DialogTitle>
          {t("news.detail.deleteTab.dialog.title")} '
          {data.title || t("news.detail.deleteTab.dialog.input_label")}'
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("news.detail.deleteTab.dialog.text")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => setNewsName(e.target.value)}
            value={newsName}
            label={
              data.title
                ? "News Title"
                : t("news.detail.deleteTab.dialog.input_label")
            }
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("news.detail.deleteTab.cancel_btn")}
          </Button>
          <LoadingButton
            color="error"
            disabled={
              data.title
                ? newsName !== data.title
                : newsName !== t("news.detail.deleteTab.dialog.input_label")
            }
            loading={deleteNews.isPending}
            type="submit"
          >
            {t("news.detail.deleteTab.delete_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTab;
