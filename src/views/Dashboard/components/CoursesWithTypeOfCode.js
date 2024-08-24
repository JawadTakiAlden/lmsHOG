import React, { useMemo } from "react";
import useGetEnrollmentWithTypeOfCodes from "../../../api/useGetEnrollmentWithTypeOfCodes";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Refresh } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const CoursesWithTypeOfCode = () => {
  const getEnrollmentByTypeOfCodes = useGetEnrollmentWithTypeOfCodes();
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: t("dashboard.enrolment_with_codes.labels.name"),
      },
      {
        accessorKey: "total", //normal accessorKey
        header: t("dashboard.enrolment_with_codes.labels.total"),
      },
      {
        accessorKey: "number_single_code_enrolment",
        header: t("dashboard.enrolment_with_codes.labels.count_by_single"),
      },
      {
        accessorKey: "total_single_code_generated",
        header: "Total Single Code Generated For this Course",
        size: 150,
      },
      {
        accessorKey: "number_shared_code_enrolment",
        header: t("dashboard.enrolment_with_codes.labels.count_by_shared"),
      },
      {
        accessorKey: "total_shared_code_generated",
        header: "Total Shared Code Generated Including This Course",
        size: 150,
      },
      {
        accessorKey: "number_shared_selected_code_enrolment",
        header: t(
          "dashboard.enrolment_with_codes.labels.count_by_shared_selected"
        ),
      },
      {
        accessorKey: "number_gift_code_enrolment",
        header: t("dashboard.enrolment_with_codes.labels.count_by_gift"),
      },
      {
        accessorKey: "manual_enrolment",
        header: t("dashboard.enrolment_with_codes.labels.manual_enrolment"),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    muiToolbarAlertBannerProps: getEnrollmentByTypeOfCodes.isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableBottomToolbar: true,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => getEnrollmentByTypeOfCodes.refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    data: getEnrollmentByTypeOfCodes?.data?.data?.data || [],
    state: {
      isLoading: getEnrollmentByTypeOfCodes.isLoading,
      showAlertBanner: getEnrollmentByTypeOfCodes.isError,
      showProgressBars: getEnrollmentByTypeOfCodes.isRefetching,
    },
  });
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        {t("dashboard.enrolment_with_codes.h1")}
      </Typography>
      <Box
        sx={{
          maxWidth: "100%",
          "& .MuiPaper-root": {
            boxShadow: "none",
          },
          "& .MuiTable-container": {
            backgroundColor: "#fff",
            maxWidth: "100%",
          },
          "& .MuiTableHead-root .MuiTableRow-root": {
            boxShadow: "none",
            borderRadius: "10px",
            backgroundColor: "#F9F9F9",
          },
          "& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root": {
            borderBottom: "none",
            color: "#8D8D8D",
            fontWeight: "400",
          },
        }}
      >
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  );
};

export default CoursesWithTypeOfCode;
