'use client'
import { useState, useEffect, useRef } from 'react';
import type { NextPage } from "next";
// MUI
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type DisclaimerType = {
    disclaimer?: string;
  };

const Disclaimer:NextPage<DisclaimerType> =({disclaimer}) => {


  const [open, setOpen] = useState<boolean>(false);
  //const baseURL = "https://typescript-blog-backend.onrender.com";

  useEffect(() => {
    const accepted = localStorage.getItem('disclaimer-accepted')
    if (accepted === "1") { setOpen(false) }
    else { setOpen(true) }
  }, []);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClose = (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
  // Prevent closing on backdrop click or Escape key
  if (reason === "backdropClick" || reason === "escapeKeyDown") {
    return;
  }
  setOpen(false);
};


  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const decline = () => {
    window.close()
    localStorage.setItem('disclaimer-accepted', '0')
    handleClose()
  }
  const accept = () => {
    localStorage.setItem('disclaimer-accepted', '1')
    handleClose()
  }
  return <Dialog
    open={open}
    onClose={handleClose}
    scroll='paper'
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
    // disableBackdropClick
    // disableEscapeKeyDown
    maxWidth='lg'
  >
    <DialogTitle id="scroll-dialog-title">DISCLAIMER AND CONSENT</DialogTitle>
    <DialogContent dividers={true}>
      <DialogContentText
        id="scroll-dialog-description"
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <div className="p-2">
          <h2 className='font-bold text-xl mb-4'>Welcome to Intellectia!
          </h2>
          <p className='mb-4'>By clicking on the “I Agree” button below, the website visitor agrees and acknowledges that:-
          </p>

          <ol className='list-decimal list-outside'>
          <pre className="mt-4 text-gray-600 dark:text-gray-400 text-justify">
            {disclaimer}
          </pre>
          </ol>

        </div>

      </DialogContentText>
    </DialogContent>
    <DialogActions>

      {/* <Button onClick={decline} color="secondary">
        Decline
      </Button> */}
      <Button onClick={accept} color="primary" variant='contained'>
        I Agree
      </Button>
    </DialogActions>
  </Dialog>
}

export default Disclaimer;
