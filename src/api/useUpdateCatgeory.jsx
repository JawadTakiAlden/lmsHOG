import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import { request } from "./request";



const useUpdateCatgeory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {category_id} = useParams()
    const queryClient = useQueryClient()
    const updateCatgeoryRequest  = (data) => {
        return request({
            url : `/categories/update/${category_id}`,
            method : 'patch',
            data : data
        })
    }

    const query = useMutation({
        mutationKey : [`update-category`],
        mutationFn : updateCatgeoryRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-category-details-${category_id}`]);
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

export default useUpdateCatgeory