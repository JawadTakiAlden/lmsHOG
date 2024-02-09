import React, { useState } from 'react'
import useDeleteCategory from '../../../../api/useDeleteCategory';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const DeleteTab = ({data}) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const deleteCategory = useDeleteCategory()
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
          this place is danger you can delete this category from here take care
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
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            deleteCategory.callFuntion()
          },
        }}
      >
        <DialogTitle>Delete Category {data.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            take care about this process , this action can't be undone and all realated data with this course will be deleted,
            <br/> write course name in field to delete the course
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            label="Course Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            color="error"
            disabled={categoryName !== data.name} 
            loading={deleteCategory.isPending}
            type="submit"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteTab