import React from 'react'
import { images } from '../assets/asstetsExporter'

const LogoLoader = () => {
  return (
    <img 
        src={images.Loading}
        alt='logo-loader'
        style={{
            maxWidth : "70%"
        }}
    />
  )
}

export default LogoLoader