import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'

const showCategoryDetailsRequest = (options) => {
    return request({
        url : `/categories/show/${options.category_id}`,
    })
}
const useShowCategoryDetails = (options) => {
    const query = useQuery({
        queryKey : [`show-category-details-${options.category_id}`],
        queryFn : () => showCategoryDetailsRequest(options),
    })
    useErrorHandeler(query)
  return query
}

export default useShowCategoryDetails