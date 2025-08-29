import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const showCourseDetailsRequest = (options) => {
    return request({
        url : `/courses/show/${options.course_id}`,
    })
}
const useShowCourseDetails = (options) => {
    const query = useQuery({
        queryKey : [`show-course-details-${options.course_id}`],
        queryFn : () => showCourseDetailsRequest(options),
    })
    useErrorHandeler(query)
  return query
}

export default useShowCourseDetails