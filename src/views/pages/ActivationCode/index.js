import React from 'react'
import ActivationCodeGenerateForm from './ActivationCodeGenerateForm'
import useGetCodeFiles from '../../../api/useGetCodeFiles'
import { Box, Button, IconButton, Typography } from '@mui/material'
import useDownloadFile from '../../../api/useDownloadFile'
import { CloudDownload, DeleteOutline, DeleteOutlined, FileCopyOutlined } from '@mui/icons-material'
import useDeleteFile from '../../../api/useDeleteFile'
import { LoadingButton } from '@mui/lab'
import FileRenderer from './FilesRenderer'

const ActivationCode = () => {
  
  return (
    <>
      <ActivationCodeGenerateForm />
      <FileRenderer />
    </>
  )
}

export default ActivationCode