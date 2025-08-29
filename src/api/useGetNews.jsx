import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const getNewsRequest = () => {
    return request({
        url : '/news/all'
    })
}
const useGetNews = () => {
    const query = useQuery({
        queryKey : ['get-all-news'],
        queryFn : getNewsRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetNews