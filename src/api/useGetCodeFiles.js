import { useQuery } from "@tanstack/react-query"
import {request} from './request'
import useErrorHandeler from "./errorHandler"
const getFilesRequest = () => {
    return request({
        url : '/files/all'
    })
}
const useGetCodeFiles = () => {
    const query = useQuery({
        queryKey : ['get-files'],
        queryFn : getFilesRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetCodeFiles