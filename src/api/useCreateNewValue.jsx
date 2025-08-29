import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";

const useCreateNewValue = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()

    const createNewValue = (data) => {
        return request({
            url : `/courses/add-value/${course_id}`,
            method : 'post',
            data
        })
    }

    const query = useMutation({
        mutationKey : [`create-new-value-in-${course_id}`],
        mutationFn : createNewValue,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
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

export default useCreateNewValue