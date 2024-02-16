import { DeleteOutlined, EditOutlined, LockOutlined, PictureAsPdfOutlined, VideoFileOutlined } from '@mui/icons-material'
import { Box, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip, Typography, useTheme } from '@mui/material'
import React from 'react'
import LesionItem from './LesionItem'
import QuizItem from './QuizItem'


const LessionsRenderer = ({lesions , quizzes}) => {
  return (
    <Box
    >
        {
            lesions?.length === 0 &&  quizzes?.length === 0 && <Typography sx={{textAlign : 'center' , py : 2 , textTransform : 'capitalize'}}>no lesions</Typography>
        }
        {
            lesions?.map((lesion , i) => {
                return <LesionItem key={lesion.id} lesion={lesion} last={i === lesions.length - 1 && quizzes?.length === 0 } />
            })
        }
        {
          quizzes?.map((quiz , i) => {
            return <QuizItem key={quiz.id} quiz={quiz} last={i === quizzes.length - 1 } />
          })
        }
    </Box>
  )
}

export default LessionsRenderer