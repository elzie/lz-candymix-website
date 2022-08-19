import React from 'react';
import { pagesRef } from '../firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderBG from './../assets/gfx/temp-header-background.svg';

const HeaderContainer = styled.div`
  height: 600px;
  background: #ffffff url(${HeaderBG});
  background-repeat: no-repeat;
  background-position: 50% 300%;
  z-index: 5;
  height: 100vh;
`;
const Headline = styled.h1`
  padding-top: 250px;
  margin: auto;
  text-align: center;
  width: 600px;
  text-transform: uppercase;
  color: #cc1433;
  font-size: 40px;
  font-family: 'Candal', sans-serif;
`;
const Teaser = styled.div`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  margin: auto;
  width: 650px;
  strong {
    font-weight: bold !important;
  }
`;
const ReadMore = styled.button`
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  width: 235px;
  height: 50px;
  margin: auto;
  background: #cc1433;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    background: rgba(204, 20, 51, 0.8);
  }
`;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerData: [],
    };
    this.getHeaderData();
  }
  getHeaderData = async () => {
    await pagesRef
      .doc('header')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText1: doc.data().teaserText1,
            teaserText2: doc.data().teaserText2,
            buttonText: doc.data().buttonText,
          };
          this.setState({ headerData: data });
          console.log(this.state.headerData.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };
  render() {
    const {
      title,
      teaserText1,
      teaserText2,
      buttonText,
    } = this.state.headerData;
    return (
      <React.Fragment>
        <HeaderContainer>
          <Headline>{title}</Headline>
          <Teaser>
            <div dangerouslySetInnerHTML={{ __html: teaserText1 }}></div>
            <div dangerouslySetInnerHTML={{ __html: teaserText2 }}></div>
            <Link to="/read-more">
              <ReadMore>{buttonText}</ReadMore>
            </Link>
          </Teaser>
        </HeaderContainer>
      </React.Fragment>
    );
  }
}

export default Header;
