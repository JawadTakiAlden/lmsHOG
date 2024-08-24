import {
  CancelOutlined,
  CheckOutlined,
  Delete,
  DeleteOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
  X,
} from "@mui/icons-material";
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
import useSwicthChoiceVisiblity from "../../../../api/useSwicthChoiceVisiblity";
import useSwitchTrueStatusOfChoice from "../../../../api/useSwitchTrueStatusOfChoice";
import { useTranslation } from "react-i18next";

const ChoiceCard = ({ choice, withAction = false }) => {
  const [open, setOpen] = React.useState(false);
  const switchVisibility = useSwicthChoiceVisiblity(choice.id);
  const switchTrueStatus = useSwitchTrueStatusOfChoice(choice.id);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteChoice = useDeleteChoice({
    handleClose: handleClose,
    choice_id: choice.id,
  });
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
            <LoadingButton
              color={choice.is_visible ? "success" : "warning"}
              variant="contained"
              size="small"
              onClick={switchVisibility.callFunction}
              loading={switchVisibility.isPending}
              startIcon={
                choice.is_visible ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )
              }
            >
              {choice.is_visible
                ? t("questions.question_detials.choice_card.visible")
                : t("questions.question_detials.choice_card.hidden")}
            </LoadingButton>
            <LoadingButton
              color={choice.is_true ? "success" : "warning"}
              variant="contained"
              size="small"
              onClick={switchTrueStatus.callFunction}
              loading={switchTrueStatus.isPending}
              startIcon={choice.is_true ? <CheckOutlined /> : <X />}
            >
              {choice.is_true
                ? t("questions.question_detials.choice_card.true")
                : t("questions.question_detials.choice_card.false")}
            </LoadingButton>
          </CardActions>
        )}
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {t("questions.question_detials.choice_card.dialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("questions.question_detials.choice_card.dialog.text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            startIcon={<CancelOutlined />}
            disabled={deleteChoice.isPending}
            variant="outlined"
          >
            {t("questions.question_detials.choice_card.dialog.cancel_btn")}
          </Button>
          <LoadingButton
            startIcon={<DeleteOutlined />}
            loading={deleteChoice.isPending}
            onClick={deleteChoice.callFuntion}
            color="success"
            variant="contained"
          >
            {t("questions.question_detials.choice_card.dialog.accept_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChoiceCard;
