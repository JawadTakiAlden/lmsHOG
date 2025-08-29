import React from 'react'
import useGetTeachers from '../../api/useGetTeachers'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router'

const LoginWrapper = ({children}) => {
 const token = localStorage.getItem('token_admin_house_of_geniuses')

 const techers = useGetTeachers()

 const navigate = useNavigate()
 if(!token){
    return children
 }

 if(techers.isLoading){
    return <CircularProgress color='success' />
 }

 if(techers.isError){
    return children
 }

 navigate('/dashboard/default')

}

export default LoginWrapper