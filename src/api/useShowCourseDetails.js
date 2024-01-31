import { useQuery } from '@tanstack/react-query'
import {request} from './request'

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
  return query
}

export default useShowCourseDetails