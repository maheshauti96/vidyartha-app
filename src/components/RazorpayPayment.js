import React from 'react';
// import './RazorpayPayment.css';
import { useState } from "react";
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
// import { RAZORPAY_PAYMENT_KEY_ID } from '../constants';
import { Box, Button, CircularProgress, LinearProgress, Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { copyUrlToClipboard, createRazorpayOrder, isValidEmail } from '../services/service';
import { RAZORPAY_PAYMENT_KEY_ID } from '../constants/api';
import BasicModal from './BasicModal';



const RazorpayPayment = ({ name, email, amount, setName,setEmail,setAmount, placeId,setUpdateRaisedAmount}) => {

    const [success, setSucess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);


    async function displayRazorPay(e) {
        try {
            e.preventDefault();
            if (!name || !email || !isValidEmail(email) || !amount) {
                alert('Please fill out all Details');
                return;
            }
            setSucess(false);
            setFailure(false);
            setButtonLoader(true);
            const data = await createRazorpayOrder(parseInt(amount), placeId)

            console.log(data)

            var options = {
                "key":RAZORPAY_PAYMENT_KEY_ID ,
                currency: data.currency,
                amount: parseInt(data.amount),
                order_id: data.id,
                "name": name,
                "email": email,
                "image": "https://i.ibb.co/tKRjzCz/logoketto.png",
                "handler": function (response) {
                    console.log("payment successful from handler", response);
                    setSucess(true);
                    setFailure(false);
                    setButtonLoader(false);
                    setShowSnackBar('success');
                    setUpdateRaisedAmount(true)
                    setName('')
                    setEmail('')
                    setAmount('')
                },
                "prefill": {
                    "name": name,
                    "email": email,
                },
                "notes": {
                    "placeId": placeId,
                    "name": name,
                    "email": email,
                },
                "theme": {
                    "color": "#10B981"
                },
                "modal": {
                    "ondismiss": function(){
                        setButtonLoader(false)

                    }
                }

            };

            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                console.log("payment failure", response);
                setSucess(false);
                setFailure(true);
                setButtonLoader(false);

            });
            rzp1.on('payment.paid', function (response) {
                console.log("payment sucessful from event", response);
                setSucess(true)
                setButtonLoader(false);
                setUpdateRaisedAmount(true)

            });
            rzp1.open();
        } catch (err) {
            console.log('error : ', err)
        }
    }


    return (
        <div className="App">
            <div className="form">
                <Button
                    className="primary-button"
                    // className="App-link"
                    disabled={buttonLoader}
                    onClick={displayRazorPay}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div>
                        <div>
                    Donate now
                    </div>
                    {buttonLoader ?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress style={{ marginLeft: '10px' }} size="small" />
                    </Box>
                        : null
                    }
                    </div>
                </Button>
            </div>
            <div>
                <Snackbar
                autoHideDuration={6000}
                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showSnackBar}
            TransitionComponent={(props) => <Slide {...props} direction="left" />}

                >
                    <Alert variant="filled" severity="success">
                     Payment Successful!!  
                    </Alert>
                </Snackbar>
                {
                    success ? <div className="success">Payment successful!

                    </div> : <div></div>
                }
                <div style={{ display: 'block', paddingTop: '10px', alignSelf: 'center' }}>
                    {/* <img height="30px" width="30px"  src="/shareIcon.png" onClick={() => { 
                        copyUrlToClipboard(window.location.href)
                        alert('link is copied!');
                    }
                    } alt="share" title="Copy Link"></img> */}
                </div>
            </div>

            {
                success && <BasicModal open={success} setOpen={setSucess}></BasicModal>
            }
            <div >

                {
                    failure ? <div className="failure">Payment failed :(</div> : <div></div>
                }
            </div>


        </div>
    );
};

export default RazorpayPayment;
