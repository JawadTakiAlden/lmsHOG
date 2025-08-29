import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";


const useUpdateNews = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {news_id} = useParams()
    const queryClient = useQueryClient()
    const updateNewsRequest  = (data) => {
        return request({
            url : `/news/update/${news_id}`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data : {
                ...data,
                is_visible : +data.is_visible
            },
        })
    }

    const query = useMutation({
        mutationKey : [`update-news-${news_id}`],
        mutationFn : updateNewsRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-news-details-${news_id}`]);
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

export default useUpdateNews