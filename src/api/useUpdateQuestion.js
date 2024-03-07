import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useParams } from 'react-router';
import { request } from './request';

const useUpdateQuestion = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {question_id} = useParams()
    const queryClient = useQueryClient()
    const updateQuestionRequest  = (data) => {
        return request({
            url : `/questions/update/${question_id}`,
            method : 'post',
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            data
        })
    }

    const query = useMutation({
        mutationKey : [`update-question-${question_id}`],
        mutationFn : updateQuestionRequest,
        onSuccess : (data) => {
            queryClient.refetchQueries([`show-question-detials-${question_id}`]);
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

export default useUpdateQuestion