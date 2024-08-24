import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";
import useDownloadFile from "./useDownloadFile";

const useGenerateActivationCode = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const download = useDownloadFile()
    const generateCodeRequest = (data) => {
        return request({
            url : `/activationCodes/generate`,
            method : 'post',
            data : data,
        })
    }
    const query = useMutation({
        mutationKey : [`generate-codes`],
        mutationFn : generateCodeRequest,
        onSuccess : (data) => {
            download.callFuntion(data.data.data)
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`get-files`]);
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
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useGenerateActivationCode