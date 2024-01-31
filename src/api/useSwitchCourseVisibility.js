import { useMutation } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'

const switchCourseVisibilityRequest = (course_id) => {
    return request({
        url : `/courses/switchVisibility/${course_id}`,
        method : 'patch'
    })
}
const useSwitchCourseVisibility = (refetch) => {
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['switch-course-visibility'],
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
        query.mutate(originalRow.id)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useSwitchCourseVisibility
