import { Button, TextField } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import FindSchoolModal from "./FindSchoolModal";

const LandingPageForm = ({ orgCode }) => {
  let autoCompleteRef = useRef(null);
  const router = useRouter();
  const [text, setText] = useState("");
  const [schools, setSchools] = useState([]);
  const [city, setCity] = useState("");
  const [finalPlace, setFinalPlace] = useState();
  const [modalVisibility, setModalVisibility] = useState(false); //visible
  const [latitude, setLatitude] = useState(7.798);
  const [longitude, setLongitude] = useState(68.14712);
  const [pageToken, setPageToken] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const paginationRef = useRef(null);
  function handleInput(e) {
    setText(e.target.value);
    fetchSchoolsAutoComplete();
  }
  const fetchSchoolsAutoComplete = () => {
    var service = new window.google.maps.places.AutocompleteService();

    var pyrmont = new window.google.maps.LatLng(latitude, longitude);

    var request = {
      input: text ? text : "school",
      types: ["establishment"],
      componentRestrictions: { country: "in" },
      location: pyrmont,
      radius: "500",
    };

    service.getPlacePredictions(request, function (predictions, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        let schoolsArr = [];

        for (var i = 0, prediction; (prediction = predictions[i]); i++) {
          if (
            prediction.types.includes("school") ||
            prediction.types.includes("university") ||
            prediction.types.includes("hindu_temple")
          ) {
            schoolsArr.push(prediction);
          }
        }
        setSchools(() => {
          return schoolsArr.map((item) => item);
        });
      }
    });
  };

  function fetchSchoolsBySelect(city) {
    // from google
    const pyrmont = new google.maps.LatLng(7.798, 68.14712);
    try {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 15,
      });
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: city.geometry.location,
          radius: "500",
          types: ["school", "university", "hindu_temple"],
          pagetoken: pageToken,
        },
        (results, status, pagination) => {
          if (pagination.hasNextPage) {
            paginationRef.current = pagination;
            setShowLoadMore(true);
          } else {
            paginationRef.current = null;
            setShowLoadMore(false);
          }

          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let filteredSchools = results.filter(
              (school) => !schools.includes(school)
            );

            setSchools((prev) => [...prev, ...filteredSchools]);
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  // useEffect(() => {
  //   fetchSchoolsBySelect(city)
  // } , [pageToken])
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
      setCity(place);
      fetchSchoolsBySelect(place);
    });

    setText("");
  }, []);
  console.log("autoCompleteRef.current.value==>", autoCompleteRef?.current?.value)

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
              className="city-input"
              required
              inputRef={autoCompleteRef}
            />

            <Autocomplete
              sx={{ width: "346px" }}
              options={schools}
              className="school-input"
              noOptionsText="No Schools"
              // open={true}
              onChange={(event, value) => selectedValue(event, value)}
              getOptionLabel={(option) =>
                option.structured_formatting
                  ? option.structured_formatting.main_text.toString()
                  : option.name
              }
              renderOption={(option) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "1.1rem",
                      width: "100%",
                    }}
                  >
                    <p style={{ margin: "0px" }}>
                      {option.structured_formatting
                        ? option.structured_formatting.main_text
                        : option.name}
                    </p>
                    <p
                      style={{
                        margin: "0px",
                        color: "grey",
                        fontSize: "0.9rem",
                      }}
                    >
                      {" "}
                      {option.structured_formatting
                        ? option.structured_formatting.secondary_text
                        : option.vicinity}
                    </p>
                  </div>
                );
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Find your school"
                    id="school-autocomplete"
                    onChange={handleInput}
                    variant="outlined"
                    className="school-input"
                    sx={{ fontSize: "2rem" }}
                  />
                );
              }}
            />
            <div>
              {city && schools.length > 0 && (
                <div
                  role="button"
                  className="find-school-btn"
                  onClick={() => {
                    setModalVisibility(true);
                  }}
                >
                  Don't remember your school? Find here!
                </div>
              )}
            </div>
            <button
              className="submit-btn"
              disabled={!(finalPlace && finalPlace.place_id)}
              onClick={(e) => {
                e.preventDefault();
                if (finalPlace) {
                  localStorage.setItem("visited", true);
                  router.push(
                    `${orgPath}/campaigns/${
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
      {modalVisibility && (
        <FindSchoolModal
          pageToken={pageToken}
          setPageToken={setPageToken}
          setShow={setModalVisibility}
          schools={schools}
          orgCode={orgCode}
          showLoadMore={showLoadMore}
          onLoadMore={() => {
            paginationRef.current?.nextPage();
          }}
        />
      )}
      <div style={{ visibility: "hidden" }} id="map"></div>
    </>
  );
};

export default LandingPageForm;
