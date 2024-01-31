import { PictureAsPdfOutlined, VideoFileOutlined } from '@mui/icons-material'
import { Box, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'


const LessionsRenderer = ({lesions}) => {
    const theme = useTheme()
  return (
    <Box
    >
        {
            lesions?.map((lesion , i) => {
                return <Box key={lesion.id}
                    sx={{
                        py : 2,
                        borderBottom : i !== lesions.length - 1 ? '1px solid #CCCCCC' : 'none'
                    }}
                >
                    <ListItem>
                        <ListItemIcon>
                            {
                                lesion.type === 'video'
                                ? <VideoFileOutlined />
                                : <PictureAsPdfOutlined />
                            }
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                textTransform : 'capitalize'
                            }}
                        >
                            {lesion.title} &#9; {lesion.is_open ? <span style={{color : theme.palette.primary.main}}>[free]</span> : <span style={{color : theme.palette.primary.main}}>[free]</span>}
                        </ListItemText>
                    </ListItem>
                </Box>

            })
        }
    </Box>
  )
}

export default LessionsRenderer