import { Box, Button, IconButton, Link, Tooltip, lighten } from "@mui/material";
import React, { useMemo, useState } from "react";
import TableWrapper from "../../../../components/TableWrapper";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Refresh, SettingsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetQuestion from "../../../../api/useGetQuestion";
import CreateQuizModel from "./CreateQuizModel";
import AddToPreExistingQuizModel from "./AddToPreExistingQuizModel";
import { useTranslation } from "react-i18next";

const QuestionsList = () => {
  const questionsList = useGetQuestion();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [openAddToPre, setOpenAddToPre] = useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddToPreClickOpen = () => {
    setOpenAddToPre(true);
  };

  const handleAddToPreClose = () => {
    setOpenAddToPre(false);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("questions.questions_list.headers.id"),
        size: 50,
      },
      {
        accessorKey: "title",
        header: t("questions.questions_list.headers.title"),
        size: 150,
      },
      {
        accessorKey: "image",
        header: t("questions.questions_list.headers.image"),
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
        header: t("questions.questions_list.headers.clarification_text"),
        size: 150,
      },
      {
        accessorKey: "clarification_image",
        header: t("questions.questions_list.headers.clarification_image"),
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
  const table = useMaterialReactTable({
    columns,
    data: questionsList?.data?.data?.data || [],
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
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  color="secondary"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={handleAddToPreClickOpen}
                  variant="contained"
                >
                  {t("questions.questions_list.buttons.add_to_pre_btn")}
                </Button>
                <Button
                  color="primary"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  {t("questions.questions_list.buttons.create_new_btn")}
                </Button>
              </Box>
            </Box>
          </Box>
          <CreateQuizModel
            open={open}
            handleClose={handleClose}
            table={table}
          />
          <AddToPreExistingQuizModel
            open={openAddToPre}
            handleClose={handleAddToPreClose}
            table={table}
          />
        </>
      );
    },
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={questionsList.refetch}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    muiToolbarAlertBannerProps: questionsList.isError
      ? {
          color: "error",
          children: questionsList?.error?.response
            ? questionsList?.error?.response?.data?.message
            : "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="settings">
          <IconButton
            onClick={() => navigate(`/details/question/${row.original.id}`)}
          >
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: questionsList.isLoading,
      showAlertBanner: questionsList.isError,
      showProgressBars: questionsList.isRefetching,
    },
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

export default QuestionsList;
