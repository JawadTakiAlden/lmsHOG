import { request } from './request'
import { useQuery } from '@tanstack/react-query'
import useErrorHandeler from './errorHandler'

const useGetAllAccounts = () => {
    const getAllAccountsRequest = () => {
        return request({
            url : '/users/all'
        })
    }
    const query = useQuery({
        queryKey : ['get-all-accounts'],
        queryFn : getAllAccountsRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetAllAccounts