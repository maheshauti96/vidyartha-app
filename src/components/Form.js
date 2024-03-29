import { Accordion, AccordionSummary, Box, Button, TextField, Typography, AccordionDetails,Slide, Snackbar, LinearProgress, IconButton } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { useState, useRef, useEffect } from 'react';
import { postFeedback, isValidEmail } from "../services/service";

export default function Form() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);

    let handleSubmit = async (e) => {
        e.preventDefault();

        setButtonLoader(true);

        if(!isValidEmail(email)){
            setMessage("Enter a valid email");
            return;
        }

        let res = await postFeedback(name, email, feedback);
        
        if(res.status == 200) {
            setMessage("Thank you for your feedback!");
            setName("");
            setEmail("");
            setFeedback("");
            setShowSnackBar(true);
        }
        else {
            setMessage("Some error occured");
        }
        setButtonLoader(false);
    };
    return (
        <div className="cont-wrap">
            <div className="form1-wrap">
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField className="id1" label="Name" value={name} variant="filled" onChange={(e) => {setName(e.target.value), setMessage("")}}
                required />
                <br />
                <TextField className="id1" label="Email" value={email} variant="filled" onChange={(e) => {setEmail(e.target.value), setMessage("")}}
                required />
                <br />
                <textarea style={{padding : '1rem'}} className="id1" value={feedback} variant="filled" placeholder="Message" cols="auto" rows="10" onChange={(e) => {setFeedback(e.target.value), setMessage("")}}
                required />
                <br />
                <Button className="btn1" variant="contained" type="submit" disabled={buttonLoader}>
                    <div>
                    <p>Submit</p>
                    {buttonLoader ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress size="small" />
                        </Box>
                            : null
                    }
                    </div>
                </Button>
            </form>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                
                <Snackbar
                    autoHideDuration={2000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={showSnackBar}
                    TransitionComponent={(props) => <Slide {...props} direction="left" />}
                >
                    <Alert 
                        variant="filled" 
                        severity="success"
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setShowSnackBar(false);
                              }}
                            >
                              X
                            </IconButton>
                          }
                          
                    >
                     Feedback sent successfully!  
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

