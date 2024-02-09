import React from 'react'
import useGetCodeFiles from '../../../../api/useGetCodeFiles'
import { Box, Skeleton, Typography } from '@mui/material'
import { CloudDownload, FileCopyOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import useDownloadFile from '../../../../api/useDownloadFile'
import useDeleteFile from '../../../../api/useDeleteFile'
import FileRowRenderer from './FileRowRenderer'

const FileRenderer = () => {
    const files = useGetCodeFiles()
   
    if(files.isLoading){
        return <Skeleton variant='rectangular' width={'100%'} height={'200px'} sx={{
            borderRadius : '12px',
            my : 2
        }} />
      }
  return (
    <Box
        sx={{
          backgroundColor : '#eee',
          borderRadius : '12px',
          p : 3,
          my : 2
        }}
      >
        {
          files.data.data.length === 0 && <Typography sx={{textAlign : 'center'}}>No Files</Typography>
        }
        {
        files.data.data.map(file => (
          <FileRowRenderer file={file} />
        ))
      }
        
      </Box>
  )
}

export default FileRenderer