import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useResetPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const resetPasswordRequest  = (data) => {
        return request({
            url : `/users/resetPassword/${data.user}`,
            method : 'patch',
            data : {
                new_password : data.new_password
            }
        })
    }

    const query = useMutation({
        mutationKey : [`reset-password`],
        mutationFn : resetPasswordRequest,
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

export default useResetPassword