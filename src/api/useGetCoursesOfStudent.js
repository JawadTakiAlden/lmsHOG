import { useQuery } from '@tanstack/react-query'
import {request} from './request'

const coursesOfStudentRequest = (id) => {
    return request({
        url : `/users/allCoursesOf/${id}`
    })
}
const useGetCoursesOfStudent = (id) => {
    const query = useQuery({
        queryKey : [`get-courses-of-student-${id}`],
        queryFn : () => coursesOfStudentRequest(id)
    })
  return query
}

export default useGetCoursesOfStudent