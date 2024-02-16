import { useMutation, useQueryClient } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router'

const useSwicthChoiceVisiblity = (choice_id) => {
    const switchChoiceVisiblityRequest = () => {
        return request({
            url : `/questions/choices/switch-visibility/${choice_id}`,
            method : 'patch'
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const {question_id} = useParams()
    const queryClient = useQueryClient()
    const query = useMutation({
        mutationKey : [`switch-choice-visiblity-${choice_id}`],
        mutationFn : switchChoiceVisiblityRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            queryClient.refetchQueries([`show-question-detials-${question_id}`]);
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
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useSwicthChoiceVisiblity