import { useQuery } from "@tanstack/react-query"
import { request } from "./request"
import useErrorHandeler from "./errorHandler"

const getCategoriesRequest = () => {
    return request({
        url : '/categories/all'
    })
}

const useGetCategories = () => {
    const query = useQuery({
        queryKey : ['get-categories'],
        queryFn : getCategoriesRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetCategories