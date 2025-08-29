import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";
import { useParams } from "react-router";

const useDeleteQuestionFromQuiz = (handelClose) => {
    const deleteQuestionsFromQuiz = (data) => {
        return request({
            url : `/quizzes/questions/delete`,
            method : 'delete',
            data
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {quiz_id} = useParams()
    
    const query = useMutation({
        mutationKey : [`delete-questions-from-quiz-${quiz_id}`],
        mutationFn : deleteQuestionsFromQuiz,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-quiz-detials-${quiz_id}`]);
            handelClose()
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

export default useDeleteQuestionFromQuiz