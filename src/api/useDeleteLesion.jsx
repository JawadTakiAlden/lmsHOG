import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from './request';
import { useParams } from 'react-router';

const useDeleteLesion = (options) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const deleteLesion = () => {
        return request({
            url : `/lesions/delete/${options.lesion_id}`,
            method : 'delete',
        })
    }
    const query = useMutation({
        mutationKey : [`delete-lesion-${options.lesion_id}`],
        mutationFn : deleteLesion,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-course-details-${course_id}`])
            options.handelClose()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = () => {
        query.mutate()
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteLesion