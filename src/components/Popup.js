import {useState} from "react"
import { Box, Button, Typography, Modal } from "@material-ui/core";
import Close from "@material-ui/icons/Close";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
//   bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
//   p: 4,
  textAlign: 'center',

};

const closeStyle = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  color: "white",
  fontSize: "2rem",
  cursor: "pointer"
}

export default function Popup({open, handlePopupClose}) {
  
  const handleClose = () => {
    handlePopupClose();
  };

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="main">
            <div className="center-align">
                <p className="head">HELP IN CREATING A</p>
                <p className="head">BRIGHTER FUTURE</p>
                <p className="sub-head">BY DONATING SPIRITUAL BOOKS TO THE CHILDREN</p>
                <hr />
                <p className="par">
                    Reading spiritual books helps in developing personality, builds self
                    esteem, increases moral values, concentration, knowledge and peace
                </p>
                
                <div className="image">
                    <img className="center-align image" src="/book and bg-01.png"></img>
                </div>
            </div>

            <div className="logo">
                <img src="/logo-white.png"></img>
            </div>

            <Close style={closeStyle}  onClick={handleClose}></Close>
        </div>

        </Box>
      </Modal>
    </div>
  );
}
