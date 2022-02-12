import { Accordion, AccordionSummary, Box, Button, TextField, Typography, AccordionDetails,Slide, Snackbar, LinearProgress } from "@material-ui/core";
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
            <h4>Contact Us</h4>
            <div className="form1-wrap">
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField className="id1" label="Name" value={name} variant="outlined" onChange={(e) => {setName(e.target.value), setMessage("")}}
                required />
                <br />
                <TextField className="id1" label="Email" value={email} variant="outlined" onChange={(e) => {setEmail(e.target.value), setMessage("")}}
                required />
                <br />
                <textarea className="id1" value={feedback} variant="outlined" placeholder="Message" cols="auto" multiline rows="10" onChange={(e) => {setFeedback(e.target.value), setMessage("")}}
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
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={showSnackBar}
                    TransitionComponent={(props) => <Slide {...props} direction="left" />}
                >
                    <Alert variant="filled" severity="success">
                     Feedback sent successfully!  
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

