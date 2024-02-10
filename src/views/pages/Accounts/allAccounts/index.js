import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { gridSpacing } from "../../../../constant";
import TableWrapper from "../../../../components/TableWrapper";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useGetAccounts from "../../../../api/useGetAccounts";
import { Delete, Edit, Refresh, Send } from "@mui/icons-material";
import Swicther from "../../../../components/Switcher";
import useSwitchBlockedStatus from "../../../../api/useSwitchBlockedStatus";
import Transition from "../../../../components/Transition";
import { LoadingButton } from "@mui/lab";
import useDeleteAccountMutation from "../../../../api/useDeleteAccountMutation";

const AllAccounts = () => {
  // this hook get all accounts not in student type
  const { data, isError, isLoading, error, isRefetching, refetch } =
    useGetAccounts();
  const switchermutate = useSwitchBlockedStatus(refetch);
  const [open, setOpen] = React.useState({
    status: false,
    row: null,
  });

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
        header: "Full Name",
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
      },
      {
        accessorKey: "type",
        header: "Type",
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
        header: "Blocked Status",
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
        {/* <Tooltip title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip> */}
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
    //   renderRowActionMenuItems: ({ closeMenu , row}) => [
    //     <MenuItem
    //         onClick={() => {
    //             handleClickOpen(row.original.id)
    //             closeMenu()
    //         }}
    //       key={0}
    //       sx={{ m: 0 }}
    //     >
    //       <ListItemIcon >
    //         <Delete color='error' />
    //       </ListItemIcon>
    //       <ListItemText>
    //         Delete Account
    //       </ListItemText>
    //     </MenuItem>,
    //   ],
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
        <Grid container spacing={gridSpacing} direction={"column"}>
          <Grid item xs={12}>
            <TableWrapper>
              <MaterialReactTable table={table} />
            </TableWrapper>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={open.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="delete-account-area"
      >
        <DialogTitle>Delete Account Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-account-area">
            are you sure you want to delete the account fro system this action
            cant be undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            Disagree
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
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllAccounts;
