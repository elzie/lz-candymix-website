import React from 'react';
import styled from 'styled-components';
import { infoRef } from '../firebase';

import DirectionsIcon from './../assets/gfx/directions-icon-red.svg';
import LogoTop from './../assets/gfx/candymix-logo-color.svg';
import PhoneImage from './../assets/gfx/candymix-phone-icon.svg';
import EmailImage from './../assets/gfx/candymix-email-icon.svg';

const FooterBar = styled.div`
  z-index: 10;
  position: relative;
  background: white;
  width: 100%;
  height: 156px;
  color: #cc1433;
  font-family: 'Candal', sans-serif;
  padding-top: 20px;
`;
const Banner = styled.div`
  margin: auto;
  width: 1275px;
  //   display: flex;
  //   justify-content: center;
  @media (max-width: 1300px) {
    width: 900px;
    margin: auto;
  }
`;
const PhoneAndEmail = styled.div`
  display: flex;
  justify-content: center;
`;
const Phone = styled.div`
  display: flex;
  align-items: center;
  margin-top: 45px;
  margin-left: 50px;
`;
const PhoneIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 10px;
  background: url(${PhoneImage});
  background-size: cover;
`;
const Logo = styled.div`
  margin: auto;
  width: 370px;
  height: 100px;
  background: url(${LogoTop});
  background-size: cover;
  margin-top: 25px;
`;
const Email = styled.div`
  display: flex;
  align-items: center;
  margin-top: 45px;
`;
const EmailIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 10px;
  background: url(${EmailImage});
  background-size: cover;
`;
const Menu = styled.div`
  margin: auto;
  width: 1275px;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (max-width: 1300px) {
    width: 900px;
    margin-top: 50px;
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
const FooterBottom = styled.div`
  background: #cc1433;
  height: 50px;
`;
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
    this.getInfoData();
  }
  getInfoData = async () => {
    // Get texts for locations
    await infoRef
      .doc('information')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            email: doc.data().email,
            phonenr: doc.data().phonenr,
          };
          this.setState({ companyInfo: data });
          console.log(this.state.companyInfo);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };
  render() {
    const { email, phonenr } = this.state.companyInfo;
    return (
      <React.Fragment>
        <FooterBar>
          <Banner>
            <Logo></Logo>
            <PhoneAndEmail>
              <Phone>
                {phonenr}
                <PhoneIcon></PhoneIcon>
              </Phone>
              <Email>
                <EmailIcon></EmailIcon>
                {email}
              </Email>
            </PhoneAndEmail>
          </Banner>
          <Menu>
            <div>
              <LocationIcon></LocationIcon>
              <LocationHeader>City Vest</LocationHeader>
              <LocationAddress>
                <p>
                  Gudrunsvej 7 <br /> 8200 Brabrand
                </p>
              </LocationAddress>
            </div>
            <div>
              <LocationIcon></LocationIcon>
              <LocationHeader>City Vest</LocationHeader>
              <LocationAddress>
                <p>
                  Gudrunsvej 7 <br /> 8200 Brabrand
                </p>
              </LocationAddress>
            </div>
            <div>
              <LocationIcon></LocationIcon>
              <LocationHeader>City Vest</LocationHeader>
              <LocationAddress>
                <p>
                  Gudrunsvej 7 <br /> 8200 Brabrand
                </p>
              </LocationAddress>
            </div>
            <div>
              <LocationIcon></LocationIcon>
              <LocationHeader>City Vest</LocationHeader>
              <LocationAddress>
                <p>
                  Gudrunsvej 7 <br /> 8200 Brabrand
                </p>
              </LocationAddress>
            </div>
            <div>
              <LocationIcon></LocationIcon>
              <LocationHeader>City Vest</LocationHeader>
              <LocationAddress>
                <p>
                  Gudrunsvej 7 <br /> 8200 Brabrand
                </p>
              </LocationAddress>
            </div>
          </Menu>
          <FooterBottom></FooterBottom>
        </FooterBar>
      </React.Fragment>
    );
  }
}

export default Footer;
