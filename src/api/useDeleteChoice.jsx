import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const useDeleteChoice = (options) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {question_id} = useParams()
    const deleteChoiceRequest = () => {
        return request({
            url : `/questions/choices/delete/${options.choice_id}`,
            method : 'delete',
        })
    }
    const query = useMutation({
        mutationKey : [`delete-choice-${options.choice_id}`],
        mutationFn : deleteChoiceRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-question-detials-${question_id}`]);
            options.handleClose()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (options) => {
        query.mutate(options)
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteChoice