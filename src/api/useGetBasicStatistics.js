import { useQuery } from '@tanstack/react-query'
import {request} from './request'
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
  return query
}

export default useGetBasicStatistics