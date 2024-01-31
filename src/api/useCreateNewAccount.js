import { useMutation } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'

const createAccountRequest = (data) => {
    return request({
        url : `/users/create`,
        method : 'post',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        data
    })
}

const useCreateNewAccount = () => {
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['create-account'],
        mutationFn : createAccountRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (data) => {
        query.mutate(data)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useCreateNewAccount