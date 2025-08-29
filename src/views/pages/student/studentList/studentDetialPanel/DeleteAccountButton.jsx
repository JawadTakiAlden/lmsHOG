import { DeleteOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Transition from "../../../../../components/Transition";
import useDeleteAccountMutation from "../../../../../api/useDeleteAccountMutation";

const DeleteAccountButton = ({ userID }) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteAccount = useDeleteAccountMutation({
    user_id: userID,
    handleClose,
  });
  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        size="large"
        sx={{
          mb: 2,
        }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {t("accounts.dialogs.delete_account.dialog_title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("accounts.dialogs.delete_account.dialog_content_text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            {t("accounts.dialogs.delete_account.disagree_btn")}
          </Button>
          <LoadingButton
            startIcon={<DeleteOutlined />}
            variant="contained"
            color="primary"
            onClick={() => {
              deleteAccount.callFuntion();
            }}
            loading={deleteAccount.isPending}
          >
            {t("accounts.dialogs.delete_account.accept_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAccountButton;
