import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'
const getAccountRequest = () => {
    return request({
        url : '/users/spicialAccounts'
    })
}
const useGetAccounts = () => {
    const query = useQuery({
        queryKey : [`get-all-accounts-not-in-student`],
        queryFn : getAccountRequest,
    })
    useErrorHandeler(query)
  return query
}

export default useGetAccounts