import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react'
import { request } from './request';

const useDeleteFile = () => {
    const [fileName , setFileName] = useState()

    const deleteFileRequest = () => {
        return request({
            url : `/files/delete/${fileName}`,
            method : 'delete',
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationKey : [`delete-files-${fileName}`],
        mutationFn : deleteFileRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`get-files`]);
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (fileName) => {
        setFileName(fileName)
        query.mutate()
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteFile