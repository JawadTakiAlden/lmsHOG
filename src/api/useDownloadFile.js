import { useMutation, useQuery } from '@tanstack/react-query'
import {request} from './request'
import { useState } from 'react'
import { useSnackbar } from 'notistack'


const useDownloadFile = () => {
    const [fileName , setFileName] = useState()
    const { enqueueSnackbar } = useSnackbar();
    const downloadFileRequest = (fileName) => {
    return request({
        url : `/files/download/${fileName}`,
        method: 'GET',
      responseType: 'blob'
    })
}
const query = useMutation({
    mutationKey : ['download-files'],
    mutationFn : downloadFileRequest,
    onSuccess : (data) => {
        const url = window.URL.createObjectURL(new Blob([data.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    },
    onError : (error) => {
        if(error.response){
            enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
        }
    }
})

const callMutateFuncction = (fileNamme) => {
    setFileName(fileNamme)
    query.mutate(fileNamme)
}

return {
callFuntion : callMutateFuncction,
isPending : query.isPending,
isSuccess : query.isSuccess
}
}

export default useDownloadFile