import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useAddQuestionToPreExistingQuiz = () => {
    const { enqueueSnackbar } = useSnackbar();

    const addToPreExistingQuizRequest = (data) => {
        return request({
            url : `/quizzes/questions/add`,
            method : 'post',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`add-questions-to-pre-existing-quiz`],
        mutationFn : addToPreExistingQuizRequest,
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

export default useAddQuestionToPreExistingQuiz