import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useGenerateActivationCode = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const generateCodeRequest = (data) => {
        return request({
            url : `/activationCodes/generate`,
            method : 'post',
            data : data,
            responseType: 'blob'
        })
    }
    const query = useMutation({
        mutationKey : [`generate-codes`],
        mutationFn : generateCodeRequest,
        onSuccess : (data) => {
            const url = window.URL.createObjectURL(new Blob([data.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'last-generated-activation-code.xlsx');
            document.body.appendChild(link);
            link.click();
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