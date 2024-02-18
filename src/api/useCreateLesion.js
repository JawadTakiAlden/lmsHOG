import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const useCreateLesion = () => {
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const createNewLesionRequest = (data) => {
        return request({
            url : `/lesions/create`,
            method : 'post',
            headers : {
                'Content-Type': 'multipart/form-data'
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
        mutationKey : ['create-new-lesion'],
        mutationFn : createNewLesionRequest,
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

export default useCreateLesion