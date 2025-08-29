import { useParams } from "react-router";
import { request } from "./request";
import { useQuery } from "@tanstack/react-query";
import useErrorHandeler from "./errorHandler";

const useShowQuestion = () => {
    const { question_id } = useParams();
    const showQuestionDetailRequest = () => {
        return request({
            url : `/questions/show/${question_id}`,
        })
    }
    const query = useQuery({
        queryKey : [`show-question-detials-${question_id}`],
        queryFn : showQuestionDetailRequest,
    })
    useErrorHandeler(query)
  return query
}

export default useShowQuestion