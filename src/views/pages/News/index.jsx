import { Box, IconButton, Link, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import Swicther from "../../../components/Switcher";
import useSwitchNewsVisibility from "../../../api/useSwitchNewsVisibility";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useGetNews from "../../../api/useGetNews";
import { Refresh, SettingsOutlined } from "@mui/icons-material";
import TableWrapper from "../../../components/TableWrapper";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const News = () => {
  const switchermutate = useSwitchNewsVisibility();
  const news = useGetNews();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("news.news_list.headers.id"),
        size: 50,
      },
      {
        accessorKey: "title",
        header: t("news.news_list.headers.title"),
        size: 150,
      },
      {
        accessorKey: "image",
        header: t("news.news_list.headers.image"),
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
                component={"a"}
                variant="button"
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
        accessorKey: "is_visible",
        header: t("news.news_list.headers.is_visible"),
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
    data: news?.data?.data?.data || [],
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title={t("public.table.tooltip.refresh")}>
        <IconButton onClick={news.refetch}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    muiToolbarAlertBannerProps: news.isError
      ? {
          color: "error",
          children: news?.error?.response
            ? news?.error?.response?.data?.message
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
            onClick={() => navigate(`/details/news/${row.original.id}`)}
          >
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: news.isLoading,
      showAlertBanner: news.isError,
      showProgressBars: news.isRefetching,
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

export default News;
