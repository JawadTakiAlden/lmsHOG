import { useQuery } from "@tanstack/react-query"
import {request} from './request'
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
  return query
}

export default useGetCodeFiles