import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { request } from './request';

const deleteChapterRequest = (options) => {
    return request({
        url : `/courses/delete/${options.course_id}`,
        method : 'delete',
    })
}

const useDeleteCourse = () => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    const {course_id} = useParams()
    const navigate = useNavigate()
    const query = useMutation({
        mutationKey : ['delete-course'],
        mutationFn : deleteChapterRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`get-courses-list`]);
            navigate('/dashboard/courses/all')
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = () => {
        query.mutate({course_id})
    }

  return {
    callFuntion : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useDeleteCourse