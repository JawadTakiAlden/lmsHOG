import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";
import { useParams } from "react-router";


const useCreateChoice = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {question_id} = useParams()
    const queryClient = useQueryClient()
    const createChoiceRequest = (values) => {
        return request({
            url : `/questions/newChoice/${question_id}`,
            method : 'post',
            data : {
                ...values,
                is_visible : +values.is_visible,
                is_true : +values.is_true,
                question_id
            },
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
    }
    const query = useMutation({
        mutationKey : [`create-choice-for-question-${question_id}`],
        mutationFn : createChoiceRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-question-detials-${question_id}`]);
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

export default useCreateChoice