import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useDeleteCourse from "../../../../api/useDeleteCourse";
import { LoadingButton } from "@mui/lab";

const DeleteTab = ({ data }) => {
  const deleteCourse = useDeleteCourse()
  const [open, setOpen] = React.useState(false);
  const [courseName , setCourseName] = useState("")

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
        py: 3,
        px: 2,
      }}
    >
      <Typography
        sx={{
          color: "#C10000",
          fontFamily: "Hacen Tunisia",
          fontSize: "28px",
          fontWeight: "400",
          textAlign: "center",
          mb: 2,
        }}
      >
        When You Click On Delete Course Curriculum Will Be Deleted And This
        Action Cannot Be Undone
      </Typography>
      <Typography
        sx={{
          color: "#8D8D8D",
          fontSize: "20px",
          mx: "auto",
          maxWidth: "800px",
          textAlign: "center",
          mb: 2,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{
            mx: "auto",
          }}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      </Box>
    </Box>
    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            deleteCourse.callFuntion()
          },
        }}
      >
        <DialogTitle>Delete Course {data.name}</DialogTitle>
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
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
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
            disabled={courseName !== data.name} 
            loading={deleteCourse.isPending}
            type="submit"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTab;
