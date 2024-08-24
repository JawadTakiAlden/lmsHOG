import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation } from "@tanstack/react-query";

const createEnrollRequest = (options) => {
    return request({
        url : `/courses/addUser/${options.student_id}/toCourse/${options.course_id}`,
        method : 'post'
    })
}

const useCreateEnroll = () => {
    const { enqueueSnackbar } = useSnackbar();
    
    const query = useMutation({
        mutationKey : ['create-enroll'],
        mutationFn : createEnrollRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
           
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (options) => {
        query.mutate(options)
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useCreateEnroll