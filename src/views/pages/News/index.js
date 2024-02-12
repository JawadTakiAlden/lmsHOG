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

const News = () => {
  const switchermutate = useSwitchNewsVisibility();
  const news = useGetNews();
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
      {
        accessorKey : 'image',
        header : 'Image',
        size : 150,
        Cell : ({row}) => {
          return <Box>
              <Box
                sx={{
                  maxWidth : '100px',
                  maxHeight : '100px',
                  overflow : 'hidden'
                }}
              >
                <img src={row.original.image} loading="lazy" style={{maxWidth : '100%' , maxHeight : '100%' , objectFit : 'fill' , borderRadius : '12px'}} />
              </Box>
              <Link component={'a'} variant="button" href={row.original.image} target="_blank">{row.original.image}</Link>
            </Box>
        }
      },
      {
        accessorKey: "is_visible",
        header: "Visibility",
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
      <Tooltip arrow title="Refresh Data">
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
        <Tooltip title="settings">
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
