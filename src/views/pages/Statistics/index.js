import { ArrowBackOutlined, InfoOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import useResetStatistics from '../../../api/useResetStatistics'

const ResetPage = () => {
    const navigate = useNavigate()
    const resetStatistics = useResetStatistics()
    const [open, setOpen] = useState(false);
    const [resetConfiramtionMessage , setResetConfiramtionMessage] = useState("")
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
        <Box
            sx={{
                p : 3,
            }}
        >
            <IconButton sx={{mb : 2}} onClick={() => navigate(-1)}>
                <ArrowBackOutlined />
            </IconButton>
            <Typography variant='h4' sx={{
                mb : 2
            }}>
                Statistics Reset Page
            </Typography>

            <List
                sx={{
                    mb : 2
                }}
            >
                <ListItem >
                    <ListItemIcon>
                        <InfoOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        when you reset statistics all activation code will be deleted
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <InfoOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        when you reset statistics all inrollemnt in any course will be deleted
                    </ListItemText>
                </ListItem>
            </List>
            <Typography
                sx={{
                    color : '#660000',
                    borderRadius : '12px',
                    border : '1px solid #110000',
                    textAlign : 'center',
                    p : 2,
                    mb : 2
                }}
            >
                take care , when you press on reset will show confirmation popup after you reset you can't go back
            </Typography>
            <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'center'
                }}
            >
                <Button
                color='warning'
                size='large'
                variant='contained'
                onClick={handleClickOpen}
                >
                    Reset
                </Button>
            </Box>
        </Box>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            resetStatistics.callFunction()
          },
        }}
      >
        <DialogTitle>Reset Statistics Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            take care about this process , this action can't be undone and all mentioned data will be deleted,
            <br/> write "i am sure" to confirm delete
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) => setResetConfiramtionMessage(e.target.value)}
            value={resetConfiramtionMessage}
            label={"I am Sure"}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            color="error"
            disabled={resetConfiramtionMessage !== "i am sure"}
            loading={resetStatistics.isPending}
            type="submit"
          >
            Reset
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ResetPage