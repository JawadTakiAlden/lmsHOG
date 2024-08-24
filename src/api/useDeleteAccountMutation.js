import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation, useQueryClient } from "@tanstack/react-query";



const deleteAccount = (user_id) => {
    return request({
        url : `/users/delete/${user_id}`,
        method : 'delete',
    })
}


const useDeleteAccountMutation = (options) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationKey : ['delete-account'],
        mutationFn : deleteAccount,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            options.handleClose()
            queryClient.refetchQueries([`get-all-accounts-not-in-student`]);
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })


    const callMutateFuncction = () => {
        query.mutate(options.user_id)
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteAccountMutation