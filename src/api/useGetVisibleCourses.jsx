import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const visibleCoursesRequest = () => {
    return request({
        url : `/courses/visible`
    })
}
const useGetVisibleCourses = () => {
    const query = useQuery({
        queryKey : [`get-visible-courses`],
        queryFn : visibleCoursesRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetVisibleCourses