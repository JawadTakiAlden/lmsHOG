import React, { useMemo } from 'react'
import useGetQuizzes from '../../../../api/useGetQuizzes'
import { Box, IconButton, Tooltip } from '@mui/material'
import TableWrapper from '../../../../components/TableWrapper'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useNavigate } from 'react-router'
import { Refresh, SettingsOutlined } from '@mui/icons-material'

const AllQuiz = () => {
    const quizzes = useGetQuizzes()
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
        header: "Quiz Title",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Quiz Description",
        size: 150,
      },
      {
        accessorKey: "number_of_questions",
        header: "Number Of Question",
        size: 150,
      },
      {
        accessorKey: "number_of_visible_question",
        header: "Number Of Visible Question",
        size: 150,
      },
      {
        accessorKey: "number_of_invisible_question",
        header: "Number Of Inisible Question",
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: quizzes?.data?.data?.data || [],
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={quizzes.refetch}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    muiToolbarAlertBannerProps: quizzes.isError
      ? {
          color: "error",
          children: quizzes?.error?.response
            ? quizzes?.error?.response?.data?.message
            : "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    enableRowActions : true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="settings">
          <IconButton onClick={() => navigate(`/details/quiz/${row.original.id}`)}>
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: quizzes.isLoading,
      showAlertBanner: quizzes.isError,
      showProgressBars: quizzes.isRefetching,
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
  )
}

export default AllQuiz