import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation } from "@tanstack/react-query";

const cancelEnrollRequest = (options) => {
    return request({
        url : `/courses/cancelInrolment/${options.inrolment_id}`,
        method : 'delete'
    })
}


const useCancelInroll = (handelCloseOnSuccess , refetchOnSuccess) => {
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['cancel-inroll'],
        mutationFn : cancelEnrollRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            refetchOnSuccess()
            handelCloseOnSuccess()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (options) => {
        query.mutate(options)
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useCancelInroll