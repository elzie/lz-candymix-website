import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
  Geocoder,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
// https://www.npmjs.com/package/react-geocode
// https://stackoverflow.com/questions/32994634/this-api-project-is-not-authorized-to-use-this-api-please-ensure-that-this-api
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse#maps_geocoding_reverse-javascript
/**
 * Navigate to Google Maps -> APIs
 * Search for Geocoding and click on Google Maps Geocoding API -> Enable API. Do the same thing for Geolocating
 */
class LocationPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.modalNewOpen !== prevProps.modalNewOpen) {
      if (!this.props.modalNewOpen) {
        console.log('modal closed');
        this.setState({
          lat: '',
          lng: '',
          time: '',
          map: null,
        });
        this.forceUpdate();
      }
    }
  }
  containerStyle = {
    width: '300px',
    height: '300px',
  };

  center = {
    lat: 56.1478994,
    lng: 10.1791978,
  };

  options = {
    mapTypeControl: false,
    disableDefaultUI: true,
    zoomControl: true,
    draggableCursor: 'crosshair',
  };
  setLatLng = (e) => {
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
    this.props.getCoordinates(this.state.lat, this.state.lng);
    this.geocodeLatLng(this.state.lat, this.state.lng);
  };
  geocodeLatLng = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
        const splitAddress = address.split(',');
        console.log(splitAddress[0]);
        console.log(splitAddress[1]);

        if (this.props.addressBySelect === true) {
          const addressObject = {
            street: splitAddress[0],
            city: splitAddress[1],
          };
          setTimeout(() => {
            this.props.getAddressFromCoords(addressObject);
          }, 200);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    return (
      <div>
        <div>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
            <GoogleMap
              mapContainerStyle={this.containerStyle}
              center={this.center}
              zoom={11}
              options={this.options}
              onClick={(event) => {
                this.setLatLng(event);
              }}
            >
              <Marker
                key={this.state.time}
                position={{
                  lat: parseFloat(this.state.lat),
                  lng: parseFloat(this.state.lng),
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
  }
}

export default LocationPicker;
