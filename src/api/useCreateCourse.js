import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { request } from "./request";

const useCreateCourse = () => {
    const { enqueueSnackbar } = useSnackbar();
    const createCourseRequest = (values) => {
        return request({
            url : `/courses/create`,
            method : 'post',
            data : {
                ...values,
                is_visible : +values.is_visible,
                is_open : +values.is_open
            },
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
    }
    const query = useMutation({
        mutationKey : ['create-course'],
        mutationFn : createCourseRequest,
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

export default useCreateCourse