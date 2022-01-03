import Head from 'next/head';
import { Accordion, AccordionSummary, Button, TextField, Typography, AccordionDetails } from "@material-ui/core";
import Image from 'next/image';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get, debounce } from 'lodash';
import { ArrowForwardIos, ExpandMore } from '@material-ui/icons';
import { useRouter } from 'next/router'
import { faqs } from '../src/constants/faqs';
import Form from '../src/components/Form'

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
        <meta property="title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
        <meta name="description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="image" content="/banner-bg-original.png" />
        <meta property="og:title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
        <meta name="og:description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="og:image" content="/banner-bg-original.png" />
      </Head>
      <main className="main-banner">
        <div className="banner-wrap center-align position-relative">
          <img className="position-absolute logo-image" height="104px" width="191px" src="/white-logo.webp" />
          <h1>Help Us To Donate Books For Your School!</h1>
          <div className="search-box-wrap">
            <TextField label="Find your city" inputRef={autoCompleteRef} variant="outlined" />
            <Autocomplete
              disablePortal
              noOptionsText={'No Options'}
              width={'346px'}
              options={schools}
              // open={true}
              onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) => option.structured_formatting.main_text.toString()}
              renderOption={(option) => {
                return <div style={{ textAlign: "left", fontSize: "1.1rem" }}><p style={{ margin: "0px" }}>{option.structured_formatting.main_text}</p><p style={{ color: "grey", margin: "0px", fontSize: "0.9rem" }}> {option.structured_formatting.secondary_text}</p></div>;
              }}
              sx={{ width: 346 }}
              renderInput={(params) => {
                // console.log('params...', params)
                return <TextField {...params} label="Find your school"
                  onChange={handleInput} variant="outlined"
                />
              }}
            />
            <Button
              className="primary-button"
              onClick={() => {
                if (finalPlace) {
                  router.push(`/fundraiser/${finalPlace.place_id}`);
                } else {
                  alert('Please Select the school')
                }
              }}
              variant="contained"
              endIcon={<ArrowForwardIos />}
            >Donate Now</Button>
          </div>
        </div>
        <div className="ques-wrap">
          <p>FAQ's</p>
          {faqs.map((rec, index) => (
            <Accordion>
              <AccordionSummary className="acc-sum"
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="accor">{`${index + 1}. ${rec.question}`}</Typography>
              </AccordionSummary>
              <AccordionDetails className="acc-det">
                <Typography className="acc-par">
                  {`${rec.answer}`}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
          }</div>
//         <div className="cont-wrap">
//           <h4>Contact Us</h4>
//           <div className="form1-wrap">
//             <TextField className="id1" label="Name" variant="outlined" />
//             <br />
//             <TextField className="id1" label="Email" variant="outlined" />
//             <br />
//             <textarea className="id2" type="text" placeholder="Feedback" cols="auto" rows="10" />
//             <br />
//             <Button className="btn1" variant="contained">
//               <p>Submit</p>
//             </Button>
//           </div>
//         </div>

<Form> </Form>
        <div id="map"></div>
        <footer>
          <div className="foot-wrap center-align">
            <p>
              <Link href="/terms"><span style={{ cursor: "pointer" }}>Terms & Conditions</span></Link>
              <Link href="/privacypolicy"><span style={{ cursor: "pointer" }}>Privacy Policy</span></Link>
              <Link href="/returnpolicy"><span style={{ cursor: "pointer" }}>Return Policy</span></Link>
            </p>
          </div>
        </footer>
      </main>

    </div>
  )
}
