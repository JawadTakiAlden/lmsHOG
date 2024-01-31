import { useMutation } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'


const switchBlockedStatusRequest = (account_id) => {
    return request({
        url : `/users/switchBlockAccount/${account_id}`,
        method : 'patch'
    })
}
const useSwitchBlockedStatus = (refetch) => {
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['switch-blocked-status'],
        mutationFn : switchBlockedStatusRequest,
        onSuccess : (data) => {
            refetch()
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
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

export default useSwitchBlockedStatus
