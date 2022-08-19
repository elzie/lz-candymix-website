import React from 'react';
import styled from 'styled-components';
import { pagesRef } from '../firebase';
import VendingIcon from './../assets/gfx/vending-machine.svg';
import DirectionsIcon from './../assets/gfx/directions-icon.svg';

const FindUsContainer = styled.div`
  background: #fbecef;
  margin-top: -100px;
`;
const VendingMachine = styled.div`
  padding: 50px 0 25px 0;
  background: url(${VendingIcon});
  background-repeat: no-repeat;
  background-position: center 85%;
  width: 100px;
  height: 100px;
  margin: auto;
`;
const Headline = styled.div`
  margin: auto;
  text-align: center;
  width: 600px;
  text-transform: uppercase;
  color: #cc1433;
  font-size: 40px;
  font-family: 'Candal', sans-serif;
`;
const GridContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  justify-content: space-evenly;
  padding-bottom: 50px;
  @media (max-width: 1300px) {
    width: 900px;
    grid-template-columns: 200px 200px 200px;
  }
`;
const Location = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 0 0 46px;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center%;
  @media (max-width: 1300px) {
    width: 200px;
    height: 200px;
  }
  // rgb(204, 20, 51)
`;

const LocationOverlay = styled.div`
  text-align: center;
  padding-top: 50px;
  width: 300px;
  height: 250px;
  border-radius: 10px;
  color: white;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  @media (max-width: 1300px) {
    width: 200px;
    height: 190px;
    padding-top: 10px;
  }
  &:hover {
    opacity: 1;
    background: rgba(204, 20, 51, 0.9);
    cursor: pointer;
  }
`;
const LocationIcon = styled.div`
  width: 56px;
  height: 43px;
  margin: auto;
  background: url(${DirectionsIcon});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center%;
`;
const LocationHeader = styled.div`
  font-family: 'Candal', sans-serif;
  font-size: 22px;
`;
const LocationAddress = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: light;
  font-size: 18px;
`;
const GetDirections = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  margin-top: 60px;
  @media (max-width: 1300px) {
    margin-top: 20px;
  }
`;

class FindUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationsData: [],
      vendingLocations: [],
    };
    this.getLocationsData();
  }

  getLocationsData = async () => {
    // Get texts for locations
    await pagesRef
      .doc('locations')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
          };
          this.setState({ locationsData: data });
          console.log(this.state.locationsData.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });

    // Get location vendingmachines

    await pagesRef
      .doc('locations')
      .collection('vendingMachines')
      .get()
      .then((machine) => {
        machine.forEach((doc) => {
          const machine = {
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            locationTitle: doc.data().locationTitle,
            locationStreet: doc.data().locationStreet,
            locationCity: doc.data().locationCity,
            locationCoordinates: doc.data().locationCoordinates,
          };

          this.setState({
            vendingLocations: [machine, ...this.state.vendingLocations],
          });
        });
      });
  };
  getDirectionsClick = () => {
    alert('Uh-ooh, you clicked the box!');
  };

  render() {
    const { title /*teaserText*/ } = this.state.locationsData;
    const { vendingLocations } = this.state;
    return (
      <React.Fragment>
        <FindUsContainer>
          <VendingMachine></VendingMachine>
          <Headline>{title}</Headline>
          <GridContainer>
            {vendingLocations.map((location) => (
              <Location
                key={location.id}
                style={{ backgroundImage: `url(${location.imageUrl})` }}
              >
                <LocationOverlay onClick={this.getDirectionsClick}>
                  <LocationIcon></LocationIcon>
                  <LocationHeader>{location.locationTitle}</LocationHeader>
                  <LocationAddress>
                    <p>
                      {location.locationStreet} <br /> {location.locationCity}
                    </p>
                  </LocationAddress>
                  <GetDirections>Find vej</GetDirections>
                </LocationOverlay>
              </Location>
            ))}
            {/*  Add more to database  */}
          </GridContainer>
        </FindUsContainer>
      </React.Fragment>
    );
  }
}

export default FindUs;
