import React, { useEffect, useState } from "react";
import Head from 'next/head';
import _ from 'lodash';
import { useRouter } from 'next/router'
import { useFetch } from "use-http";
import { getSchoolInfo } from "../../src/services/service";
import { BASE_API_URL } from "../../src/constants/api";
import { Skeleton } from "@material-ui/lab";
import { Grid } from "@material-ui/core";



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

    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState();
    const [raisedAmount, setRaisedAmount] = useState(0);
    const [requiredAmount, setRequiredAmount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [placeInfo, setPlaceInfo] = useState(null);


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
        if (!placeInfo && !placeid) {
            router.push('/');
        }
        console.log('placeInfo**', placeInfo);
        if (!placeInfo) {
            fetchSchoolDetails(placeid);
        }
        if (placeInfo) {
            console.log('got the placeinfo');
            getPlaceInfo(placeInfo)
        }
    }, [placeInfo, placeid])

    useEffect(() => {
        // setPlaceInfo(localStorage.getItem('placeInfo') ? JSON.parse(localStorage.getItem('placeInfo')) : null);
    }, [])

    return (<div className="fundraiser-wrap">
        <Head>
            <title>Vidyartha</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
        </Head>
        <main>
            <div className="center-align position-relative">
                <header></header>
                <img className="position-absolute logo-image" height="120px" width="200px" src="/logo.png" />
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
                        <Grid item xs={7}>
                            <h2>Delhi Public School, Vidyartha Campaign</h2>
                            <img
                                src={schoolInfo.placeImage}
                                alt="Place Image unavailable"
                                width="100%"
                            // height="500"
                            ></img>
                        </Grid>
                        <Grid item xs={5}>bol</Grid>
                    </Grid>
                }
            </div>
            <div style={{ visibility: 'hidden' }} id="map"></div>

        </main>
    </div>)
}
