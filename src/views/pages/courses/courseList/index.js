import React, { useMemo } from "react";
import useGetCourses from "../../../../api/useGetCourses";
import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import TableWrapper from "../../../../components/TableWrapper";
import Swicther from "../../../../components/Switcher";
import useSwitchCourseVisibility from "../../../../api/useSwitchCourseVisibility";
import { Details, Refresh } from "@mui/icons-material";
import useSwitchOpenOfCourse from "../../../../api/useSwitchOpenOfCourse";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const CourseList = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetCourses();
  const navigate = useNavigate();
  const theme = useTheme();
  const switchVisibility = useSwitchCourseVisibility(refetch);
  const switchOpen = useSwitchOpenOfCourse(refetch);
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("courses.courses_list.headers.name"),
      },
      {
        accessorKey: "telegram_channel_link",
        header: t("courses.courses_list.headers.telegram_channel_link"),
        Cell: ({ row }) => {
          return (
            <Typography
              component={"a"}
              href={row.original.telegram_channel_link}
              target="_blank"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              {row.original.telegram_channel_link}
            </Typography>
          );
        },
      },
      {
        accessorFn: (originalRow) => (originalRow.is_open ? "true" : "false"),
        id: "is_open",
        filterVariant: "checkbox",
        header: t("courses.courses_list.headers.is_open"),
        Cell: ({ row }) => {
          return (
            <Swicther
              originalRow={row.original}
              switchermutate={switchOpen}
              checkedAttribute={"is_open"}
            />
          );
        },
      },
      {
        accessorFn: (originalRow) =>
          originalRow.is_visible ? "true" : "false", //must be strings
        id: "is_visible",
        filterVariant: "checkbox",
        header: t("courses.courses_list.headers.is_visible"),
        Cell: ({ row }) => {
          return (
            <Swicther
              originalRow={row.original}
              switchermutate={switchVisibility}
              checkedAttribute={"is_visible"}
            />
          );
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    data: data?.data?.data || [],
    columns,
    enableColumnOrdering: true,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    enableRowActions: true,
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/details/course/${row.original.id}`);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Details color="primary" />
        </ListItemIcon>
        {t("courses.courses_list.table_actions.show_course")}
      </MenuItem>,
    ],
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: error?.response?.message,
        }
      : undefined,
    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });
  return (
    <Box>
      <TableWrapper>
        <MaterialReactTable table={table} />
      </TableWrapper>
    </Box>
  );
};

export default CourseList;
