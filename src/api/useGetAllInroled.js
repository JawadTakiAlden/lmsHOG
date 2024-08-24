import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
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
    useErrorHandeler(query)
  return query
}

export default useGetAllInroled