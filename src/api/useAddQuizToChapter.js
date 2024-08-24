import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const useAddQuizToChapter = () => {
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const addNewQuizToChapter = (data) => {
        return request({
            url : `/quizzes/addQuizToChapter`,
            method : 'post',
            data
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['add-quiz-to-chapter'],
        mutationFn : addNewQuizToChapter,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-course-details-${course_id}`])
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

export default useAddQuizToChapter