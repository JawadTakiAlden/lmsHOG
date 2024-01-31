import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import useGetRecentEnrolled from "../../../api/useGetRecentEnrolled";
import { Refresh } from "@mui/icons-material";
const RecentEnroll = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'course_title', //access nested data with dot notation
        header: 'Course Title',
      },
      {
        accessorKey: 'student_name', //normal accessorKey
        header: 'Student Name',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'created_at',
        header: 'Enroll Date',
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
      enableBottomToolbar : false,
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
        Recent Enroll
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
