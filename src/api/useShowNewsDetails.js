import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router";
import { request } from "./request";
import useErrorHandeler from "./errorHandler";


const useShowNewsDetails = () => {
    const { news_id } = useParams();
    const showNewsDetailsRequest = () => {
        return request({
            url : `/news/show/${news_id}`,
        })
    }
    const query = useQuery({
        queryKey : [`show-news-details-${news_id}`],
        queryFn : showNewsDetailsRequest,
    })
    useErrorHandeler(query)
  return query
}

export default useShowNewsDetails