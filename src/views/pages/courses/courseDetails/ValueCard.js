import { DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import useDeleteValue from "../../../../api/useDeleteValue";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const ValueCard = ({ value }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteValue = useDeleteValue(value.id, handleClose);
  return (
    <Fragment>
      <Box
        sx={{
          py: 1,
          px: 2,
          my: 2,
          boxShadow: "1px 1px 10px -5px #000000aa",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>{value.value}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
          }}
        >
          <IconButton onClick={handleClickOpen} color="error">
            <DeleteOutlined />
          </IconButton>
        </Box>
      </Box>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>
          {t("courses.detaisl.values_tab.value_card.dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("courses.detaisl.values_tab.value_card.dialog.desc")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            disabled={deleteValue.isPending}
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            {t("courses.detaisl.values_tab.value_card.dialog.cancel_btn")}
          </Button>
          <LoadingButton
            loading={deleteValue.isPending}
            onClick={() => deleteValue.callFuntion()}
            variant="contained"
            color="primary"
            autoFocus
          >
            {t("courses.detaisl.values_tab.value_card.dialog.accept_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ValueCard;
