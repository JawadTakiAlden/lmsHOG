import {
  CancelSharp,
  CheckCircleOutlined,
  DeleteOutlined,
  SettingsOutlined,
  Visibility,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import {
  Box,
  Link,
  Button,
  Fab,
  IconButton,
  Tooltip,
  lighten,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableWrapper from "../../../../components/TableWrapper";
import Transition from "../../../../components/Transition";
import { LoadingButton } from "@mui/lab";
import useDeleteQuestionFromQuiz from "../../../../api/useDeleteQuestionFromQuiz";
import useHideAndShowQuestionsInsideQuiz from "../../../../api/useHideAndShowQuestionsInsideQuiz";
import { useTranslation } from "react-i18next";

const QuestionInfo = ({ quiz }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const hideQuestions = useHideAndShowQuestionsInsideQuiz();
  const showQuestions = useHideAndShowQuestionsInsideQuiz("show");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteQuestionQuiz = useDeleteQuestionFromQuiz(handleClose);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("quizzes.quiz_details.questions_info.headers.id"),
        size: 50,
      },
      {
        accessorKey: "title",
        header: t("quizzes.quiz_details.questions_info.headers.title"),
        size: 150,
      },
      {
        accessorKey: "questionQuiz.is_visible",
        header: t("quizzes.quiz_details.questions_info.headers.is_visible"),
        Cell: ({ row }) => {
          return row.original.questionQuiz.is_visible ? (
            <Fab color="primary">
              <CheckCircleOutlined />
            </Fab>
          ) : (
            <Fab color="error">
              <CancelSharp />
            </Fab>
          );
        },
        size: 60,
      },
      {
        accessorKey: "image",
        header: t("quizzes.quiz_details.questions_info.headers.image"),
        size: 150,
        Cell: ({ row }) => {
          return (
            <Box>
              <Box
                sx={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={row.original.image}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "fill",
                    borderRadius: "12px",
                  }}
                />
              </Box>
              <Link
                sx={{
                  maxWidth: "100px",
                  wordBreak: "break-word",
                }}
                component={"a"}
                href={row.original.image}
                target="_blank"
              >
                {row.original.image}
              </Link>
            </Box>
          );
        },
      },
      {
        accessorKey: "clarification_text",
        header: t(
          "quizzes.quiz_details.questions_info.headers.clarification_text"
        ),
        size: 150,
      },
      {
        accessorKey: "clarification_image",
        header: t(
          "quizzes.quiz_details.questions_info.headers.clarification_image"
        ),
        size: 150,
        Cell: ({ row }) => {
          return (
            <Box>
              <Box
                sx={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={row.original.clarification_image}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "fill",
                    borderRadius: "12px",
                  }}
                />
              </Box>
              <Link
                sx={{
                  maxWidth: "100px",
                  wordBreak: "break-word",
                }}
                component={"a"}
                href={row.original.clarification_image}
                target="_blank"
              >
                {row.original.clarification_image}
              </Link>
            </Box>
          );
        },
      },
    ],
    []
  );
  const choicesColumns = useMemo(() => [
    {
      accessorKey: "title",
      header: t("quizzes.quiz_details.questions_info.sub_headers.title"),
      size: 150,
    },
    {
      accessorKey: "image",
      header: t("quizzes.quiz_details.questions_info.sub_headers.image"),
      size: 150,
      Cell: ({ row }) => {
        return (
          <Box>
            <Box
              sx={{
                maxWidth: "100px",
                maxHeight: "100px",
                overflow: "hidden",
              }}
            >
              <img
                src={row.original.image}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "fill",
                  borderRadius: "12px",
                }}
              />
            </Box>
            <Link
              sx={{
                maxWidth: "100px",
                wordBreak: "break-word",
              }}
              component={"a"}
              href={row.original.image}
              target="_blank"
            >
              {row.original.image}
            </Link>
          </Box>
        );
      },
    },
    {
      accessorKey: "is_true",
      header: t("quizzes.quiz_details.questions_info.sub_headers.is_true"),
      size: 150,
      Cell: ({ row }) => {
        return row.original.is_true ? (
          <Fab color="primary">
            <CheckCircleOutlined />
          </Fab>
        ) : (
          <Fab color="error">
            <CancelSharp />
          </Fab>
        );
      },
    },
  ]);
  const table = useMaterialReactTable({
    columns,
    data: quiz?.questions || [],
    enableRowSelection: true,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) => {
      return (
        <Box
          sx={{
            maxWidth: "100%",
          }}
        >
          <TableWrapper>
            <MaterialReactTable
              data={row.original.choices}
              columns={choicesColumns}
            />
          </TableWrapper>
        </Box>
      );
    },
    renderTopToolbar: ({ table }) => {
      return (
        <>
          <Box
            sx={(theme) => ({
              backgroundColor: lighten(theme.palette.background.default, 0.05),
              display: "flex",
              gap: "0.5rem",
              p: "8px",
              justifyContent: "space-between",
            })}
          >
            <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {/* import MRT sub-components */}
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <LoadingButton
                  color="primary"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={() => {
                    let dataToSubmit = table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original.questionQuiz.id);
                    showQuestions.callFunction({
                      questionQuizzes: dataToSubmit,
                    });
                  }}
                  variant="contained"
                  loading={showQuestions.isPending}
                  endIcon={<Visibility />}
                >
                  Show
                </LoadingButton>
                <LoadingButton
                  color="warning"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={() => {
                    let dataToSubmit = table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original.questionQuiz.id);
                    hideQuestions.callFunction({
                      questionQuizzes: dataToSubmit,
                    });
                  }}
                  loading={hideQuestions.isPending}
                  variant="contained"
                  endIcon={<VisibilityOffOutlined />}
                >
                  Hide
                </LoadingButton>
                <Button
                  color="error"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={handleClickOpen}
                  variant="contained"
                  endIcon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle>Delete Question From Quiz</DialogTitle>
            <DialogContent>
              <DialogContentText>
                are you sure you want to delete these questions from this quiz
                confirm the action to delete
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                Disagree
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                startIcon={<DeleteOutlined />}
                loading={deleteQuestionQuiz.isPending}
                onClick={() => {
                  let dataToSubmit = table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original.questionQuiz.id);
                  deleteQuestionQuiz.callFuntion({
                    questionQuizzes: dataToSubmit,
                  });
                }}
              >
                Delete
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      );
    },
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title={t("public.table.tooltip.settings")}>
          <IconButton
            onClick={() => navigate(`/details/question/${row.original.id}`)}
          >
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      <TableWrapper>
        <MaterialReactTable table={table} />
      </TableWrapper>
    </Box>
  );
};

export default QuestionInfo;
