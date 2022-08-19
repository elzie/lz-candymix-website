import React from 'react';
import styled from 'styled-components';
import { infoRef } from '../firebase';

import LogoTop from './../assets/gfx/candymix-logo-color.svg';
import PhoneImage from './../assets/gfx/candymix-phone-icon.svg';
import EmailImage from './../assets/gfx/candymix-email-icon.svg';

const NavBar = styled.div`
  z-index: 10;
  position: fixed;
  background: white;
  width: 100%;
  height: 15vh;
  color: #cc1433;
  font-family: 'Candal', sans-serif;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px 2px 5px 0px rgba(153, 153, 153, 1);
`;
const Banner = styled.div`
  margin: auto;
  width: 1275px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1300px) {
    width: 900px;
  }
`;
const Phone = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;
const PhoneIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background: url(${PhoneImage});
  background-size: cover;
`;
const Logo = styled.div`
  width: 224px;
  height: 60px;
  background: url(${LogoTop});
  background-size: cover;
  margin-top: 25px;
`;
const Email = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;
const EmailIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  background: url(${EmailImage});
  background-size: cover;
`;
const Menu = styled.div`
  margin: auto;
  width: 1275px;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  margin-top: 10px;
  @media (max-width: 1300px) {
    width: 900px;
  }
`;
const MenuBtn = styled.div`
  color: #cc1433;
  font-family: 'Candal', sans-serif;
  cursor: pointer;
`;

class Navigation extends React.Component {
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
        <NavBar>
          <Banner>
            <Phone>
              <PhoneIcon></PhoneIcon>
              {phonenr}
            </Phone>
            <Logo></Logo>
            <Email>
              {email}
              <EmailIcon></EmailIcon>
            </Email>
          </Banner>
          <Menu>
            <MenuBtn
              id='om-os'
              onClick={(e) => {
                this.props.scrollPage(e);
              }}
            >
              Om os
            </MenuBtn>
            <MenuBtn
              id='udvalg'
              onClick={(e) => {
                this.props.scrollPage(e);
              }}
            >
              Udvalg
            </MenuBtn>
            <MenuBtn
              id='erhvervsaftale'
              onClick={(e) => {
                this.props.scrollPage(e);
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Erhvervsaftale
            </MenuBtn>
            <MenuBtn
              id='lokationer'
              onClick={(e) => {
                this.props.scrollPage(e);
              }}
            >
              Lokationer
            </MenuBtn>
            <MenuBtn
              id='kontakt'
              onClick={(e) => {
                this.props.scrollPage(e);
              }}
            >
              Kontakt
            </MenuBtn>
          </Menu>
        </NavBar>
      </React.Fragment>
    );
  }
}

export default Navigation;
