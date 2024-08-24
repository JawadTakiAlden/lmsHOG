import React, { useMemo } from "react";
import useGetUsersInsideOfCourse from "../../../../api/useGetUsersInsideOfCourse";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import TableWrapper from "../../../../components/TableWrapper";
import { useTranslation } from "react-i18next";

const StudentTab = () => {
  const { t } = useTranslation();
  const usersInsideOfCourse = useGetUsersInsideOfCourse();
  const columns = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: t("courses.detaisl.student_tab.labels.full_name"),
      },
      {
        accessorKey: "phone",
        header: t("courses.detaisl.student_tab.labels.phone"),
      },
      {
        accessorFn: (row) => (row.is_blocked ? "True" : "False"),
        header: t("courses.detaisl.student_tab.labels.is_blocked"),
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    data: usersInsideOfCourse?.data?.data?.data || [],
    columns,
    enableColumnOrdering: true,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title={t("public.table.tooltip.refresh")}>
        <IconButton onClick={() => usersInsideOfCourse.refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    muiToolbarAlertBannerProps: usersInsideOfCourse.isError
      ? {
          color: "error",
          children: usersInsideOfCourse?.error?.response?.message,
        }
      : undefined,
    state: {
      isLoading: usersInsideOfCourse.isLoading,
      showAlertBanner: usersInsideOfCourse.isError,
      showProgressBars: usersInsideOfCourse.isRefetching,
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

export default StudentTab;
