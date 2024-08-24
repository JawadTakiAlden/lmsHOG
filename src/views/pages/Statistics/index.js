import { ArrowBackOutlined, InfoOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useResetStatistics from "../../../api/useResetStatistics";
import { useTranslation } from "react-i18next";

const ResetPage = () => {
  const navigate = useNavigate();
  const resetStatistics = useResetStatistics();
  const [open, setOpen] = useState(false);
  const [resetConfiramtionMessage, setResetConfiramtionMessage] = useState("");
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
          p: 3,
        }}
      >
        <IconButton sx={{ mb: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackOutlined />
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
          }}
        >
          {t("reset.h1")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          {t("reset.h2")}
        </Typography>

        <List
          sx={{
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText>{t("reset.list.1")}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoOutlined />
            </ListItemIcon>
            <ListItemText>{t("reset.list.2")}</ListItemText>
          </ListItem>
        </List>
        <Typography
          sx={{
            color: "#660000",
            borderRadius: "12px",
            border: "1px solid #110000",
            textAlign: "center",
            p: 2,
            mb: 2,
          }}
        >
          {t("reset.note")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="warning"
            size="large"
            variant="contained"
            onClick={handleClickOpen}
          >
            {t("reset.reset_btn")}
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
            resetStatistics.callFunction();
          },
        }}
      >
        <DialogTitle>{t("reset.dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("reset.dialog.text")}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => setResetConfiramtionMessage(e.target.value)}
            value={resetConfiramtionMessage}
            label={t("reset.dialog.input_label")}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("reset.dialog.cancel_btn")}</Button>
          <LoadingButton
            color="error"
            disabled={
              resetConfiramtionMessage !== t("reset.dialog.input_label")
            }
            loading={resetStatistics.isPending}
            type="submit"
          >
            {t("reset.dialog.reset_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetPage;
