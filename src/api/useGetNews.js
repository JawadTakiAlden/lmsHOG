import { useQuery } from '@tanstack/react-query'
import {request} from './request'

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
  return query
}

export default useGetNews