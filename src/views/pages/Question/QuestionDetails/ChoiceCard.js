import { CancelOutlined, Delete, DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import Transition from "../../../../components/Transition";
import useDeleteChoice from "../../../../api/useDeleteChoice";
import { LoadingButton } from "@mui/lab";

const ChoiceCard = ({ choice, withAction = false }) => {
    const [open, setOpen] = React.useState(false);
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteChoice = useDeleteChoice({handleClose : handleClose , choice_id : choice.id})
  return (
    <>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image={choice.image}
            title={choice.image}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
            {choice.title}
            </Typography>
        </CardContent>
        {withAction && (
            <CardActions>
            <IconButton color="error" onClick={handleClickOpen}>
                <Delete />
            </IconButton>
            </CardActions>
        )}
        </Card>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Delete Choice Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText >
            are you sure that you want to delete this choice , this action can't be undo 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" startIcon={<CancelOutlined />} disabled={deleteChoice.isPending} variant="outlined">Disagree</Button>
          <LoadingButton startIcon={<DeleteOutlined />} loading={deleteChoice.isPending} onClick={deleteChoice.callFuntion}  color="success" variant="contained">Agree</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChoiceCard;
