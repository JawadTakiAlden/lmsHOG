import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import useGetRecentEnrolled from "../../../api/useGetRecentEnrolled";
import { Refresh } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
const RecentEnroll = () => {
  const {t} = useTranslation()
  const columns = useMemo(
    () => [
      {
        accessorKey: 'course_title', //access nested data with dot notation
        header: t('dashboard.recent_enroll.table_headers.course_title'),
      },
      {
        accessorKey: 'student_name', //normal accessorKey
        header: t('dashboard.recent_enroll.table_headers.student_name'),
      },
      {
        accessorKey: 'phone',
        header: t('dashboard.recent_enroll.table_headers.phone'),
      },
      {
        accessorKey: 'created_at',
        header: t('dashboard.recent_enroll.table_headers.created_at'),
      }
    ],
    [],
  );

  const {isLoading , isError , data  , isRefetching , refetch} = useGetRecentEnrolled()
  const table = useMaterialReactTable({
    columns,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
      enableTopToolbar : false,
      enableSorting : false,
      enableColumnActions : false,
      enableBottomToolbar : true,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    data : data?.data?.data || [],
    state : {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    }
  });

  return (
    <Box
    >
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        {t('dashboard.recent_enroll.h1')}
      </Typography>
      <Box
        sx={{
          maxWidth : '100%',
          "& .MuiPaper-root" : {
            boxShadow  :'none',
          },
          "& .MuiTable-container" : {
            backgroundColor : '#fff',
            maxWidth : '100%',
          },
          '& .MuiTableHead-root .MuiTableRow-root' : {
            boxShadow : 'none',
            borderRadius : '10px',
            backgroundColor : '#F9F9F9'
          },
          '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root' : {
            borderBottom : 'none',
            color : '#8D8D8D',
            fontWeight : '400'
          }
        }}
      >
        <MaterialReactTable  table={table} />
      </Box>
    </Box>
  );
};

export default RecentEnroll;
