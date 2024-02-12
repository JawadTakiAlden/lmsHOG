import { Box } from '@mui/material'
import React from 'react'

const TableWrapper = ({children}) => {
  return (
    <Box
        sx={{
          p : 3,
          backgroundColor : 'white',
          borderRadius : '15px',
          "& .MuiPaper-root" : {
            boxShadow  :'none',
          },
          "& .MuiTable-container" : {
            backgroundColor : '#fff',
          },
          '& .MuiTableHead-root .MuiTableRow-root' : {
            boxShadow : 'none',
            borderRadius : '10px',
            backgroundColor : '#F9F9F9 !important'
          },
          '& .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root' : {
            borderBottom : 'none',
            color : '#8D8D8D !important',
            fontWeight : '400'
          },
          "& .MuiTableBody-root .MuiTableRow-root:nth-child(even)" : {
            backgroundColor : '#F9F9F980 !important'
          },
          "& .MuiTableBody-root .MuiTableRow-root:nth-child(odd) .MuiTableCell-root" : {
            backgroundColor : 'white !important'
          },
          "& .Mui-TableBodyCell-DetailPanel" : {
            backgroundColor : '#0794EB05 !important'
          }
        }}
      > 
        {children}
      </Box>
  )
}

export default TableWrapper