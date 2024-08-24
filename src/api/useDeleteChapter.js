
import { useSnackbar } from "notistack";
import { request } from "./request"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const deleteChapterRequest = (options) => {
    return request({
        url : `/chapters/delete/${options.chapter_id}`,
        method : 'delete',
    })
}

const useDeleteChapter = (handelCloseOnSuccess) => {
    const deleteChapterRequest = (options) => {
        return request({
            url : `/chapters/delete/${options.chapter_id}`,
            method : 'delete',
        })
    }
    
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const query = useMutation({
        mutationKey : ['delete-chapter'],
        mutationFn : deleteChapterRequest,
        onSuccess : (data) => {
            
            handelCloseOnSuccess()
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-course-details-${course_id}`]);
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

export default useDeleteChapter