import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Transition from "../../../../../components/Transition";
import { LoadingButton } from "@mui/lab";
import useResetDeviceID from "../../../../../api/useResetDeviceID";

const ResetDeviceToken = ({ userID }) => {
  const [open, setOpen] = useState(false);

  const resetDeviceIDHandler = useResetDeviceID();

  const handelClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          px: 2,
        }}
      >
        <Button onClick={handelClickOpen} variant="contained" color="warning">
          Reset Device ID
        </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle>Reset Device ID</DialogTitle>

        <DialogContent>
          <DialogContentText>
            if the account is not reachible beacuse the student change his
            device or something elese , you can reset the device id connected
            with this account , by doing that the device will be loged out and
            should login in from the new deivce
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            cancel
          </Button>
          <LoadingButton
            loading={resetDeviceIDHandler.isPending}
            loadingPosition="start"
            onClick={async () => {
              await resetDeviceIDHandler.mutateAsync({
                user: userID,
              });
              handleClose();
            }}
            color="success"
            variant="contained"
          >
            Reset
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetDeviceToken;
