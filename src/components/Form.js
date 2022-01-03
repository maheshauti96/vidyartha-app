import { Accordion, AccordionSummary, Button, TextField, Typography, AccordionDetails } from "@material-ui/core";
import { useState, useRef, useEffect } from 'react';

export default function Form() {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [Feedback, setFeedback] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://api.vidyartha.org/shastradaan/contactus/contactus", {
                method: "POST",
                body: JSON.stringify({
                    Name: Name,
                    Email: Email,
                    Feedback: Feedback,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setEmail("");
                setFeedback("Feedback received");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="cont-wrap">
            <h4>Contact Us</h4>
            <div className="form1-wrap">
                <TextField className="id1" label="Name" value={Name} variant="outlined" onChange={(e) => setName(e.target.value)}
                />
                <br />
                <TextField className="id1" label="Email" value={Email} variant="outlined" onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <textarea className="id2" type="text" value={Feedback} placeholder="Feedback" cols="auto" rows="10" onChange={(e) => setFeedback(e.target.value)}
                />
                <br />
                <Button className="btn1" variant="contained">
                    <p>Submit</p>


                </Button>
                <div className="message">{message ? <p>{message}</p> : null}</div>

            </div>
        </div>
    )
}

