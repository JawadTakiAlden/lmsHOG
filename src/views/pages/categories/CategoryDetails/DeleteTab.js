import React, { useState } from "react";
import useDeleteCategory from "../../../../api/useDeleteCategory";
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
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const DeleteTab = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const deleteCategory = useDeleteCategory();
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
          {t("categories.detail.deleteTab.h1")}
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {t("categories.detail.deleteTab.desc")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Tooltip title={"delete"}>
            <Button onClick={handleClickOpen} color="error" variant="contained">
              {t("categories.detail.deleteTab.delete_btn")}
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            deleteCategory.callFuntion();
          },
        }}
      >
        <DialogTitle>
          {t("categories.detail.deleteTab.dialog.title")} '{data.name}'
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("categories.detail.deleteTab.dialog.text")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            label={t("categories.detail.deleteTab.dialog.input_label")}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {" "}
            {t("categories.detail.deleteTab.cancel_btn")}
          </Button>
          <LoadingButton
            color="error"
            disabled={categoryName !== data.name}
            loading={deleteCategory.isPending}
            type="submit"
          >
            {t("categories.detail.deleteTab.delete_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTab;
