import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
const getQuestionsRequest = () => {
    return request({
        url : '/questions/all'
    })
}
const useGetQuestion = () => {
    const query = useQuery({
        queryKey : ['get-questions-list'],
        queryFn : getQuestionsRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetQuestion