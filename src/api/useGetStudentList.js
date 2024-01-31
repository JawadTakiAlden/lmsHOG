import { useQuery } from '@tanstack/react-query'
import {request} from './request'

const getStudentsRequest = () => {
    return request({
        url : '/users/all'
    })
}
const useGetStudentList = () => {
    const query = useQuery({
        queryKey : ['get-all-students'],
        queryFn : getStudentsRequest
    })
  return query
}

export default useGetStudentList