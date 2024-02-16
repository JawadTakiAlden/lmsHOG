import { useQuery } from '@tanstack/react-query'
import {request} from './request'
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
  return query
}

export default useGetQuizzes