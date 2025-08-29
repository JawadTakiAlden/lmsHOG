import { useMutation } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const switchCourseVisibilityRequest = (course_id) => {
    return request({
        url : `/courses/switchVisibility/${course_id}`,
        method : 'patch'
    })
}
const useSwitchCourseVisibility = (refetch) => {
    const [rowID,setRowID] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : [`switch-course-visibility-${rowID}`],
        mutationFn : switchCourseVisibilityRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            refetch()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (originalRow) => {
        setRowID(originalRow.id)
        query.mutate(originalRow.id)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useSwitchCourseVisibility
