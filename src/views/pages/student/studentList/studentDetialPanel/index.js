import React, { useMemo } from 'react'
import TableWrapper from '../../../../../components/TableWrapper'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import useGetCoursesOfStudent from '../../../../../api/useGetCoursesOfStudent'
import { useTranslation } from 'react-i18next'

const StudentDetialPanel = ({originalRow}) => {
    const {data , isLoading , isError , isRefetching } = useGetCoursesOfStudent(originalRow.id)
    const {t} = useTranslation()
    const columns = useMemo(() => [
        {
            accessorKey: 'name', 
            header: t('students.student_list.student_detail.headers.name'),
        },
        {
            accessorKey : 'created_at',
            header : t('students.student_list.student_detail.headers.created_at'),
        },
        {
            accessorKey : 'telegram_channel_link',
            header : t('students.student_list.student_detail.headers.telegram_channel_link'),
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
              children: t('students.student_list.table.error_message'),
            }
          : undefined,
          enableTopToolbar: false,
          enableBottomToolbar : false,
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