import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { request } from './request';


const useDeleteQuestion = () => {
    const {question_id} = useParams()
    const deleteQuestionRequest = () => {
        return request({
            url : `/questions/delete/${question_id}`,
            method : 'delete',
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient()
    
    const navigate = useNavigate()
    const query = useMutation({
        mutationKey : [`delete-question-${question_id}`],
        mutationFn : deleteQuestionRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`get-questions-list`]);
            navigate('/dashboard/questions/all')
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

export default useDeleteQuestion