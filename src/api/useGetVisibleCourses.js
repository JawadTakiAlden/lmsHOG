import { useQuery } from '@tanstack/react-query'
import {request} from './request'

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
  return query
}

export default useGetVisibleCourses