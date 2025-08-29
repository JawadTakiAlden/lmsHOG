import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useGetCategories from "../../../api/useGetCategories";
import { Refresh, SettingsOutlined } from "@mui/icons-material";
import TableWrapper from "../../../components/TableWrapper";
import Swicther from "../../../components/Switcher";
import useSwitchCatgeoryVisibility from "../../../api/useSwitchCatgeoryVisibility";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const categories = useGetCategories();
  const switchermutate = useSwitchCatgeoryVisibility(categories.refetch);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("categories.categories_list.headers.id"),
        size: 50,
      },
      {
        accessorKey: "name",
        header: t("categories.categories_list.headers.name"),
        size: 150,
      },
      {
        accessorKey: "is_visible",
        header: t("categories.categories_list.headers.is_visible"),
        Cell: ({ row }) => {
          return (
            <Swicther
              originalRow={row.original}
              checkedAttribute={"is_visible"}
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
    data: categories?.data?.data?.data || [],
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title={t("public.table.tooltip.refresh")}>
        <IconButton onClick={categories.refetch}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    muiToolbarAlertBannerProps: categories.isError
      ? {
          color: "error",
          children: categories?.error?.response
            ? categories?.error?.response?.data?.message
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
        <Tooltip title={t("public.table.tooltip.settings")}>
          <IconButton
            onClick={() => navigate(`/details/category/${row.original.id}`)}
          >
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: categories.isLoading,
      showAlertBanner: categories.isError,
      showProgressBars: categories.isRefetching,
    },
  });
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      <TableWrapper>
        <MaterialReactTable table={table} />;
      </TableWrapper>
    </Box>
  );
};

export default Categories;
