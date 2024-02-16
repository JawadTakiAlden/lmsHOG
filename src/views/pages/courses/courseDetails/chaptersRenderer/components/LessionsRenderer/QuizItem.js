import {
    Delete,
    DeleteOutlined,
    EditOutlined,
    InfoOutlined,
    LockOutlined,
    MoreOutlined,
    PictureAsPdfOutlined,
    QuizOutlined,
    VideoFileOutlined,
  } from "@mui/icons-material";
  import { LoadingButton } from "@mui/lab";
  import {
    Box,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
    useTheme,
  } from "@mui/material";
  import React, { useState } from "react";
  import Transition from "../../../../../../../components/BottomTranstion";
  import useDeleteLesion from "../../../../../../../api/useDeleteLesion";
  import UpdateLesionForm from "./UpdateLesionForm";
import { useNavigate } from "react-router";
import useRemoveQuizFromChapter from "../../../../../../../api/useRemoveQuizFromChapter";

const QuizItem = ({quiz , last}) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const navigate = useNavigate()

  const handelContentToggle = () => {
    setContentOpen(prev => !prev);
  };

  const handelDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handelDeleteClose = () => {
    setDeleteOpen(false);
  };

  const deleteQuizFromChapter = useRemoveQuizFromChapter({
    quiz_id: quiz.id_from_pivot,
    handelClose: handelDeleteClose,
  });
  return (
    <>
      <Box
        sx={{
          py: 2,
          borderBottom: !last ? "1px solid #CCCCCC" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ListItem sx={{cursor : 'pointer'}} onClick={handelContentToggle}>
            <ListItemIcon>
              <QuizOutlined />
            </ListItemIcon>
            <ListItemText
              sx={{
                textTransform: "capitalize",
              }}
            >
              {quiz.title}
            </ListItemText>
          </ListItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Tooltip title={"remove"}>
              <IconButton onClick={handelDeleteClick} color="error">
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Collapse in={contentOpen}>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>Description : {quiz.description || 'no description'}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>Total Questions : {quiz.number_of_questions}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>Visible Questions : {quiz.number_of_visible_question}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>Invisible Questions : {quiz.number_of_invisible_question}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MoreOutlined />
              </ListItemIcon>
              <ListItemButton
                onClick={() => {
                    navigate(`/details/quiz/${quiz.id}`)
                }}
              >
                See More
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </Box>
      <Dialog
        open={deleteOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelDeleteClose}
      >
        <DialogTitle>Delete Quiz Confirmtion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure you want to delete this quiz
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handelDeleteClose}
            disabled={deleteQuizFromChapter.isPending}
            color="error"
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={deleteQuizFromChapter.isPending}
            loadingPosition="start"
            startIcon={<DeleteOutlined />}
            color="success"
            variant="contained"
            sx={{ borderRadius: "12px" }}
            onClick={() => {
                deleteQuizFromChapter.callFunction();
            }}
          >
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default QuizItem