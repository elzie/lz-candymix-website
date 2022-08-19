import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // NavLink,
  Link,
} from 'react-router-dom';
import './cms.css';
import { AuthConsumer } from '../components/AuthContext';
import styled from 'styled-components';

import CmsWelcome from './CmsWelcome';
import CmsContent from './CmsContent';

const CmsContainer = styled.div`
  max-width: 100vw;
  min-height: 100vh;

  display: grid;
  grid-template-columns: 5vw 95vw;
`;

const CmsSideMenu = styled.div`
  background: #413659;
  vertical-align: top;
`;

const CmsLogo = styled.div`
  width: 100%;
  height: 10vw;
`;

const SideMenuBtn = styled.button`
  width: 100%;
  height: 5vw;
  background: #413659;
  border: 1px solid black;
  outline: none;
  color: white;
  cursor: pointer;
`;

const CmsContentArea = styled.div``;

class CmsFrontpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmsShowPage: 1,
    };
  }
  render() {
    return (
      <React.Fragment>
        <AuthConsumer>
          {({ logOut, logIn, user, authMessage }) => (
            <React.Fragment>
              {!user.id ? (
                <span>Du er ikke logget ind!</span>
              ) : (
                <Router>
                  <Switch>
                    <CmsContainer>
                      <CmsSideMenu>
                        <CmsLogo></CmsLogo>
                        <Link to="/cms/forside">
                          <SideMenuBtn>CMS Forside</SideMenuBtn>
                        </Link>
                        <Link to="/cms/content">
                          <SideMenuBtn>Rediger indhold</SideMenuBtn>
                        </Link>
                        <SideMenuBtn onClick={(e) => logOut(e)}>
                          Log out!
                        </SideMenuBtn>
                      </CmsSideMenu>
                      <CmsContentArea>
                        <Route
                          path="/cms"
                          exact
                          render={(props) => <CmsWelcome {...props} />}
                        />
                        <Route path="/cms/forside" component={CmsWelcome} />
                        <Route path="/cms/content" component={CmsContent} />
                      </CmsContentArea>
                    </CmsContainer>
                  </Switch>
                </Router>
              )}
            </React.Fragment>
          )}
        </AuthConsumer>
      </React.Fragment>
    );
  }
}

export default CmsFrontpage;
