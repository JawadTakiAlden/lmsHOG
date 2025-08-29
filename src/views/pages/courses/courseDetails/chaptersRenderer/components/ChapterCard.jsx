import {
  Delete,
  DeleteOutlined,
  EditOffOutlined,
  MenuBookOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import useDeleteChapter from "../../../../../../api/useDeleteChapter";
import BottomTranstion from "../../../../../../components/BottomTranstion";
import { LoadingButton } from "@mui/lab";
import LessionsRenderer from "./LessionsRenderer";
import AddLesionForm from "./AddLesionForm";
import UpdateChapterForm from "./UpdateChapterForm";
import { Collapse } from "@mui/material";
import AddQuizForm from "./AddQuizForm";
import { useTranslation } from "react-i18next";

const ChapterCard = ({ chapter }) => {
  const [openContent, setOpenContent] = useState(false);
  const [openDeleteChapter, setOpenDeleteChapter] = useState(false);
  const [addLesionFormOpen, setAddLesionFormOpen] = useState(false);
  const [addQuizFormOpen, setAddQuizFormOpen] = useState(false);
  const [updateChapter, setUpdateChapter] = useState(false);
  const {t} = useTranslation()

  const handleUpdateChapterToggle = () => {
    setUpdateChapter((prev) => !prev);
  };

  const handleUpdateChapterClose = () => {
    setUpdateChapter(false);
  };
  const handleAddQuizClose = () => {
    setAddQuizFormOpen(false);
  };

  const handleAddLesionOpenClick = () => {
    setAddLesionFormOpen(true);
    handleAddQuizClose()
  };

  const handleAddLesionClose = () => {
    setAddLesionFormOpen(false);
  };
  const handleAddQuizOpenClick = () => {
    setAddQuizFormOpen(true);
    handleAddLesionClose()
  };

  

  const handelClickDeleteChapter = () => {
    setOpenDeleteChapter(true);
  };

  const handleCloseDeleteChapter = () => {
    setOpenDeleteChapter(false);
  };

  const deleteChapter = useDeleteChapter(handleCloseDeleteChapter);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0794EB0A",
          borderRadius: "15px",
          mt: 2,
          px: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "70px",
            flexWrap: "wrap",
            py: 1,
          }}
        >
          <ListItem
            onClick={() => {
              setOpenContent((prev) => !prev);
            }}
            sx={{ width: "fit-content", cursor: "pointer" }}
          >
            <ListItemIcon>
              <MenuBookOutlined color="primary" />
            </ListItemIcon>
            <ListItemText>{chapter.name}</ListItemText>
          </ListItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <IconButton onClick={handelClickDeleteChapter}>
              <DeleteOutlined color="error" />
            </IconButton>
            <IconButton onClick={handleUpdateChapterToggle}>
              <EditOffOutlined color="primary" />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={updateChapter}>
          <UpdateChapterForm
            handelClose={handleUpdateChapterClose}
            chapter={chapter}
          />
        </Collapse>
        <Collapse in={openContent}>
          <Box
            sx={{
              display : 'flex',
              alignItems : 'center',
              gap : '10px'
            }}
          >
            <Button onClick={handleAddLesionOpenClick} variant="contained">
              {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.buttons.1')}
            </Button>
            <Button onClick={handleAddQuizOpenClick} variant="contained">
            {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.buttons.2')}
            </Button>
          </Box>
          <Collapse in={addLesionFormOpen}>
            <AddLesionForm
              chapter={chapter}
              handelClose={handleAddLesionClose}
            />
          </Collapse>
          <Collapse in={addQuizFormOpen}>
            <AddQuizForm
              chapter={chapter}
              handelClose={handleAddQuizClose}
            />
          </Collapse>
          <LessionsRenderer lesions={chapter.lesions} quizzes={chapter.quizzes} />
        </Collapse>
      </Box>

      <Dialog
        open={openDeleteChapter}
        TransitionComponent={BottomTranstion}
        keepMounted
        onClose={handleCloseDeleteChapter}
        aria-describedby="delete-chapter"
      >
        <DialogTitle>{t('courses.detaisl.details_tab.chapter_renderer.chapter_card.dialog.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.dialog.text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteChapter}
            disabled={deleteChapter.isPending}
            color="error"
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.buttons.3')}
          </Button>
          <LoadingButton
            loading={deleteChapter.isPending}
            loadingPosition="start"
            startIcon={<Delete />}
            color="success"
            variant="contained"
            sx={{ borderRadius: "12px" }}
            onClick={() => {
              deleteChapter.callFuntion({ chapter_id: chapter.id });
            }}
          >
            {t('courses.detaisl.details_tab.chapter_renderer.chapter_card.buttons.4')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChapterCard;
