import { Box, IconButton, Link, Tooltip } from '@mui/material'
import React, { useMemo } from 'react'
import TableWrapper from '../../../../components/TableWrapper'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Refresh, SettingsOutlined } from '@mui/icons-material'
import {  useNavigate } from 'react-router-dom'
import useGetQuestion from '../../../../api/useGetQuestion'

const QuestionsList = () => {
    const questionsList = useGetQuestion()
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
            header : 'Title Image',
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
                  <Link sx={{
                    maxWidth : '100px',
                    wordBreak : 'break-word'
                  }} component={'a'}  href={row.original.image} target="_blank">{row.original.image}</Link>
                </Box>
            }
          },
          {
            accessorKey: "clarification_text",
            header: "Clarification",
            size: 150,
          },
          {
            accessorKey: "clarification_image",
            header: "Clarification Image",
            size: 150,
            Cell : ({row}) => {
                return <Box>
                    <Box
                      sx={{
                        maxWidth : '100px',
                        maxHeight : '100px',
                        overflow : 'hidden'
                      }}
                    >
                      <img src={row.original.clarification_image} loading="lazy" style={{maxWidth : '100%' , maxHeight : '100%' , objectFit : 'fill' , borderRadius : '12px'}} />
                    </Box>
                    <Link sx={{
                    maxWidth : '100px',
                    wordBreak : 'break-word'
                  }} component={'a'}  href={row.original.clarification_image} target="_blank">{row.original.clarification_image}</Link>
                  </Box>
              }
          }
        ],
        []
      );
    const table = useMaterialReactTable({
        columns,
        data: questionsList?.data?.data?.data || [],
        renderTopToolbarCustomActions: () => (
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={questionsList.refetch}>
              <Refresh />
            </IconButton>
          </Tooltip>
        ),
        muiToolbarAlertBannerProps: questionsList.isError
          ? {
              color: "error",
              children: questionsList?.error?.response
                ? questionsList?.error?.response?.data?.message
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
                onClick={() => navigate(`/details/question/${row.original.id}`)}
              >
                <SettingsOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        state: {
          isLoading: questionsList.isLoading,
          showAlertBanner: questionsList.isError,
          showProgressBars: questionsList.isRefetching,
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

export default QuestionsList