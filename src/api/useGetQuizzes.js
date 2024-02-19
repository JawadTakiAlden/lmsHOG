import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
const getQuizzesRequest = () => {
    return request({
        url : '/quizzes/getAll'
    })
}
const useGetQuizzes = () => {
    const query = useQuery({
        queryKey : ['get-quizzes-list'],
        queryFn : getQuizzesRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetQuizzes