import { useQuery } from '@tanstack/react-query'
import {request} from './request'
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
  return query
}

export default useGetQuestion