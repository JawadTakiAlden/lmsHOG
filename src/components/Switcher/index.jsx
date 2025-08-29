import { FormControlLabel, Switch } from '@mui/material'
import React, { useState } from 'react'

const Swicther = ({originalRow , label , switchermutate , checkedAttribute}) => {
    const [checked , setChecked] = useState(originalRow[checkedAttribute])
  return (
    
      <FormControlLabel control={<Switch checked={checked} onChange={() => {
        setChecked(!checked)
        switchermutate.callFunction(originalRow)
      }} />} label={label} />
  )
}

export default Swicther