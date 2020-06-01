import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import BottomScrollListener from 'react-bottom-scroll-listener';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [enableButton, setEnableButton] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
 
  const handleScroll = e => {
	    let element = e.target
	    console.log("scrollHeight="+element.scrollHeight);
	    console.log("scrollTop="+element.scrollTop);
	    console.log("clientHeight="+element.clientHeight);
	    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
	      // do something at end of scroll
	    		setEnableButton(true);
	    		alert("Thank you!");
	    }
	  }
  
 const containerRef = useBottomScrollListener(handleScroll);
  
  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>


      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        	onScroll={handleScroll}
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          	
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" disabled={!enableButton}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
