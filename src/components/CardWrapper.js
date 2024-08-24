import { Box } from '@mui/material'
import React from 'react'

const CardWrapper = ({children}) => {
  return (
    <Box
        sx={{
            borderRadius : '15px',
            width : '100%',
            backgroundColor : '#fff',
            py : 2
        }}
    >
        {children}
    </Box>
  )
}

export default CardWrapper