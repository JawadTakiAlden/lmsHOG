import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react'
import { request } from './request';

const switchCategoryVisibilityRequest= (category_id) => {
    return request({
        url : `/categories/switch-visibility/${category_id}`,
        method : 'patch'
    })
}

const useSwitchCatgeoryVisibility = (refetch) => {
    const { enqueueSnackbar } = useSnackbar();
    const query = useMutation({
        mutationKey : ['switch-category-visibility'],
        mutationFn : switchCategoryVisibilityRequest,
        onSuccess : (data) => {
            enqueueSnackbar(data?.data?.message , {variant : 'success'})
            refetch()
        },
        onError : (error) => {
            if(error.response){
                enqueueSnackbar(error?.response?.data?.message , {variant : 'error'})
            }
        }
    })
    const callMutateFuncction = (originalRow) => {
        query.mutate(originalRow.id)
    }

  return {
    callFunction : callMutateFuncction,
    isPending : query.isPending,
    isSuccess : query.isSuccess
  }
}

export default useSwitchCatgeoryVisibility