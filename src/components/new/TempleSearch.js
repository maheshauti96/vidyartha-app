import { Button, ImageList, ImageListItem, TextField } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { getSchoolInfo } from "../../services/service";
import TempleInfo from "./TempleInfo";

const TempleSearch = ({ orgCode }) => {
  let autoCompleteRef = useRef(null);
  const [text, setText] = useState("");
  const [temples, setTemples] = useState([]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(7.798);
  const [longitude, setLongitude] = useState(68.14712);
  const [templeId , setTempleId] = useState('')
  const [templeInfo , setTempleInfo] = useState()
  function handleInput(e) {

    if (e.target.value === "") {
      setTemples([]);
      setText(e.target.value);
    } else {
      setText(e.target.value);
      fetchtemplesAutoComplete();
    }
  }
  const fetchtemplesAutoComplete = () => {
    var service = new window.google.maps.places.AutocompleteService();

    var pyrmont = new window.google.maps.LatLng(latitude, longitude);

    var request = {
      input: text,
      types: ["establishment"],
      componentRestrictions: { country: "in" },
      location: pyrmont,
      radius: "500",
    };

    

    service.getPlacePredictions(request, function (predictions, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {

        let templesArr = [];

        for (var i = 0, prediction; (prediction = predictions[i]); i++) {
          if (
            prediction.types.includes("hindu_temple")
          ) {
            templesArr.push(prediction);
          }
        }
        setTemples(() => {
          return templesArr.map((item) => item);
        });
      }
    });
  };

  function fetchSchoolDetails(placeid) {
        // from google
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
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setTempleInfo(place);
              
            }
            
          });
        } catch (error) {
        }
      }

  function selectedValue(event, value) {
    if (value) {
      setText(value.name);
      fetchSchoolDetails(value.place_id)
      setTempleId(value.place_id)
      
    }
  }
  useEffect(() => {

  } , [])
  useEffect(() => {
    let autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "in" } }
    );

    // autoComplete.setFields(["address_components", "formatted_address", "name"]);

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
      setCity(place.name);
    });

    setText("");
  }, []);

  return (
    <>
      <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places&callback=Function.prototype"></script>
        <meta
          property="title"
          content="Vidyartha | Help Us To Donate Books For Your School Library!"
          key="title"
        />
        <meta
          name="description"
          content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with temples around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically."
        />
        <meta property="image" content="/banner-bg-original.png" />
        <meta
          property="og:title"
          content="Vidyartha | Help Us To Donate Books For Your School Library!"
          key="title"
        />
        <meta
          name="og:description"
          content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically."
        />
        <meta property="og:image" content="/banner-bg-original.png" />
      </Head>
      <div className="temple-form-main" id = "temple-search">
        <div className="temple-form-container">
          <h2 className="temple-heading">
            Search Temple
          </h2>
          <form className="temple-form">
            <TextField
              type="text"
              variant="outlined"
              label="Find your city"
              required
              inputRef={autoCompleteRef}
            />
            <div>
            <Autocomplete
              disablePortal
              sx = {{width : '346px'}}
              options={temples}
              noOptionsText=""
              // open={true}
              onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) =>
                option.structured_formatting.main_text.toString()
              }
              renderOption={(option) => {
                return (
                  <div style={{ textAlign: "left", fontSize: "1.1rem" }}>
                    <p style={{ margin: "0px" }}>
                      {option.structured_formatting.main_text}
                    </p>
                    <p
                      style={{
                        margin :"0px",
                        color: "grey",
                        fontSize: "0.9rem",
                      }}
                    >
                      {" "}
                      {option.structured_formatting.secondary_text}
                    </p>
                  </div>
                );
              }}
              
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Find Temple"
                    onChange={handleInput}
                    variant="outlined"
                    sx={{ fontSize: "2rem" }}
                  />
                );
              }}
            />
            </div>
            
          </form>
        </div>
      </div>
      {
        templeInfo && (<TempleInfo templeInfo={templeInfo} />
        )
      }
      <div style={{ visibility: 'hidden' }} id="map"></div>
    </>
  );
};

export default TempleSearch;
