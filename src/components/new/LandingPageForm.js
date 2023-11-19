import { Button, TextField } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const LandingPageForm = () => {
  let autoCompleteRef = useRef(null);
  const router = useRouter();
  const [text, setText] = useState("");
  const [schools, setSchools] = useState([]);
  const [city, setCity] = useState("");
  const [finalPlace, setFinalPlace] = useState();
  const [cardVisibility, setCardVisibility] = useState("none"); //visible
  const [latitude, setLatitude] = useState(7.798);
  const [longitude, setLongitude] = useState(68.14712);

  function handleInput(e) {
    // console.log("The event value received is : ", e.target.value);

    if (e.target.value === "") {
      setSchools([]);
      setText(e.target.value);
    } else {
      setText(e.target.value);
      fetchSchoolsAutoComplete();
    }
  }
  const fetchSchoolsAutoComplete = () => {
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
      console.log(prediction, status);
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        setCardVisibility("block");

        let schoolsArr = [];

        for (var i = 0, prediction; (prediction = predictions[i]); i++) {
          if (
            prediction.types.includes("school") ||
            prediction.types.includes("university")
          ) {
            schoolsArr.push(prediction);
            // console.log(prediction.description)
          }
        }
        console.table(predictions);
        setSchools(() => {
          return schoolsArr.map((item) => item);
        });
      }
    });
  };

  function selectedValue(event, value) {
    if (value) {
      setFinalPlace(value);
      setText(value.name);
      localStorage.setItem("placeInfo", JSON.stringify(value));
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
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
      setCity(place.name);
      console.log(place);
    });

    setText("");
    setCardVisibility("none");
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
          content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically."
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
      <div className="landingpage-form">
        <div className="landingpage-form-container">
          <h2 className="landing-heading">
            Help us to donate books to your school library
          </h2>
          <form className="landing-form">
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
              options={schools}
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
                    label="Find your school"
                    onChange={handleInput}
                    variant="outlined"
                    sx={{ fontSize: "2rem" }}
                  />
                );
              }}
            />
            </div>
            <button
              className="submit-btn"
              onClick={() => {
                if (finalPlace) {
                  localStorage.setItem("visited", true);
                  router.push(
                    `/funds/${
                      finalPlace.place_id
                    }?name=${finalPlace.structured_formatting.main_text.replaceAll(
                      " ",
                      "-"
                    )}`
                  );
                } else {
                  alert("Please Select the school");
                }
              }}
            >
              Donate Now <ArrowForwardIos />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LandingPageForm;
