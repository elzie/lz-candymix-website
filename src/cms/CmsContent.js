import React from 'react';
import styled from 'styled-components';
import {
  //   BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  //   Link,
} from 'react-router-dom';

// import { infoRef, pagesRef, menuRef } from '../firebase';

import SiteInfo from './SiteInfo';
import Header from './Header';
import Selections from './Selections';
import BusinessDeal from './BusinessDeal';
import Locations from './Locations';
// import Contact from './Contact';

const CmsContentContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 80vw;
  height: calc(100% - 5vw);
  //   background: #413659;
`;
const CmsContentMenu = styled.div`
  border-right: 1px solid black;
  height: 100vh;
  background: white;
  ul {
    margin: 0;
    padding: 15px;
    list-style-type: none;
  }
`;
const Spacer = styled.div`
  background: #413659;
  height: 10vw;
  width: 100%;
  border-bottom: 1px solid #aaa;
  background-image: url('https://www.smmarketing.dk/Design/logoW.svg');
  background-size: 90% 90%;
  background-position: center center;
  background-repeat: no-repeat;
`;
const Spacer2 = styled.div`
  background: #413659;
  height: calc(10vw - 34px);
  width: 100%;
`;
const CmsContentArea = styled.div`
  //   margin-top: calc(10vw - 34px);
`;

class CmsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteInfo: [],
      pages: [],
      menu: [],
    };
  }

  render() {
    return (
      <CmsContentContainer>
        <CmsContentMenu>
          <Spacer />
          <ul>
            <li>
              <NavLink to={'/cms/content/siteinfo'} activeClassName={'active'}>
                Site info
              </NavLink>
            </li>
            <li>
              <NavLink to={'/cms/content/header'} activeClassName={'active'}>
                Om os
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/cms/content/selections'}
                activeClassName={'active'}
              >
                Udvalg
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/cms/content/businessdeal'}
                activeClassName={'active'}
              >
                Erhvervsaftale
              </NavLink>
            </li>
            <li>
              <NavLink to={'/cms/content/locations'} activeClassName={'active'}>
                Lokationer
              </NavLink>
            </li>
          </ul>
        </CmsContentMenu>
        <CmsContentArea>
          <Spacer2 />
          <Switch>
            <Route path="/cms/content" exact render={(props) => <SiteInfo />} />
            <Route
              exact
              path="/cms/content/siteinfo/"
              render={(props) => <SiteInfo />}
            />
            <Route
              exact
              path="/cms/content/header/"
              render={(props) => <Header />}
            />
            <Route
              exact
              path="/cms/content/selections/"
              render={(props) => <Selections />}
            />
            <Route
              exact
              path="/cms/content/businessdeal/"
              render={(props) => <BusinessDeal />}
            />
            <Route
              exact
              path="/cms/content/locations/"
              render={(props) => <Locations />}
            />
          </Switch>
        </CmsContentArea>
      </CmsContentContainer>
    );
  }
}

export default CmsContent;
