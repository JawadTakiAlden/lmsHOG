import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const recentEnrolledRequst = () => {
    return request({
        url : '/statistics/last-enrolled'
    })
}
const useGetRecentEnrolled = () => {
    const query = useQuery({
        queryKey : ['get-recent-enrolled'],
        queryFn : recentEnrolledRequst
    })
    useErrorHandeler(query)
  return query
}

export default useGetRecentEnrolled