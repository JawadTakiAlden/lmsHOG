import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import TableWrapper from "../../../../components/TableWrapper";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useGetAccounts from "../../../../api/useGetAccounts";
import { Delete, Refresh, Send } from "@mui/icons-material";
import Swicther from "../../../../components/Switcher";
import useSwitchBlockedStatus from "../../../../api/useSwitchBlockedStatus";
import Transition from "../../../../components/Transition";
import { LoadingButton } from "@mui/lab";
import useDeleteAccountMutation from "../../../../api/useDeleteAccountMutation";
import { useTranslation } from "react-i18next";

const AllAccounts = () => {
  const { data, isError, isLoading, isRefetching, refetch } = useGetAccounts();
  const switchermutate = useSwitchBlockedStatus(refetch);
  const [open, setOpen] = React.useState({
    status: false,
    row: null,
  });
  const { t , i18n} = useTranslation();

  const handleClickOpen = (id) => {
    setOpen({ row: id, status: true });
  };

  const handleClose = () => {
    setOpen({ row: null, status: false });
  };

  const deleteAccount = useDeleteAccountMutation({
    user_id: open.row,
    handleClose,
  });

  const deleteAccountHandler = () => {
    deleteAccount.callFuntion();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: t("accounts.account_list.headers.full_name"),
      },
      {
        accessorKey: "phone",
        header: t("accounts.account_list.headers.phone"),
      },
      {
        accessorKey: "type",
        header: t("accounts.account_list.headers.type"),
        editVariant: "select",
        editSelectOptions: ["student", "teacher", "admin"],
        Cell: ({ row }) => {
          return (
            <Typography
              sx={{
                backgroundColor:
                  row.original.type === "admin"
                    ? "#f56"
                    : row.original.type === "teacher"
                    ? "#239"
                    : "#91b",
                color: "white",
                textTransform: "capitalize",
                borderRadius: "12px",
                width: "fit-content",
                px: 3,
              }}
            >
              {row.original.type}
            </Typography>
          );
        },
      },
      {
        accessorKey: "is_blocked",
        header: t("accounts.account_list.headers.is_blocked"),
        editVariant: "select",
        editSelectOptions: ["true", "false"],
        Cell: ({ row }) => {
          return (
            <Swicther
              originalRow={row.original}
              checkedAttribute={"is_blocked"}
              switchermutate={switchermutate}
            />
          );
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: data?.data?.data || [],
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    enableRowActions: true,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              handleClickOpen(row.original.id);
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });
  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
        }}
      >
        <TableWrapper>
          <MaterialReactTable table={table} />
        </TableWrapper>
      </Box>
      <Dialog
        open={open.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {t("accounts.dialogs.delete_account.dialog_title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("accounts.dialogs.delete_account.dialog_content_text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            {t("accounts.dialogs.delete_account.disagree_btn")}
          </Button>
          <LoadingButton
            loading={deleteAccount.isPending}
            loadingPosition="start"
            startIcon={<Send />}
            color="success"
            variant="contained"
            sx={{ borderRadius: "12px" }}
            onClick={deleteAccountHandler}
          >
            {t("accounts.dialogs.delete_account.accept_btn")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllAccounts;
