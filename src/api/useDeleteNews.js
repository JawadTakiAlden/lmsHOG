import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "./request"
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";


const useDeleteNews = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {news_id} = useParams()
    const navigate = useNavigate()
    const deleteNewsRequest = () => {
        return request({
            url : `/news/delete/${news_id}`,
            method : 'delete',
        })
    }
    const query = useMutation({
        mutationKey : [`delete-news-${news_id}`],
        mutationFn : deleteNewsRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`get-all-news`]);
            navigate('/dashboard/news/all')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = () => {
        query.mutate()
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteNews