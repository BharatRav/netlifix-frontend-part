import { Typography, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
    const theme = useTheme()
    const navigate = useNavigate()
  return (
    <Typography fontWeight={700} fontSize={"1.7rem"} onClick ={()=>navigate("/")}>
        NetLi<span style={{color:theme.palette.primary.main}}>FIX</span>
    </Typography>
  )
}

export default Logo