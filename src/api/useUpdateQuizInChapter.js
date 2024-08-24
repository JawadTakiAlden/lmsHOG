import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";


const useUpdateQuizInChapter = (quiz_chapter_id) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const updateQuizChapterRequest  = (data) => {
        return request({
            url : `/quizzes/updateQuizInChapter/${quiz_chapter_id}`,
            method : 'patch',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`update-quiz-inside-chapter-${quiz_chapter_id}`],
        mutationFn : updateQuizChapterRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-course-details-${course_id}`]);
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

export default useUpdateQuizInChapter