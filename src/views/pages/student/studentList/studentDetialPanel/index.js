import React, { useMemo } from "react";
import TableWrapper from "../../../../../components/TableWrapper";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useGetCoursesOfStudent from "../../../../../api/useGetCoursesOfStudent";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import ResetPasswordForm from "./ResetPasswordForm";
import DeleteAccountButton from "./DeleteAccountButton";
import ResetDeviceToken from "./ResetDeviceToken";

const StudentDetialPanel = ({ originalRow }) => {
  const { data, isLoading, isError, isRefetching } = useGetCoursesOfStudent(
    originalRow.id
  );
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("students.student_list.student_detail.headers.name"),
      },
      {
        accessorKey: "created_at",
        header: t("students.student_list.student_detail.headers.created_at"),
      },
      {
        accessorKey: "activation_code.type",
        header: t("students.student_list.student_detail.headers.type"),
      },
      {
        accessorKey: "telegram_channel_link",
        header: t(
          "students.student_list.student_detail.headers.telegram_channel_link"
        ),
        Cell: ({ row }) => {
          return (
            <a
              target="_blank"
              rel="noreferrer"
              href={row.original.telegram_channel_link}
            >
              {row.original.telegram_channel_link}
            </a>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: t("students.student_list.table.error_message"),
        }
      : undefined,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    data: data?.data?.data || [],
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });
  return (
    <Box>
      <DeleteAccountButton userID={originalRow.id} />
      <TableWrapper>
        <MaterialReactTable table={table} />
      </TableWrapper>
      <ResetPasswordForm userID={originalRow.id} />
      <ResetDeviceToken userID={originalRow.id} />
    </Box>
  );
};

export default StudentDetialPanel;
