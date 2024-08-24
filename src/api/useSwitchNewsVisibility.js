
import { useMutation } from '@tanstack/react-query'
import {request} from './request'
import { useSnackbar } from 'notistack'
import { useState } from 'react'


const switchNewsVisibilityRequest = (news_id) => {
    return request({
        url : `/news/switchVisibility/${news_id}`,
        method : 'patch'
    })
}

const useSwitchNewsVisibility = () => {
    const [rowID,setRowID] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : [`switch-new-visibility-${rowID}`],
        mutationFn : switchNewsVisibilityRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })

    const callMutateFuncction = (originalRow) => {
        setRowID(originalRow.id)
        query.mutate(originalRow.id)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useSwitchNewsVisibility