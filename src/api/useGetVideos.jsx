import { useQuery } from '@tanstack/react-query'
import {request} from './request'
import useErrorHandeler from './errorHandler'


const useGetVideos = (link = "" , source = "vimeo-1") => {

    const getVideosRequest = () => {
        return request({
            url : `/videos/get${link ? `?link=${link}` : ''}`,
            params : {
                source
            }
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