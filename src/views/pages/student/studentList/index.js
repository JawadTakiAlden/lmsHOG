import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import useGetStudentList from "../../../../api/useGetStudentList";
import { Refresh } from "@mui/icons-material";
import useSwitchBlockedStatus from "../../../../api/useSwitchBlockedStatus";
import Swicther from "../../../../components/Switcher";
import StudentDetialPanel from "./studentDetialPanel";
import TableWrapper from "../../../../components/TableWrapper";
import { useTranslation } from "react-i18next";
import { MRT_Localization_AR } from "material-react-table/locales/ar";
import { MRT_Localization_EN } from "material-react-table/locales/en";

const StudentList = () => {
  const { data, isLoading, isError, isRefetching, refetch } =
    useGetStudentList();
  const switchermutate = useSwitchBlockedStatus(refetch);
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "full_name",
        header: t("students.student_list.headers.full_name"),
      },
      {
        accessorKey: "phone",
        header: t("students.student_list.headers.phone"),
      },
      {
        accessorKey: "is_blocked",
        header: t("students.student_list.headers.is_blocked"),
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
    ];
  }, []);
  const table = useMaterialReactTable({
    columns,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: t("students.student_list.table.error_message"),
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    enableColumnOrdering: true,
    renderDetailPanel: ({ row }) => {
      return <StudentDetialPanel originalRow={row.original} />;
    },
    data: data?.data?.data || [],
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "32px",
        }}
      >
        {t("students.student_list.main_header.keyword")}
      </Typography>
      <TableWrapper>
        <MaterialReactTable table={table} />
      </TableWrapper>
    </Box>
  );
};

export default StudentList;
