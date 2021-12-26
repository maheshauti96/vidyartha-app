import React, { useEffect, useState } from "react";
import Head from 'next/head';
import _ from 'lodash';
import { useRouter } from 'next/router'
import { useFetch } from "use-http";
import ShareIcon from '@material-ui/icons/Share';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { copyUrlToClipboard, getSchoolInfo } from "../../src/services/service";
import { BASE_API_URL } from "../../src/constants/api";
import { Skeleton } from "@material-ui/lab";
import { Button, Grid, LinearProgress } from "@material-ui/core";



export default function FundraiserPlace() {
    const httpClient = useFetch(BASE_API_URL);

    const { get, post, response, loading, error } = httpClient;
    const router = useRouter()
    const [schoolInfo, setSchoolInfo] = useState({
        schoolInfo: {
            name: 'Loading...',
            id: '',
        }
    });
    const { placeid } = router.query;
    console.log('placeid', placeid);
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState();
    const [raisedAmount, setRaisedAmount] = useState(0);
    const [requiredAmount, setRequiredAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [placeInfo, setPlaceInfo] = useState(null);
    const [href, setHref] = useState(null);



    function fetchSchoolDetails(placeid) {
        console.log('in fetchSchoolDetails')
        const pyrmont = new google.maps.LatLng(7.798, 68.14712);

        try {
            const request = {
                placeId: placeid,
            };

            const map = new google.maps.Map(document.getElementById("map"), {
                center: pyrmont,
                zoom: 15,
            });
            const service = new google.maps.places.PlacesService(map);

            service.getDetails(request, (place, status) => {
                console.log({ status });
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaceInfo(place);
                    console.log('place-->', place);
                }

            });
        } catch (error) {
            console.log('fetchSchoolDetails failed', error);
        }
    }

    const getPlaceInfo = async (placeInfo) => {
        const placeAddress = _.get(placeInfo, 'formatted_address') || '';
        const placeName = _.get(placeInfo, 'name');
        const placeImage = _.get(placeInfo, 'photos[0]') && _.get(placeInfo, 'photos[0]').getUrl && _.get(placeInfo, 'photos[0]').getUrl();
        try {
            if (placeName && placeid) {
                const schoolInfo = await getSchoolInfo(
                    { post, response },
                    placeid,
                    placeName,
                    placeAddress
                );
                setSchoolInfo({ schoolInfo, placeImage })
                setProgress(parseInt(Number(schoolInfo.percentage) * 10));
                setRaisedAmount(parseInt(Number(schoolInfo.collected) / 100));
                setRequiredAmount(parseInt(Number(schoolInfo.required) / 100));
                return true;
            } else {
                console.log('sry bro', { placeAddress, placeName, placeid });
            }
        } catch (error) {
            console.log('getPlaceInfo Error', error);
            return false;
        }
    }

    useEffect(() => {
        setHref(window.location.href);
    }, [])

    useEffect(() => {

        // if (!placeInfo && !placeid) {
        //     console.log('bye bye');
        //     router.push('/');
        // }
        console.log('placeInfo**', placeInfo);
        if (placeid && !placeInfo) {
            fetchSchoolDetails(placeid);
        }
        if (placeid && placeInfo) {
            console.log('got the placeinfo');
            getPlaceInfo(placeInfo)
        }
        // setPlaceInfo(localStorage.getItem('placeInfo') ? JSON.parse(localStorage.getItem('placeInfo')) : null);
    }, [placeid, placeInfo])

    return (<div className="fundraiser-wrap">
        <Head>
            <title>Vidyartha</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
        </Head>
        <main>
            <div className="center-align position-relative">
                <header></header>
                <img className="position-absolute logo-image" height="120px" width="200px" src="/color-logo.webp" />
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
                        <Grid item xs={7} className="school-info-wrap">
                            <h2>{schoolInfo.schoolInfo.name}</h2>
                            <img
                                src={schoolInfo.placeImage}
                                // src="https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEASRoEMZI9AimR0SHJsNyn8z08ox9ahWwly9NsFCuK4wKMsG0an-_O2q-AC7gjkvKJuUv1VtBoEFqbqTKzvfoOHY--FG1u2Nnk2OncxMvL-_1__CWLvYGyRcdfMP49EsOlAWwfTmOD_xXHwooLeK4HYpuMC8f3EJCKv5UlYiAgOK95r&3u800&5m1&2e1&callback=none&key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&token=109081"
                                alt="Place Image unavailable"
                                width="100%"
                            // height="500"
                            ></img>
                        </Grid>
                        <Grid item xs={5} className="collection-info-wrap">
                            <h2>placeholder</h2>
                            <div class="amount">
                                &#8377;<span class="green">10000</span>
                            </div>
                            <p className="raised-asof">10000 of 20000 raised</p>
                            <div className="progress-bar-wrap position-relative">
                                <LinearProgress className="progress-bar" variant="determinate" value={50}></LinearProgress>
                                <p className="tobe-raised position-absolute">&#8377; 2000</p>
                            </div>
                            <Button
                                className="primary-button dark m-tb-25"
                                onClick={() => {
                                    // if (finalPlace) {
                                    //     navigate(`/fundraiser/${finalPlace.place_id}`);
                                    // } else {
                                    //     alert('Please Select the school')
                                    // }
                                }}
                                variant="contained"
                            >Donate Now</Button>
                            <h4 className="sub-text">Share and Support this campaign</h4>
                            <div className="social-share-icons">
                                <ShareIcon
                                    onClick={() => {
                                        copyUrlToClipboard(href)
                                        alert('link is copied!');
                                    }}
                                />
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${href}`} rel="noopener noreferrer" target="_blank">
                                    <FacebookIcon />
                                </a>

                                <a href={`whatsapp://send?text=Help me to Support this campaign ${href}`} data-action="share/whatsapp/share">
                                    <WhatsAppIcon className="whatsapp-icon" />
                                </a>
                            </div>

                        </Grid>
                    </Grid>
                }
            </div>
            <div style={{ visibility: 'hidden' }} id="map"></div>

        </main>
    </div>)
}
