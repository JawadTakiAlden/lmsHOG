import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { request } from "./request";

const useRemoveQuizFromChapter = ({handelClose , quiz_id}) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {course_id} = useParams()
    const removeQuizFromChapter  = () => {
        return request({
            url : `/quizzes/removeFromCourse/${quiz_id}`,
            method : 'delete',
        })
    }

    const query = useMutation({
        mutationKey : [`remove-quiz-from-chapter`],
        mutationFn : removeQuizFromChapter,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-course-details-${course_id}`]);
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            handelClose()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = () => {
        query.mutate()
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useRemoveQuizFromChapter