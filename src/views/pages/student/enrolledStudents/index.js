import {
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import useGetAllInroled from "../../../../api/useGetAllInroled";
import TableWrapper from "../../../../components/TableWrapper";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Cancel, Details, Refresh } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router";
import SimpleAlterPopup from "../../../../components/SimpleAlterPopup/SimpleAlterPopup";
import useCancelInroll from "../../../../api/useCancelInroll";
import { useTranslation } from "react-i18next";
import useGetCourses from "../../../../api/useGetCourses";

const EnrolledStudents = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetAllInroled();
  const navigate = useNavigate();
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  const { t } = useTranslation();
  const courses = useGetCourses();

  const handleClickCancelOpen = () => {
    setCancelOpen(true);
  };

  const handleCancelClose = () => {
    setCancelOpen(false);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "course_title",
        header: t("students.enrolled_students.headers.course_title"),
        filterVariant: "select",
        filterSelectOptions:
          courses?.data?.data?.data?.map((course) => course.name) || [],
      },
      {
        accessorKey: "name",
        header: t("students.enrolled_students.headers.name"),
      },
      {
        accessorKey: "phone",
        header: t("students.enrolled_students.headers.phone"),
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.enrole_date),
        id: "enrole_date",
        header: t("students.enrolled_students.headers.enrole_date"),
        filterVariant: "datetime-range",
        Cell: ({ cell }) =>
          `${cell.getValue().toLocaleDateString()} ${cell
            .getValue()
            .toLocaleTimeString()}`,
      },
    ],
    [courses.isLoading]
  );
  const table = useMaterialReactTable({
    columns: columns,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: error?.response
            ? error.response.data.message
            : "Error Loading Data",
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title={t("public.table.tooltip.refresh")}>
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    enableHiding: false,
    enableDensityToggle: false,
    enableRowActions: true,
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/dashboard/courses/show/${row.original.id}`);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Details color="primary" />
        </ListItemIcon>
        {t("students.enrolled_students.actions.show_course")}
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          setClickedRow(row.original.id);
          handleClickCancelOpen();
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Cancel color="error" />
        </ListItemIcon>
        {t("students.enrolled_students.actions.cancel_enroll")}
      </MenuItem>,
    ],
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "transparent",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        boxShadow: "none",
      },
    },
    enableFullScreenToggle: false,
    paginationDisplayMode: "pages",
    data: data?.data?.data || [],
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });
  return (
    <>
      <Box>
        <TableWrapper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MaterialReactTable table={table} />
          </LocalizationProvider>
        </TableWrapper>
      </Box>
      <SimpleAlterPopup
        title={t("students.enrolled_students.dialogs.cancel_enrollement.title")}
        alterDescreption={t(
          "students.enrolled_students.dialogs.cancel_enrollement.text"
        )}
        open={cancelOpen}
        handleClose={handleCancelClose}
        mutateQuery={useCancelInroll}
        refetch={refetch}
        mutateOptions={{
          inrolment_id: clickedRow,
        }}
      />
    </>
  );
};

export default EnrolledStudents;
