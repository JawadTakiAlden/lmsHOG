import { useQuery } from "@tanstack/react-query"
import { request } from "./request"

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
  return query
}

export default useGetTeachers