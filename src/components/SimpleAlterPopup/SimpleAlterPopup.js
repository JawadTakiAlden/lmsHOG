import { Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const SimpleAlterPopup = ({open,title , alterDescreption , handleClose ,mutateQuery , mutateOptions , refetch , areaDescreption = ''}) => {
    const {isPending , callFuntion} = mutateQuery(handleClose , refetch)
  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby={areaDescreption}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alterDescreption}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending} color='error' variant='outlined' sx={{borderRadius : '12px'}}>cancel</Button>
          <LoadingButton
            loading={isPending}
            loadingPosition="start"
            startIcon={<Send />}
            color='success'
            variant='contained' 
            sx={{borderRadius : '12px'}}
            onClick={() => {
                callFuntion(mutateOptions)
            }}
        >
            Accept
        </LoadingButton>
        </DialogActions>
      </Dialog>
  )
}

export default SimpleAlterPopup