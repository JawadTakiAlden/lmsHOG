import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'


const useGetVideos = (link = "") => {

    const getVideosRequest = () => {
        return request({
            url : `/videos/get${link ? `?link=${link}` : ''}`
        })
    }
    const query = useQuery({
        queryKey : [`get-videos`],
        queryFn : getVideosRequest
    })
    useErrorHandeler(query)
  return query
}

export default useGetVideos