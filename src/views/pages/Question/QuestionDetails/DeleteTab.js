import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import useDeleteQuestion from '../../../../api/useDeleteQuestion';
import { LoadingButton } from '@mui/lab';
import { CancelOutlined, DeleteOutlined } from '@mui/icons-material';
import Transition from '../../../../components/Transition';

const DeleteTab = () => {
    const deleteQuestions = useDeleteQuestion()
    const [open, setOpen] = useState(false);
  
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
          Dnager Area
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            textAlign: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          this place is danger you can delete this question from here take care
          about this action , all data realted with this category will be lost
          when you delete this category
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
              Delete
            </Button>
          </Tooltip>
        </Box>
      </Box>
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
          <Button onClick={handleClose} color="error" startIcon={<CancelOutlined />} disabled={deleteQuestions.isPending} variant="outlined">Disagree</Button>
          <LoadingButton startIcon={<DeleteOutlined />} loading={deleteQuestions.isPending} onClick={deleteQuestions.callFuntion}  color="success" variant="contained">Agree</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteTab