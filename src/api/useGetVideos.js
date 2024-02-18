import { useQuery } from '@tanstack/react-query'
import {request} from './request'

const getVideosRequest = () => {
    return request({
        url : `/videos/get`
    })
}
const useGetVideos = () => {
    const query = useQuery({
        queryKey : [`get-videos`],
        queryFn : getVideosRequest
    })
  return query
}

export default useGetVideos