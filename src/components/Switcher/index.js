import { Switch } from '@mui/material'
import React, { useState } from 'react'

const Swicther = ({originalRow , switchermutate , checkedAttribute}) => {
    const [checked , setChecked] = useState(originalRow[checkedAttribute])
  return (
    <Switch checked={checked} onChange={() => {
        setChecked(!checked)
        switchermutate.callFunction(originalRow)
      }} />
  )
}

export default Swicther