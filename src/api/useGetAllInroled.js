import { useQuery } from '@tanstack/react-query'
import {request} from './request'
const getAllInroledRequest = () => {
    return request({
        url : '/courses/allInrolments'
    })
}
const useGetAllInroled = () => {
    const query = useQuery({
        queryKey : [`get-all-inroled`],
        queryFn : getAllInroledRequest
    })
  return query
}

export default useGetAllInroled