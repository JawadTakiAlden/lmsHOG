import { useQuery } from '@tanstack/react-query'
import {request} from './request'

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
  return query
}

export default useGetRecentEnrolled