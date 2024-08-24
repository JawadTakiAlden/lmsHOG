import {
  Delete,
  DeleteOutlined,
  DescriptionOutlined,
  EditOutlined,
  InfoOutlined,
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
  List,
  ListItem,
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
import { useTranslation } from "react-i18next";

const LesionItem = ({ last, lesion }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const { t } = useTranslation();

  const handelContentToggle = () => {
    setContentOpen((prev) => !prev);
  };

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
                <span style={{ color: theme.palette.primary.main }}>
                  [
                  {t(
                    "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.free"
                  )}
                  ]
                </span>
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
            <Tooltip
              title={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.delete_tooltip"
              )}
            >
              <IconButton onClick={handelDeleteClick} color="error">
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={t(
                "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.edit_tooltip"
              )}
            >
              <IconButton onClick={handelEditToggle}>
                <EditOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Collapse in={contentOpen}>
          <Typography
            sx={{
              color: "grey",
              mb: 2,
              fontSize: "17px",
              pl: 2,
              lineHeight: "1.6",
            }}
          ></Typography>
          <List>
            <ListItem
              sx={{
                backgroundColor: "#dff1ff",
                borderRadius: "8px",
              }}
            >
              <ListItemIcon>
                <DescriptionOutlined />
              </ListItemIcon>
              <ListItemText>
                {lesion.description || "no description"}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>{lesion.link}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.list.1"
                )}{" "}
                : {lesion.time}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.list.2"
                )}{" "}
                : {lesion.is_visible ? "Visible" : "Invisible"}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                {t(
                  "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.list.3"
                )}{" "}
                : {lesion.is_open ? "Yes" : "No"}
              </ListItemText>
            </ListItem>
          </List>
        </Collapse>
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
        <DialogTitle>
          {t(
            "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.dialog.title"
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.dialog.text"
            )}
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
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.dialog.cancel_btn"
            )}
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
            {t(
              "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.lesion_item.dialog.accept_btn"
            )}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LesionItem;
