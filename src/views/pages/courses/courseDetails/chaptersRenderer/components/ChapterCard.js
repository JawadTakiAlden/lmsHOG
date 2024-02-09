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
import React, { useEffect, useRef, useState } from "react";
import useDeleteChapter from "../../../../../../api/useDeleteChapter";
import BottomTranstion from "../../../../../../components/BottomTranstion";
import { LoadingButton } from "@mui/lab";
import LessionsRenderer from "./LessionsRenderer";
import AddLesionForm from "./AddLesionForm";
import UpdateChapterForm from "./UpdateChapterForm";
import { Collapse } from "@mui/material";

const ChapterCard = ({ chapter }) => {
  const [openContent, setOpenContent] = useState(false);
  const [openDeleteChapter, setOpenDeleteChapter] = useState(false);
  const [addLesionFormOpen, setAddLesionFormOpen] = useState(false);
  const [updateChapter, setUpdateChapter] = useState(false);

  const handleUpdateChapterToggle = () => {
    setUpdateChapter((prev) => !prev);
  };

  const handleUpdateChapterClose = () => {
    setUpdateChapter(false);
  };

  const handleAddLesionOpenClick = () => {
    setAddLesionFormOpen(true);
  };

  const handleAddLesionClose = () => {
    setAddLesionFormOpen(false);
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
          <Box>
            <Button onClick={handleAddLesionOpenClick} variant="contained">
              add lesion
            </Button>
          </Box>
          <Collapse in={addLesionFormOpen}>
            <AddLesionForm
              chapter={chapter}
              handelClose={handleAddLesionClose}
            />
          </Collapse>
          <LessionsRenderer lesions={chapter.lesions} />
        </Collapse>
      </Box>

      <Dialog
        open={openDeleteChapter}
        TransitionComponent={BottomTranstion}
        keepMounted
        onClose={handleCloseDeleteChapter}
        aria-describedby="delete-chapter"
      >
        <DialogTitle>Delete Chapter Confirmtion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure you want to delete this chapter
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
            Cancel
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
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChapterCard;
