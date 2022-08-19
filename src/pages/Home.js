import React from 'react';
import styled from 'styled-components';
import scrollToComponent from 'react-scroll-to-component';

import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Selections from '../components/Selections';
import FindUs from '../components/FindUs';
import Contact from '../components/Contact';
import BusinessDeal from '../components/BusinessDeal';
import Footer from '../components/Footer';

const SiteContainer = styled.div`
  width: 100%;
  background: papayawhip;
  margin: auto;
`;

class Home extends React.Component {
  scrollPage = (e) => {
    // console.log(e.target.id);
    switch (e.target.id) {
      case 'om-os':
        console.log('om os clicked');
        scrollToComponent(this.header, {
          offset: -142,
          align: 'top',
          duration: 1500,
        });
        break;
      case 'udvalg':
        console.log('udvalg clicked');
        scrollToComponent(this.selection, {
          offset: -142,
          align: 'top',
          duration: 1500,
        });
        break;
      case 'erhvervsaftale':
        console.log('erhvervsaftale clicked');
        scrollToComponent(this.businessdeal, {
          offset: -142,
          align: 'top',
          duration: 1500,
        });
        break;
      case 'lokationer':
        console.log('lokationer clicked');
        scrollToComponent(this.findus, {
          offset: -142,
          align: 'top',
          duration: 1500,
        });
        break;
      case 'kontakt':
        console.log('kontakt clicked');
        scrollToComponent(this.contact, {
          offset: -142,
          align: 'top',
          duration: 1500,
        });
        break;
      default:
        console.log('err');
    }
    // scrollToComponent(ref, {
    //   // options
    // });
  };
  render() {
    return (
      <React.Fragment>
        <SiteContainer>
          <Navigation scrollPage={this.scrollPage} />
          <Header
            ref={(section) => {
              this.header = section;
            }}
          />
          <Selections
            ref={(section) => {
              this.selection = section;
            }}
          />
          <FindUs
            ref={(section) => {
              this.findus = section;
            }}
          />
          <Contact
            ref={(section) => {
              this.contact = section;
            }}
          />
          <BusinessDeal
            ref={(section) => {
              this.businessdeal = section;
            }}
          />
          <Footer />
        </SiteContainer>
      </React.Fragment>
    );
  }
}

export default Home;
