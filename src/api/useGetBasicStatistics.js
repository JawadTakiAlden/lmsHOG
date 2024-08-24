import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
const basicStatisticsRequst = () => {
    return request({
        url : '/statistics/basicStatistics'
    })
}

const useGetBasicStatistics = () => {
    const query = useQuery({
        queryKey : ['get-basic-statistics'],
        queryFn : basicStatisticsRequst
    })
    useErrorHandeler(query)
  return query
}

export default useGetBasicStatistics