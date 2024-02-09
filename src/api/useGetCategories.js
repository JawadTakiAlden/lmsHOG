import { useQuery } from "@tanstack/react-query"
import { request } from "./request"

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
  return query
}

export default useGetCategories