import Head from 'next/head';
import { Button, TextField } from "@material-ui/core";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get, debounce } from 'lodash';
import { ArrowForwardIos } from '@material-ui/icons';
import { useRouter } from 'next/router'

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
  }, 500);

  function selectedValue(event, value) {

    if(value){
      console.log(value)
      setFinalPlace(value)
      setText(value.name)
      localStorage.setItem('placeInfo', JSON.stringify(value));
    }
  }

  function handleInput(e) {

    console.log("The event value received is : ", e.target.value);

    setLoading(true);

    if (e.target.value === "") {
      setSchools([])
      setText(e.target.value);
      //       setCardVisibility("none");
      setLoading(false);
    }
    else {
      setText(e.target.value);
      fetchSchools();
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png"/>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
      </Head>
      <main className="main-banner">
        <div className="banner-wrap center-align position-relative">
          <img className="position-absolute logo-image" height="134px" width="248px" src="/white-logo.webp" />
          <h1>Help Us To Donate Books For Your School!</h1>
          <div className="search-box-wrap">
            <TextField label="Find your city" inputRef={autoCompleteRef} variant="outlined" />
            <Autocomplete
              disablePortal
              noOptionsText={'No Options'}
              width={'346px'}
              options={schools}
              onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) => option.name.toString()}
              sx={{ width: 346 }}
              renderInput={(params) => {
                console.log('params...',params)
               return <TextField {...params} label="Find your school"
                onChange={handleInput} variant="outlined"
              />
              } }
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
        <div id="map"></div>
      </main>

      <footer>
        <div className="foot-wrap center-align">
          <p><span>Terms & Conditions</span><span>Privacy Policy</span><span>Return Policy</span></p>
        </div>
      </footer>
    </div>
  )
}
