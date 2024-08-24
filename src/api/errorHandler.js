
import { useNavigate } from 'react-router'

const useErrorHandeler = (query) => {
    const navigate = useNavigate()
    if(query.isError){
        if(query.error?.response?.status === 401){
            navigate('/')
        }
    }
}

export default useErrorHandeler