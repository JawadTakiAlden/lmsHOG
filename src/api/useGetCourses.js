import { useQuery } from '@tanstack/react-query'
import {request} from './request'
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
  return query
}

export default useGetCourses