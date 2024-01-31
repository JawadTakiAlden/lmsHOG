import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useMemo } from 'react'
import useGetStudentList from '../../../../api/useGetStudentList'
import { Refresh } from '@mui/icons-material'
import useSwitchBlockedStatus from '../../../../api/useSwitchBlockedStatus'
import Swicther from '../../../../components/Switcher'
import StudentDetialPanel from './studentDetialPanel'
import TableWrapper from '../../../../components/TableWrapper'

const StudentList = () => {
  const {data , isLoading , isError , isRefetching , refetch} = useGetStudentList()
  const switchermutate = useSwitchBlockedStatus(refetch)
    const columns = useMemo(() => {
        return [
            {
                accessorKey: 'full_name', 
                header: 'Student Name',
            },
            {
                accessorKey: 'phone', 
                header: 'Phone Number',
            },
            {
                accessorKey: 'is_blocked',
                header: 'Blocked Status',
                Cell : ({row}) => {
                    return <Swicther originalRow={row.original} checkedAttribute={'is_blocked'} switchermutate={switchermutate}/>
                }
            },
        ]
    } , [])
    const table = useMaterialReactTable({
        columns,
        muiToolbarAlertBannerProps: isError
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined,
        renderTopToolbarCustomActions: () => (
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={() => refetch()}>
              <Refresh />
            </IconButton>
          </Tooltip>
        ),
        enableColumnOrdering : true,
        renderDetailPanel : ({row }) => {
          return <StudentDetialPanel originalRow={row.original} />
        },
        data : data?.data?.data || [],
        state : {
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
        }
      });
  return (
    <Box>
        <Typography
            sx={{
                fontSize : '32px'
            }}
        >
            Student List
        </Typography>
        <TableWrapper>
          <MaterialReactTable  table={table} />
        </TableWrapper>
    </Box>
  )
}

export default StudentList