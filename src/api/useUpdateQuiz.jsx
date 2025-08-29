import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";


const useUpdateQuiz = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {quiz_id} = useParams()
    const queryClient = useQueryClient()
    const updateQuizRequest  = (data) => {
        return request({
            url : `/quizzes/update/${quiz_id}`,
            method : 'patch',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`update-quiz-${quiz_id}`],
        mutationFn : updateQuizRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-quiz-detials-${quiz_id}`]);
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

export default useUpdateQuiz