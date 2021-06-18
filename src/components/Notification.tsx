//@ts-nocheck
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification=({text, type,open,setOpen})=>{


    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={type}>
                    {text}
                </Alert>
            </Snackbar>
        </>
    )
}
export default Notification;