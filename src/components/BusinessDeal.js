import React from 'react';
import styled from 'styled-components';
import { pagesRef } from '../firebase';

import BusinessIcon from './../assets/gfx/candymix-businessdeal-icon.svg';

const BusinessDealContainer = styled.div`
  //   height: 600px;
  background: #fbecef;
  padding-bottom: 50px;
`;

const BusinessDealIcon = styled.div`
  padding: 50px 0 25px 0;
  background: url(${BusinessIcon});
  background-repeat: no-repeat;
  background-position: center 85%;
  width: 100px;
  height: 100px;
  margin: auto;
`;
const Headline = styled.h1`
  margin: auto;
  text-align: center;
  width: 700px;
  text-transform: uppercase;
  color: #cc1433;
  font-size: 40px;
  font-family: 'Candal', sans-serif;
`;
const Teaser = styled.div`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  margin: auto;
  width: 750px;
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
class BusinessDeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessData: [],
    };
    this.getBusinessData();
  }
  getBusinessData = async () => {
    await pagesRef
      .doc('businessdeal')
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          const data = {
            id: doc.id,
            title: doc.data().title,
            teaserText1: doc.data().teaserText1,
            teaserText2: doc.data().teaserText2,
          };
          this.setState({ businessData: data });
          console.log(this.state.businessData.title);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  };
  render() {
    const { title, teaserText1, teaserText2 } = this.state.businessData;
    return (
      <React.Fragment>
        <BusinessDealContainer>
          <BusinessDealIcon></BusinessDealIcon>
          <Headline>{title}</Headline>
          <Teaser>
            <div dangerouslySetInnerHTML={{ __html: teaserText1 }}></div>
            <div dangerouslySetInnerHTML={{ __html: teaserText2 }}></div>
            <ReadMore>LÆS MERE</ReadMore>
          </Teaser>
        </BusinessDealContainer>
      </React.Fragment>
    );
  }
}

export default BusinessDeal;
