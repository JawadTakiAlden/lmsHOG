import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { request } from "./request";

const useResetStatistics = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const resetStatisticsRequest  = () => {
        return request({
            url : `/statistics/reset`,
            method : 'post',
        })
    }

    const query = useMutation({
        mutationKey : [`reset-statistics`],
        mutationFn : resetStatisticsRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`get-basic-statistics`]);
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/default')
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
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useResetStatistics