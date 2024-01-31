import React, { useMemo } from 'react'
import TableWrapper from '../../../../../components/TableWrapper'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import useGetCoursesOfStudent from '../../../../../api/useGetCoursesOfStudent'

const StudentDetialPanel = ({originalRow}) => {
    const {data , isLoading , isError , isRefetching , error} = useGetCoursesOfStudent(originalRow.id)
    const columns = useMemo(() => [
        {
            accessorKey: 'name', 
            header: 'Course Name',
        },
        {
            accessorKey : 'created_at',
            header : 'Enroll Date'
        },
        {
            accessorKey : 'telegram_channel_link',
            header : 'Telegram Channel',
            Cell : ({row}) => {
                return <a target='_blank' href={row.original.telegram_channel_link}>{row.original.telegram_channel_link}</a>
            }
        }
    ] , [])

    const table = useMaterialReactTable({
        columns,
        muiToolbarAlertBannerProps: isError
          ? {
              color: 'error',
              children: error?.response?.message,
            }
          : undefined,
          enableTopToolbar: false,
          enableBottomToolbar : false,
        // renderTopToolbarCustomActions: () => (
        //   <Tooltip arrow title="Refresh Data">
        //     <IconButton onClick={() => refetch()}>
        //       <Refresh />
        //     </IconButton>
        //   </Tooltip>
        // ),
        data : data?.data?.data || [],
        state : {
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
        }
    })
  return (
    <TableWrapper>
        <MaterialReactTable table={table} />
    </TableWrapper>
  )
}

export default StudentDetialPanel