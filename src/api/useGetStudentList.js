import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const getStudentsRequest = () => {
    return request({
        url : '/users/students'
    })
}
const useGetStudentList = () => {
    const query = useQuery({
        queryKey : ['get-all-students'],
        queryFn : getStudentsRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetStudentList