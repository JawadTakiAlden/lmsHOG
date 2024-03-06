import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const useUpdateLesion = (option) => {
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const updateLesionRequest = (data) => {
        return request({
            url : `/lesions/update/${option.lesion_id}`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : [`update-lesion-${option.lesion_id}`],
        mutationFn : updateLesionRequest,
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

export default useUpdateLesion