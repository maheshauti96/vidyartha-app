import React from 'react';
import './RazorpayPayment.css';
import { useState } from "react";
// import ShareIcon from '@mui/icons-material/Share';
import { copyUrlToClipboard, createRazorpayOrder } from './service';
// import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { RAZORPAY_PAYMENT_KEY_ID } from '../constants';
import { Box, Button, CircularProgress, LinearProgress, Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';




const RazorpayPayment = ({ name, email, amount, placeId, httpClient }) => {

    const [success, setSucess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [showSnackBar, setShowSnackBar] = React.useState(false);
    const { get, post, response, loading, error } = httpClient;


    async function displayRazorPay(e) {
        try {
            e.preventDefault();

            setSucess(false);
            setFailure(false);
            setButtonLoader(true);
            const data = await createRazorpayOrder({ post, response }, parseInt(amount), placeId)

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
                    rel="noopener noreferrer"
                >
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
                    <p className="sub-text">Share and Support this campaign</p>
                    <div className="social-share-icons">
                        <ShareIcon
                            onClick={() => {
                                copyUrlToClipboard(window.location.href)
                                alert('link is copied!');
                            }}
                        />
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} rel="noopener noreferrer" target="_blank">
                            <FacebookIcon />
                        </a>

                        <a href={`whatsapp://send?text=Help me to Support this campaign ${window.location.href}`} data-action="share/whatsapp/share">
                            <WhatsAppIcon />
                        </a>
                    </div>
                    {/* <img height="30px" width="30px"  src="/shareIcon.png" onClick={() => { 
                        copyUrlToClipboard(window.location.href)
                        alert('link is copied!');
                    }
                    } alt="share" title="Copy Link"></img> */}
                </div>
            </div>


            <div >

                {
                    failure ? <div className="failure">Payment failed :(</div> : <div></div>
                }
            </div>

            <div>

                {
                    loading ? <div className="loading">...loading</div> : <div></div>
                }
            </div>

        </div>
    );
};

export default RazorpayPayment;
