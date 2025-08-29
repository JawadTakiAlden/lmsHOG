
import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const createChapterRequest = (values) => {
    return request({
        url : `/chapters/create`,
        method : 'post',
        data : values
    })
}
const useCreateChapter = (handelReset) => {
    const { enqueueSnackbar } = useSnackbar();
    const {course_id} = useParams()
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationKey : ['create-chapter'],
        mutationFn : createChapterRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            handelReset()
            queryClient.refetchQueries([`show-course-details-${course_id}`]);
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

export default useCreateChapter