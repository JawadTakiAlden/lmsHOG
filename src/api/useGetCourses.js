import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
const getCoursesRequest = () => {
    return request({
        url : '/courses/all'
    })
}

const useGetCourses = () => {
    const query = useQuery({
        queryKey : ['get-courses-list'],
        queryFn : getCoursesRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetCourses