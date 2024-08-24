import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useReOrderLesions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const resetDeviceIDRequest  = (data) => {
        return request({
            url : `/lesions/reOrderLesions`,
            method : 'post',
            data
        })
    }

    const mutation = useMutation({
        mutationKey : [`re-order-chapter`],
        mutationFn : resetDeviceIDRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    return mutation
}

export default useReOrderLesions