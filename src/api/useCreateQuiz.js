import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useCreateQuiz = () => {
    const { enqueueSnackbar } = useSnackbar();

    const createQuizRequest = (data) => {
        return request({
            url : `/quizzes/create`,
            method : 'post',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`create-new-quiz`],
        mutationFn : createQuizRequest,
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

export default useCreateQuiz