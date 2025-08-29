import { useQuery } from "@tanstack/react-query"
import { request } from "./request"
import useErrorHandeler from "./errorHandler"

const getTeachersRequest = () => {
    return request({
        url : '/users/teachers'
    })
}

const useGetTeachers = () => {
    const query = useQuery({
        queryKey : [`get-teachers`],
        queryFn : getTeachersRequest,
    })
    useErrorHandeler(query)
  return query
}

export default useGetTeachers