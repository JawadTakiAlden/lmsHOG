
import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";


const useDeleteCategory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {category_id} = useParams()
    const navigate = useNavigate()
    const deleteCategoryRequest = () => {
        return request({
            url : `/categories/delete/${category_id}`,
            method : 'delete',
        })
    }
    const query = useMutation({
        mutationKey : ['delete-category'],
        mutationFn : deleteCategoryRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/categories/all')
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

export default useDeleteCategory