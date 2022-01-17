import {useState} from "react"
import { Box, Button, Typography, Modal } from "@material-ui/core";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  p: 4,
  textAlign: 'center'
};

export default function BasicModal({open, setOpen}) {
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src="/success.png" height={50} width={50}></img>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Success! 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your payment is successful. Thank you! 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
