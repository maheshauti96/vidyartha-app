import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import _ from 'lodash';
import { useRouter } from 'next/router'
import { useFetch } from "use-http";
import ShareIcon from '@material-ui/icons/Share';
import { useForm } from 'react-hook-form';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { copyUrlToClipboard, getSchoolInfo, isValidEmail, getTopDonorsBySchool } from "../../src/services/service";
import { Skeleton } from "@material-ui/lab";
import { Button, Dialog, DialogContent, DialogTitle, Grid, LinearProgress, TextField} from "@material-ui/core";
import RazorpayPayment from "../../src/components/RazorpayPayment";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import PlaceSearch from '../../src/components/PlaceSearch';
import Popup from "../../src/components/Popup";
import SendIcon from "@material-ui/icons/Search";
import Footer from "../../src/components/new/Footer";
import FAQ from "../../src/components/FAQ";
import DonorsTable from "../../src/components/DonorsTable";


export default function FundraiserPlace() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    
    const router = useRouter()
    const [schoolInfo, setSchoolInfo] = useState({
        schoolInfo: {
            name: 'Loading...',
            id: '',
        }
    });
    let { placeid } = router.query;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState();
    const [raisedAmount, setRaisedAmount] = useState(0);
    const [requiredAmount, setRequiredAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [placeInfo, setPlaceInfo] = useState(null);
    const [href, setHref] = useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [topDonors, setTopDonors] = useState([]);
    const [schoolName, setSchoolName] = useState("")
    const [schoolAdress, setSchoolAddress] = useState("");
    const [schoolId, setSchoolId] = useState(placeid);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [updateRaiseAmount,setUpdateRaisedAmount] = useState(false)
    const amountInputRef = useRef(null);

    function fetchSchoolDetails(placeid) {
        const pyrmont = new google.maps.LatLng(7.798, 68.14712);
        
        setLoading(true);

        try {
            const request = {
                placeId: schoolId,
            };

            const map = new google.maps.Map(document.getElementById("map"), {
                center: pyrmont,
                zoom: 15,
            });
            const service = new google.maps.places.PlacesService(map);

            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaceInfo(place);
                    setSchoolName(place.name);
                    setSchoolAddress([place.formatted_address]);
                }
                setLoading(false);
            });
        } catch (error) {
            console.log('fetchSchoolDetails failed', error);
            setLoading(false);
        }
    }

    const getPlaceInfo = async (placeInfo) => {
        const placeAddress = _.get(placeInfo, 'formatted_address') || '';
        const placeName = _.get(placeInfo, 'name');
        const placeImage = _.get(placeInfo, 'photos[0]') && _.get(placeInfo, 'photos[0]').getUrl && _.get(placeInfo, 'photos[0]').getUrl();
        if (!placeImage) {
            placeImage = "/defaultschool.jpeg"
        }
        try {
            if (placeName && schoolId) {
                const schoolInfo = await getSchoolInfo(
                    schoolId,
                    placeName,
                    placeAddress
                );
                setSchoolInfo({ schoolInfo, placeImage })

                let raisedAmount = +schoolInfo.collected / 100;

                let requiredAmount = Math.ceil(raisedAmount/10000)*10000 === 0 ? 10000 : Math.ceil(raisedAmount/10000)*10000;
                let progress = raisedAmount/requiredAmount*100


                if(raisedAmount % 10000 === 0) {
                    requiredAmount = Math.ceil((+raisedAmount+1)/10000)*10000 === 0 ? 10000 : Math.ceil((+raisedAmount+1)/10000)*10000;
                    progress = raisedAmount/requiredAmount*100
                }


                setRaisedAmount(raisedAmount);
                setRequiredAmount(requiredAmount)
                setProgress(progress) 
                
                return true;
            }
        } catch (error) {
            console.log('getPlaceInfo Error', error);
            return false;
        }
    }

    const fetchTopDonors = async (schoolId) => {
        const data = await getTopDonorsBySchool(schoolId)
        if (data) {

            setTopDonors(data.content)
        }
    }

    const handlePopupClose = () => {
        setShowPopup(false)
        localStorage.setItem("visited", "true")
    }

    useEffect(() => {
        setHref(window.location.href);
    }, [])

    useEffect(() => {
        let { placeid } = router.query
        setSchoolId(placeid)
    }, [router])

    useEffect(() => {
        if (schoolId && !placeInfo) {
            fetchSchoolDetails(schoolId);
            fetchTopDonors(schoolId);
        }
        if ((schoolId && placeInfo) || updateRaiseAmount) {
            fetchTopDonors(schoolId);
            getPlaceInfo(placeInfo)
        }
        // setPlaceInfo(localStorage.getItem('placeInfo') ? JSON.parse(localStorage.getItem('placeInfo')) : null);


    }, [placeid, placeInfo,updateRaiseAmount, schoolId])

    useEffect(() => {
        if (placeid !== schoolId) {
            placeid = schoolId;
        }
    }, [schoolId])

    return (<div className="fundraiser-wrap">
        <Head>
            <title>Vidyartha</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <meta property="title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
            <meta name="description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
            <meta property="image" content={schoolInfo.placeImage} />
            <meta property="og:title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
            <meta name="og:description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
            <meta property="og:image" content={schoolInfo.placeImage} />
        </Head>

        {
            showPopup && <Popup  open={showPopup} setOpen={setShowPopup} handlePopupClose={handlePopupClose} />
        }

        <main>
            <div className="position-relative inp-wrap">
                {/* <div className="position-absolute">
                    <TextField className="inp" label="Location" variant="outlined" />
                    <TextField className="inp" label="School" variant="outlined" />
                    <PlaceSearch className="ps " setSchoolId={setSchoolId} setPlaceInfo={setPlaceInfo}></PlaceSearch>
                </div> */}
                <header style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "padding": "0 1rem"}}>
                    <Link href="/"><img className="logo-image" height="104px" width="191px" src="/color-logo.webp" style={{ cursor: "pointer", margin: "0" }} /></Link>
                    <Button variant="outlined" 
                            startIcon={<SendIcon/>} 
                            className = "search-btn"
                            onClick={() => router.push("/")}
                    >
                        Search school
                    </Button>
                </header>
            </div>
            <div className="fundraiser-section center-align">
                {loading ?
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Skeleton variant="text" height={120} />
                            <Skeleton variant="rectangular" height={250} />
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton variant="text" height={120} />
                            <Skeleton variant="rectangular" height={250} />

                        </Grid>
                    </Grid>
                    : <Grid container spacing={4}>
                        <Grid item xs={12} sm={7} className="school-info-wrap">
                            <h2>{schoolName}</h2>
                            <p style={{"fontSize": "1.1rem", "color": "#4B5563"}}>{schoolAdress}</p>
                            <img
                                src={schoolInfo.placeImage}
                                // src="https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEASRoEMZI9AimR0SHJsNyn8z08ox9ahWwly9NsFCuK4wKMsG0an-_O2q-AC7gjkvKJuUv1VtBoEFqbqTKzvfoOHY--FG1u2Nnk2OncxMvL-_1__CWLvYGyRcdfMP49EsOlAWwfTmOD_xXHwooLeK4HYpuMC8f3EJCKv5UlYiAgOK95r&3u800&5m1&2e1&callback=none&key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&token=109081"
                                alt="Place Image unavailable"
                                width="100%"
                            // height="500"
                            ></img>
                        </Grid>
                        <Grid item xs={12} sm={5} className="collection-info-wrap">
                            <h2>placeholder</h2>
                            <div className="amount">
                                &#8377;<span className="green">{raisedAmount}</span>
                            </div>
                            <p className="raised-asof">{raisedAmount} of {requiredAmount} raised</p>
                            <div className="progress-bar-wrap position-relative">
                                <LinearProgress className="progress-bar" variant="determinate" value={progress}></LinearProgress>
                                <p className="tobe-raised position-absolute">&#8377; {requiredAmount}</p>
                            </div>
                            {/* <Button
                                className="primary-button dark m-tb-25"
                                onClick={() => {
                                    setOpenDialog(true);
                                }}
                                variant="contained"
                            >Donate Now</Button> */}
                            <div className="center-align donor-info-form pt-25">
                                <div className="form-input-wrap">
                                    <TextField
                                        id="name"
                                        label="Name"
                                        value={name}
                                        fullWidth
                                        onChange={({ target }) => setName(target.value)}
                                        variant="outlined"
                                    />
                                </div>
                                <div className="form-input-wrap">
                                    <TextField
                                        id="name"
                                        label="Email Address"
                                        fullWidth
                                        value={email}
                                        error={email && !isValidEmail(email)}
                                        onChange={({ target }) => setEmail(target.value)}
                                        variant="outlined"
                                    />
                                </div>
                                <div className="form-input-wrap">
                                    <div className="pills">
                                        <div className="pill" onClick={() => {amountInputRef.current.focus();setAmount(1000)}}>1000</div>
                                        <div className="pill" onClick={() => setAmount(2500)}>2500</div>
                                        <div className="pill" onClick={() => setAmount(5000)}>5000</div>
                                    </div>
                                </div>
                                <div className="form-input-wrap">
                                    <TextField
                                        id="amount"
                                        label="Amount"
                                        value={amount || ''}
                                        ref={amountInputRef}
                                        onChange={({ target }) => {
                                            if (isNaN(target.value)) {
                                                alert('Please enter valid amount')
                                            } else {
                                                setAmount(target.value)
                                            }
                                        }}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                                <RazorpayPayment
                                    name={name}
                                    email={email}
                                    amount={amount}
                                    setName={setName}
                                    setEmail={setEmail}
                                    setAmount={setAmount}
                                    placeId={schoolId}
                                    setUpdateRaisedAmount={setUpdateRaisedAmount}
                                ></RazorpayPayment>
                            </div>
                            <h4 className="sub-text">Share and Support this campaign</h4>
                            <div className="social-share-icons share-wrap">
                                <ShareIcon
                                    onClick={() => {
                                        copyUrlToClipboard(href)
                                        alert('link is copied!');
                                    }}
                                />

                                <a href={`whatsapp://send?text=Help me to Support this campaign ${href}`} data-action="share/whatsapp/share">
                                    <img src="/whatsapp.png" alt="whatsapp" />
                                </a>

                                <a href={`instagram://send?text=Help me to Support this campaign ${href}`}
                                data-action="share/instagram/share">
                                    <img src="/instagram.png" alt="instagram" />
                                </a>                                

                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${href}`} rel="noopener noreferrer" target="_blank">
                                    <img src="/facebook.png" alt="facebook" />
                                </a>

                                <a href={`https://www.twitter.com/sharer/sharer.php?u=${href}`} rel="noopener noreferrer" target="_blank">
                                    <img src="/twitter.png" alt="twitter" />
                                </a>
                            </div>

                            {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                                <DialogTitle className="center-align"><h2 className="m-0">Enter your details</h2></DialogTitle>
                                <DialogContent className="center-align donor-info-form">

                                </DialogContent>
                            </Dialog> */}

                        </Grid>
                    </Grid>
                }

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={`${(topDonors.length > 0) ? 7 : 12}`} className="about-wrap">
                        <p>About Fundraiser campaign</p>
                    </Grid>
                    <Grid item xs={12} sm={`${(topDonors.length > 0) ? 7 : 12}`} className="about-wrap">
                        <div className="about">
                            <p>Vidyartha aims to distribute spiritual and inspirational books to school libraries through respective alumni of the school. You can contribute your choice amount on this platform to gift amazing books of wisdom to your own school or college library. 
                            You can also share the link to associated alumni of the schools.  As soon as we raise funds upto the targeted amount, the books would be couriered to your school.</p>
                        </div>
                    </Grid>

                    {
                        (topDonors.length > 0) && (
                            <DonorsTable topDonors={topDonors}/>
                    )}
                    {/* {
                        (topDonors.length > 0) && (<Grid item xs={12} sm={5}>
                            <TableContainer component={Paper}>
                                <Table className="table-wrap" aria-label="simple table">
                                    <TableHead className="thead">
                                        <TableRow className="tr">
                                            <TableCell className="th" align="center">Top Donors</TableCell>
                                            <TableCell className="th" align="center">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="tbody">
                                        {
                                            topDonors.map(donor =>
                                                <TableRow className="tr" key={donor.name}>
                                                    <TableCell className="td" align="left">{donor.name}</TableCell>
                                                    <TableCell className="td" align="left">{parseInt(Number(donor.amount) / 100)}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>)
                    } */}
                </Grid>
            </div>
            <div style={{ visibility: 'hidden' }} id="map"></div>

        </main>

        <FAQ/>
    
    <Footer />
    </div>)
}