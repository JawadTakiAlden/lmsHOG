import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCourse = () => {
    const {course_id} = useParams()
    const queryClient = useQueryClient()
    const updateCourse = (data) => {
        return request({
            url : `/courses/update/${course_id}`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data : {
                ...data,
                is_visible : +data.is_visible,
                is_open : +data.is_open
            }
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : [`update-course-${course_id}`],
        mutationFn : updateCourse,
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

export default useUpdateCourse