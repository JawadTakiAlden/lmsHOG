import React, { useMemo } from 'react'
import useGetCourses from '../../../../api/useGetCourses'
import { Grid, IconButton, ListItemIcon, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import { gridSpacing } from '../../../../constant'
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import TableWrapper from '../../../../components/TableWrapper';
import Swicther from '../../../../components/Switcher';
import useSwitchCourseVisibility from '../../../../api/useSwitchCourseVisibility';
import { Details, Refresh } from '@mui/icons-material';
import useSwitchOpenOfCourse from '../../../../api/useSwitchOpenOfCourse';
import { useNavigate } from 'react-router';

const CourseList = () => {
    const {data , isLoading , isError , error , refetch , isRefetching} = useGetCourses()
    const navigate = useNavigate()
    const theme = useTheme()
    const switchVisibility = useSwitchCourseVisibility(refetch)
    const switchOpen = useSwitchOpenOfCourse(refetch)
    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header : 'Course Name'
        },
        {
            accessorKey: 'telegram_channel_link',
            header : 'telegram Channel',
            Cell : ({row}) => {
              return <Typography
                component={'a'}
                href={row.original.telegram_channel_link}
                target='_blank'
                sx={{
                  color : theme.palette.primary.main,
                  textDecoration : 'none',
                }}
              >
                  {row.original.telegram_channel_link}
                </Typography>
            }
        },
        {
            accessorFn: (originalRow) => (originalRow.is_open ? 'true' : 'false'),
            id: 'is_open',
            filterVariant: 'checkbox',
            header : 'Is Free',
            Cell : ({row}) => {
                return <Swicther originalRow={row.original} switchermutate={switchOpen} checkedAttribute={'is_open'}/>
            }
        },
        {
            accessorFn: (originalRow) => (originalRow.is_visible ? 'true' : 'false'), //must be strings
            id: 'is_visible',
            filterVariant: 'checkbox',
            header : 'Is Visible',
            Cell : ({row}) => {
                return <Swicther originalRow={row.original} switchermutate={switchVisibility} checkedAttribute={'is_visible'}/>
            }
        },
    ] , [])
    const table = useMaterialReactTable({
        data : data?.data?.data || [],
        columns,
        enableColumnOrdering : true,
        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
              <IconButton onClick={() => refetch()}>
                <Refresh />
              </IconButton>
            </Tooltip>
          ),
          enableRowActions: true,
    renderRowActionMenuItems: ({ closeMenu , row}) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/details/course/${row.original.id}`)
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
        muiToolbarAlertBannerProps: isError
        ? {
            color: 'error',
            children: error?.response?.message,
          }
        : undefined,
        state : {
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
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

export default CourseList