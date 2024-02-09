import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation } from "@tanstack/react-query";

const useCreateLesion = () => {
    const createNewLesionRequest = (data) => {
        return request({
            url : `/lesions/create`,
            method : 'post',
            data
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['create-new-lesion'],
        mutationFn : createNewLesionRequest,
        onSuccess : (data) => {
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

export default useCreateLesion