import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useCreateQuestion = () => {
    const { enqueueSnackbar } = useSnackbar();

    const creteQuestionRequest = (data) => {
        return request({
            url : `/questions/create`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }
    const query = useMutation({
        mutationKey : [`create-qeustion`],
        mutationFn : creteQuestionRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })


    const callMutateFuncction = (values) => {
        query.mutate(values)
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useCreateQuestion