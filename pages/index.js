import Head from 'next/head';
import Slider from 'react-slick';
import { Button, TextField } from "@material-ui/core";
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import Form from './../src/components/Form'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get, debounce } from 'lodash';
import { ArrowForwardIos } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../src/components/Footer';
import FAQ from '../src/components/FAQ';

export default function Home() {

  let autoCompleteRef = useRef(null);
  const router = useRouter()

  const [text, setText] = useState("");
  const [schools, setSchools] = useState([]);
  const [city, setCity] = useState("");
  const [finalPlace, setFinalPlace] = useState();



  //Mangesh Work
  const [loading, setLoading] = useState(false);

  // const [schools, setSchools] = useState([])
  const [cardVisibility, setCardVisibility] = useState("none") //visible
  const [latitude, setLatitude] = useState(7.798000);
  const [longitude, setLongitude] = useState(68.14712);

  const fetchSchools = debounce(() => {
    var pyrmont = new google.maps.LatLng(latitude, longitude);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);

    var request = {
      location: pyrmont,
      radius: '500',
      query: text,
      types: ['school']
    };

    service.textSearch(request, (results, status) => {
      // setLoading(true);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // setLoading(false);
        setCardVisibility("block")

        let schoolsArr = []


        if (results.length > 0) {

          setLoading(false);

          for (var i = 0; i < results.length; i++) {

            let place = results[i];
            let placeAddress = place.formatted_address.toUpperCase();

            if (placeAddress.includes(city.toUpperCase())) {
              schoolsArr.push(results[i]);
            }
          }
          setSchools(schoolsArr);
        }
      }
    });
  }, 10);

  const fetchSchoolsAutoComplete = (() => {

    var service = new google.maps.places.AutocompleteService();

    var pyrmont = new google.maps.LatLng(latitude, longitude);

    var request = {
      input: text,
      types: ['establishment'],
      componentRestrictions: { country: 'in' },
      location: pyrmont,
      radius: '500',
    }


    service.getPlacePredictions(request,
      function (predictions, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          setCardVisibility("block")

          let schoolsArr = []

          for (var i = 0, prediction; prediction = predictions[i]; i++) {
            if (prediction.types.includes("school") || prediction.types.includes("university")) {
              schoolsArr.push(prediction)
              // console.log(prediction.description)
            }

          }
          console.table(predictions);
          // console.table(schoolsArr);
          setSchools(() => { return schoolsArr.map((item) => item) });
        }

      });
  });


  function selectedValue(event, value) {

    if (value) {
      console.log(value)
      setFinalPlace(value)
      setText(value.name)
      localStorage.setItem('placeInfo', JSON.stringify(value));
    }
  }

  function handleInput(e) {

    // console.log("The event value received is : ", e.target.value);

    setLoading(true);

    if (e.target.value === "") {
      setSchools([])
      setText(e.target.value);
      //       setCardVisibility("none");
      setLoading(false);
    }
    else {
      setText(e.target.value);
      console.log("HEREEEEEEEEEEEE")
      fetchSchoolsAutoComplete();
    }

  }

  useEffect(() => {

    let autoComplete = new window.google.maps.places.Autocomplete(

      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "in" } }
    );

    // autoComplete.setFields(["address_components", "formatted_address", "name"]);

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
      setCity(place.name)
    }

    );

    setText("");
    setCardVisibility("none");
  }, [])

  return (
    <div className="home-wrap">
      <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
        <meta property="title" content="Vidyartha | Help Us To Donate Books For Your School Library!" key="title" />
        <meta name="description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="image" content="/banner-bg-original.png" />
        <meta property="og:title" content="Vidyartha | Help Us To Donate Books For Your School Library!" key="title" />
        <meta name="og:description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="og:image" content="/banner-bg-original.png" />
      </Head>
      <main className="main-banner">
        <div className="logo-wrap">
          <img id="logo" className="position-absolute logo-image" src="/logo-white.png" />
        </div>
        <div className="banner-wrap center-align position-relative">
          <h1><p style={{marginBottom: "0.25rem"}}>Helping You To Donate</p> <p style={{margin: "0"}}> Books For Your School / College Library!</p></h1>
          <div className="search-box-wrap">
            <TextField label="Find your city" inputRef={autoCompleteRef} variant="outlined" />
            <Autocomplete
              disablePortal
              noOptionsText={'No Options'}
              width={'346px'}
              options={schools}
              multiline="true" 
              // open={true}
              onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) => option.structured_formatting.main_text.toString()}
              renderOption={(option) => {
                return <div style={{ textAlign: "left", fontSize: "1.1rem" }}><p style={{ margin: "0px" }}>{option.structured_formatting.main_text}</p><p style={{ color: "grey", margin: "0px", fontSize: "0.9rem" }}> {option.structured_formatting.secondary_text}</p></div>;
              }}
              sx={{ width: 346 }}
              renderInput={(params) => {
               return <TextField {...params} label="Find your school"
                onChange={handleInput} variant="outlined"
              />
              } }
            />
            <Button
              className="primary-button"
              onClick={() => {
                if (finalPlace) {
                  localStorage.setItem("visited", true);
                  router.push(`/fundraiser/${finalPlace.place_id}?name=${finalPlace.structured_formatting.main_text.replaceAll(" ", "-")}`);
                } else {
                  alert('Please Select the school')
                }
              }}
              variant="contained"
              endIcon={<ArrowForwardIos />}
            >Donate Now</Button>
          </div>
        </div>
        <div id="map"></div>
      </main>

      <div className="item">
        <Slider dots={true} autoplay={true} speed={2000}>
          <div className="slide1">
            {/* <Grid container spacing={4}>
              <Grid item sm={8}>
                <div className="text">
                  <h1>What is the purpose of Vidyartha?</h1>
                  <p>The purpose of Vidyartha is to <b>make spiritualwisdom literature available in the school libraries.</b>Children need a <b>strong foundation of moral values, the ability to handle emotionally turbulent situations, strong determination, and healthy habits, all theses needs can be effectively fulfilled by spiritual literature.</b> They also instill within us healthy pride about our own native culture & heritage and explain the deeper meanings behind them. Vidyartha is committed to gift this literature to the schools.</p>
                </div>
              </Grid>
              <Grid item sm={4}>
                <img src="/only pic-01.png" />
              </Grid>
            </Grid>             */}
                <img src="/only pic-03.png" />
                <div className="text">
                  <h1>What is the purpose of Vidyartha?</h1>
                  <p>The purpose of Vidyartha is to <b>make spiritualwisdom literature available in the school libraries.</b>Children need a <b>strong foundation of moral values, the ability to handle emotionally turbulent situations, strong determination, and healthy habits, all theses needs can be effectively fulfilled by spiritual literature.</b> They also instill within us healthy pride about our own native culture & heritage and explain the deeper meanings behind them. Vidyartha is committed to gift this literature to the schools.</p>
                </div>
          </div>
          <div className="slide2">            
            {/* <Grid container spacing={4}>
              <Grid item sm={6}>
                <div className="text">
                  <h1>How does Vidyartha work?</h1>
                  <p>The Vidyartha is a Crowdfunding platform where alumni can find their school & sponsor their choice amount to gift spiritual literature as gratitude for their schools. They can also share this Campaign with other alumni to quickly complete the target.</p>
                </div>
              </Grid>
              <Grid item sm={6}>
                <img src="/only pic-02.png" />
              </Grid>
            </Grid>             */}
                <img src="/only pic-04.png" />
                <div className="text">
                  <h1>How does Vidyartha work?</h1>
                  <p>The Vidyartha is a Crowdfunding platform where alumni can find their school & sponsor their choice amount to gift spiritual literature as gratitude for their schools. They can also share this Campaign with other alumni to quickly complete the target.</p>
                </div>
          </div>
        </Slider>
      </div>

      <div className="step-wrap">
      <h4>Donate in three simple steps</h4>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5} className="time-wrap">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot><img className="step-icon" src="/icon-1.svg" alt="icon one" /></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Search for your school</Typography>
                <Typography className="time-body">Search for your school by entering the location and name of the school.</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot><img className="step-icon" src="/icon-3.svg" alt="icon three" /></TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Click on donate</Typography>
                <Typography className="time-body">Your donations will safely reach to us and once completed, we will donate books to the school.</Typography>                
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator className="icon-2">
                <TimelineDot><img className="step-icon" src="/icon-2.svg" alt="icon two" /></TimelineDot>
              </TimelineSeparator>
              <TimelineContent className="content">
                <Typography className="time-head">Share with others</Typography>
                <Typography className="time-body">Help us in spreading this campaign and encourage others to donate.</Typography>                
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
        <Grid item xs={12} sm={5} className="phone">
          <img src="/phone.png"></img>
        </Grid>
      </Grid>
      </div>

      <div className="step-wrap gifting-slider">
      <Slider dots={true} autoplay={false} speed={2000}>
      <div className="slide1" style={{ textAlign: '-webkit-center' }}>
            <h4>Gifting books to principal of PGKM School in Pune</h4>
            <img width="80%" src='/pkgm_school.jpg' alt='picture_while_giving_books_to_pkgm_school' />
      </div>
      <div className="slide1" style={{ textAlign: '-webkit-center' }}>
        <h4>Gifting books to principal of PVG school in Pune</h4>
        <img width="80%" src='/PVG_School.jpg' alt='picture_while_giving_books_to_PVG_School' />
      </div>
      </Slider>
      </div>
      
      {/* <div className="video-wrap">
        <p>Watch this short video on importance of spiritual books.</p>
      </div> */}

      {/* <div className="item">
        <img src="/ques-2.jpeg" alt="image" />
      </div> */}

      {/* <div className="tm-wrap">
         <p>Testimonials</p>
      </div> */}

      <FAQ/>

      <Form ></Form>

    <Footer />
    </div>
  )
}