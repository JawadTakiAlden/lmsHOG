import {Grid, IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { gridSpacing } from '../../../../constant'
import useGetAllInroled from '../../../../api/useGetAllInroled'
import TableWrapper from '../../../../components/TableWrapper'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Cancel, Details, Refresh } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router'
import SimpleAlterPopup from '../../../../components/SimpleAlterPopup/SimpleAlterPopup'
import useCancelInroll from '../../../../api/useCancelInroll'

const EnrolledStudents = () => {
  const {data , isLoading , isError , error, refetch , isRefetching} = useGetAllInroled()
  const navigate = useNavigate()
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [clickedRow, setClickedRow] = useState(null)

  const handleClickCancelOpen = () => {
    setCancelOpen(true);
  };

  const handleCancelClose = () => {
    setCancelOpen(false);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: 'course_title', //access nested data with dot notation
        header: 'Course Title',
      },
      {
        accessorKey: 'name', //normal accessorKey
        header: 'Student Name',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.enrole_date), //convert to date for sorting and filtering
        id: 'enrole_date',
        header: 'Enrolle Date',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) =>
          `${cell.getValue().toLocaleDateString()} ${cell
            .getValue()
            .toLocaleTimeString()}`,
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: error?.response ? error.response.data.message : 'Error Loading Data',
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    enableHiding : false,
    enableDensityToggle : false,
    enableRowActions: true,
    renderRowActionMenuItems: ({ closeMenu , row}) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate(`/dashboard/courses/show/${row.original.id}`)
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon >
          <Details color='primary' />
        </ListItemIcon>
        Show Course
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          setClickedRow(row.original.id)
          handleClickCancelOpen()
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Cancel color='error' />
        </ListItemIcon>
        Cancle Enrole
      </MenuItem>,
    ],
    muiTableBodyRowProps : {
      sx : {
        backgroundColor : 'transparent'
      }
    },
    muiBottomToolbarProps : {
      sx : {
        boxShadow : 'none'
      }
    },
    // renderRowActions : ({}) => {
    //   return <Button color='primary' variant='outlined' sx={{borderRadius : '12px'}}>actions</Button>
    // },
    enableFullScreenToggle : false,
    paginationDisplayMode : 'pages',
    data : data?.data?.data || [],
    state : {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    }
  });
  return (
    <>
      <Grid container spacing={gridSpacing} direction={'column'}>
          <Grid item xs={12}>
              <TableWrapper>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MaterialReactTable  table={table} />
                </LocalizationProvider>
              </TableWrapper>
          </Grid>
      </Grid>
      <SimpleAlterPopup 
        title={"Inrolment cancelation"}
        alterDescreption={"this action can't be undo are you sure that you want to cancel this inrolment"}  
        areaDescreption='enrolle cancelation popup'
        open={cancelOpen}
        handleClose={handleCancelClose}
        mutateQuery={useCancelInroll}
        refetch={refetch}
        mutateOptions={{
          inrolment_id : clickedRow,
        }}
      />
    </>
  )
}

export default EnrolledStudents