import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="#2196f3" onClick={this.handleClickOpen}>
          Press for details about the project's team
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"GALA Tech"}
          </DialogTitle>
          <DialogContent>
        
            <DialogContentText id="alert-dialog-slide-description">
          
            <pre> 
             <p> Boboc Georgiana - grupa 1066 </p>
             <p> Bolan Laura - grupa 1066 </p>
             <p> Alexe Andreea - grupa 1065 </p>
             <p> Antonescu Adrian - grupa 1065 </p>
            </pre> 
            
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    );
  }
}

export default AlertDialogSlide;