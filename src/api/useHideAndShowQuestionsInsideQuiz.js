import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";

const useHideAndShowQuestionsInsideQuiz = (type = 'hide') => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {quiz_id} = useParams()
    const hideAndShowRequest  = (data) => {
        return request({
            url : `/quizzes/questions/${type}`,
            method : 'patch',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`hide-or-show-questions-inside-quiz`],
        mutationFn : hideAndShowRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`delete-questions-from-quiz-${quiz_id}`]);
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

export default useHideAndShowQuestionsInsideQuiz