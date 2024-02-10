import React, { useMemo } from 'react'
import useGetUsersInsideOfCourse from '../../../../api/useGetUsersInsideOfCourse'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Grid, IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material'
import { Details, Refresh } from '@mui/icons-material'
import TableWrapper from '../../../../components/TableWrapper'
import { gridSpacing } from '../../../../constant'

const StudentTab = () => {
    const usersInsideOfCourse = useGetUsersInsideOfCourse()
    const columns = useMemo(() => [
        {
            accessorKey: 'full_name',
            header : 'Course Name'
        },
    ] , [])
    const table = useMaterialReactTable({
        data : usersInsideOfCourse?.data?.data || [],
        columns,
        enableColumnOrdering : true,
        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
              <IconButton onClick={() => usersInsideOfCourse.refetch()}>
                <Refresh />
              </IconButton>
            </Tooltip>
          ),
          enableRowActions: true,
    renderRowActionMenuItems: ({ closeMenu , row}) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon >
          <Details color='primary' />
        </ListItemIcon>
        Show Course
      </MenuItem>,
    ],
        muiToolbarAlertBannerProps: usersInsideOfCourse.isError
        ? {
            color: 'error',
            children: usersInsideOfCourse?.error?.response?.message,
          }
        : undefined,
        state : {
            isLoading : usersInsideOfCourse.isLoading,
            showAlertBanner: usersInsideOfCourse.isError,
            showProgressBars: usersInsideOfCourse.isRefetching,
          }
    })
  return (
    <Grid container spacing={gridSpacing} direction={'column'}>
        <Grid item xs={12}>
            <TableWrapper>
                <MaterialReactTable table={table}/>
            </TableWrapper>
        </Grid>
    </Grid>
  )
}

export default StudentTab