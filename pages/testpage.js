import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
  
} from 'react-places-autocomplete';
import Head from 'next/head';

const LocationSearchInput = () => {
  const [address, setAddress] = useState('');
  const [city , setCity] = useState('')
  const [placeId , setPlaceId] = useState()

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <>
        <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places&types=(cities)&callback=Function.prototype"></script>
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
        <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{
            location: new google.maps.LatLng(20.5937, 78.9629), // Updated coordinates for India
            radius: 2000,
            types: ['(cities)']
          }}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
            <input
                {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
                })}
                value = {address}

            />
            <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                    <div
                    {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                    })}
                    onClick={() => {
                        console.log(suggestion)
                        setAddress(suggestion.description)
                    }}
                    >
                    <span>{suggestion.description}</span>
                    </div>
                );
                })}
            </div>
            <button onClick={() => {
                console.log(suggestions)
            }}>Console</button>
            </div>
        )}
        </PlacesAutocomplete>
        <PlacesAutocomplete
        value={city}
        onChange={(newCity) => setCity(newCity)}
        onSelect={(selectedAddress) => {
            geocodeByAddress(selectedAddress)
              .then((results) => getLatLng(results[0]))
              .then((latLng) => console.log('Success', latLng))
              .catch((error) => console.error('Error', error));
          }}
        searchOptions={{
            location: new google.maps.LatLng(20.5937, 78.9629), // Updated coordinates for India
            radius: 2000,
            types: ['school']
          }}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
            <input
                {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
                })}
                value = {city}

            />
            <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                    <div
                    {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                    })}
                    onClick={() => {
                        console.log(suggestion)
                        setAddress(suggestion.description)
                        setPlaceId(suggestion.placeId)

                    }}
                    >
                    <span>{suggestion.description}</span>
                    </div>
                );
                })}
            </div>
            <button onClick={() => {
                getGeocode({address}).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("Coordinates: ", { lat, lng });
                    });
            }}>Console</button>
            </div>
        )}
        </PlacesAutocomplete>
    </>
  );
};

export default LocationSearchInput;
