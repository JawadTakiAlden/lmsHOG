import {
  Delete,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  PictureAsPdfOutlined,
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
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Transition from "../../../../../../../components/BottomTranstion";
import useDeleteLesion from "../../../../../../../api/useDeleteLesion";
import UpdateLesionForm from "./UpdateLesionForm";

const LesionItem = ({ last, lesion }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handelEditToggle = () => {
    setEditOpen((prev) => !prev);
  };
  const handelEditClose = () => {
    setEditOpen(false);
  };

  const handelDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handelDeleteClose = () => {
    setDeleteOpen(false);
  };

  const deleteLesion = useDeleteLesion({
    lesion_id: lesion.id,
    handelClose: handelDeleteClose,
  });

  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          py: 2,
          borderBottom: !last ? "1px solid #CCCCCC" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ListItem>
          <ListItemIcon>
            {lesion?.type === "video" ? (
              <VideoFileOutlined />
            ) : (
              <PictureAsPdfOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            {lesion.title} &#9;{" "}
            {lesion.is_open ? (
              <span style={{ color: theme.palette.primary.main }}>[free]</span>
            ) : (
              <span style={{ color: theme.palette.primary.main }}>
                <LockOutlined />
              </span>
            )}
          </ListItemText>
        </ListItem>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Tooltip title={"delete"}>
            <IconButton onClick={handelDeleteClick} color="error">
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={"edit"}>
            <IconButton onClick={handelEditToggle}>
              <EditOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Collapse in={editOpen}>
      <UpdateLesionForm lesion={lesion} handelClose={handelEditClose} />
      </Collapse>
      <Dialog
        open={deleteOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handelDeleteClose}
      >
        <DialogTitle>Delete Chapter Confirmtion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            are you sure you want to delete this chapter
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handelDeleteClose}
            disabled={deleteLesion.isPending}
            color="error"
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={deleteLesion.isPending}
            loadingPosition="start"
            startIcon={<Delete />}
            color="success"
            variant="contained"
            sx={{ borderRadius: "12px" }}
            onClick={() => {
              deleteLesion.callFuntion();
            }}
          >
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LesionItem;
