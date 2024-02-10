import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";

const useDeleteValue = (value_id , handelClose) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const deleteValueRequest = () => {
        return request({
            url : `/courses/delete-value/${value_id}`,
            method : 'delete',
        })
    }
    const query = useMutation({
        mutationKey : [`delete-value-${value_id}`],
        mutationFn : deleteValueRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            handelClose()
            queryClient.refetchQueries([`show-course-details-${course_id}`]);
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
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteValue