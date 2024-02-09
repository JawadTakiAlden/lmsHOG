import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation } from "@tanstack/react-query";

const useUpdateLesion = (option) => {
    const updateLesionRequest = (data) => {
        return request({
            url : `/lesions/update/${option.lesion_id}`,
            method : 'patch',
            data
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : [`update-lesion-${option.lesion_id}`],
        mutationFn : updateLesionRequest,
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

export default useUpdateLesion