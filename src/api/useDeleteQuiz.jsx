import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { request } from './request';

const useDeleteQuiz = () => {
    const {quiz_id} = useParams()
    const deleteQuizRequest = () => {
        return request({
            url : `/quizzes/delete/${quiz_id}`,
            method : 'delete',
        })
    }
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const query = useMutation({
        mutationKey : [`delete-quiz-${quiz_id}`],
        mutationFn : deleteQuizRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            navigate('/dashboard/quizzes/all')
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

export default useDeleteQuiz