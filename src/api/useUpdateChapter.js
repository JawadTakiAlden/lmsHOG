import { useSnackbar } from "notistack";
import { request } from "./request";
import { useMutation } from "@tanstack/react-query";

const useUpdateChapter = () => {
    const updateChapterRequest = (data) => {
        return request({
            url : `/chapters/update/${data.chapter_id}`,
            method : 'patch',
            data : {
                is_visible : data.is_visible,
                name : data.name
            }
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['update-chapter'],
        mutationFn : updateChapterRequest,
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

export default useUpdateChapter