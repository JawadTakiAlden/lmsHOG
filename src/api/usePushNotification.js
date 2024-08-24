import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation } from "@tanstack/react-query";

const usePushNotification = () => {
    const { enqueueSnackbar } = useSnackbar();
    const pushNotificationRequest  = (data) => {
        return request({
            url : `/notifications/push`,
            method : 'post',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`push-notification`],
        mutationFn : pushNotificationRequest,
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

export default usePushNotification