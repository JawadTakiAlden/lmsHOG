import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useCreateNews = () => {
    const createNewsRequest = (data) => {
        return request({
            url : `/news/create`,
            method : 'post',
            data : {...data , is_visible : +data.is_visible},
            headers : {
                'Content-Type' : 'multipart/form-data',
                'Accept' : 'application/json'
            }
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['create-news'],
        mutationFn : createNewsRequest,
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

export default useCreateNews