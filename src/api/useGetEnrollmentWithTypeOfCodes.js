import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const getEnrollmentWithTypeOfCodes = () => {
    return request({
        url : '/courses/getEnrollmentWithTypeOfCodes'
    })
}

const useGetEnrollmentWithTypeOfCodes = () => {
    const query = useQuery({
        queryKey : ['get-enrolment-by-type-of-code'],
        queryFn : getEnrollmentWithTypeOfCodes
    })
    useErrorHandeler(query)
  return query
}

export default useGetEnrollmentWithTypeOfCodes