import { useParams } from "react-router";
import { request } from "./request";
import { useQuery } from "@tanstack/react-query";
import useErrorHandeler from "./errorHandler";

const useShowQuiz = () => {
    const { quiz_id } = useParams();
    const showQuizDetails = () => {
        return request({
            url : `/quizzes/show/${quiz_id}`,
        })
    }
    const query = useQuery({
        queryKey : [`show-quiz-detials-${quiz_id}`],
        queryFn : showQuizDetails,
    })
    useErrorHandeler(query)
  return query
}

export default useShowQuiz