import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { request } from './request';

const useDeleteLesion = (options) => {
    const { enqueueSnackbar } = useSnackbar();
    // const queryClient = useQueryClient()
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