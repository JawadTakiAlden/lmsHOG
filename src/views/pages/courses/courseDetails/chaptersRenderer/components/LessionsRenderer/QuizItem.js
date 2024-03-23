import {
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
  MoreOutlined,
  QuizOutlined,
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
} from "@mui/material";
import React, { useState } from "react";
import Transition from "../../../../../../../components/BottomTranstion";
import { useNavigate } from "react-router";
import useRemoveQuizFromChapter from "../../../../../../../api/useRemoveQuizFromChapter";
import { useTranslation } from "react-i18next";
import UpdateQuizFrom from "./UpdateQuizFrom";

const QuizItem = ({ quiz, last }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handelContentToggle = () => {
    setContentOpen((prev) => !prev);
  };

  const handelDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handelEditToggel = () => {
    setEditOpen((prev) => !prev);
  };

  const handelEditClose = () => {
    setEditOpen(false);
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
          <ListItem sx={{ cursor: "pointer" }} onClick={handelContentToggle}>
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
            <IconButton onClick={handelDeleteClick} color="error">
              <DeleteOutlined />
            </IconButton>
            <IconButton onClick={handelEditToggel} color="primary">
              <EditOutlined />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={editOpen}>
          <UpdateQuizFrom quiz={quiz} handelEditClose={handelEditClose} />
        </Collapse>
        <Collapse in={contentOpen}>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.list.1"
                )}{" "}
                : {quiz.description || "no description"}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.list.2"
                )}{" "}
                : {quiz.number_of_questions}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.list.3"
                )}{" "}
                : {quiz.number_of_visible_question}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.list.4"
                )}{" "}
                : {quiz.number_of_invisible_question}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MoreOutlined />
              </ListItemIcon>
              <ListItemButton
                onClick={() => {
                  navigate(`/details/quiz/${quiz.id}`);
                }}
              >
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.list.5"
                )}
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
        <DialogTitle>
          {t(
            "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.dialog.title"
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.dialog.text"
            )}
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
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.dialog.cancel_btn"
            )}
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
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.quiz_item.dialog.accept_btn"
            )}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuizItem;
