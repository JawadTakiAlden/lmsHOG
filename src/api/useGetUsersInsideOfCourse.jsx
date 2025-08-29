import { useParams } from "react-router"
import { request } from "./request"
import { useQuery } from "@tanstack/react-query"
import useErrorHandeler from "./errorHandler"

const useGetUsersInsideOfCourse = () => {
    const {course_id} = useParams()
    const getUsersInsideOfCourse = () => {
        return request({
            url : `/users/insideCourse/${course_id}`
        })
    }
    
    const query = useQuery({
        queryKey : [`get-users-inside-of-course-${course_id}`],
        queryFn : getUsersInsideOfCourse,
    })
    useErrorHandeler(query)
  return query
}

export default useGetUsersInsideOfCourse