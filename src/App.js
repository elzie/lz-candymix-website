import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './components/AuthContext';
import './App.css';
import styled from 'styled-components';

import Home from './pages/Home';
import ReadMore from './pages/ReadMore';
import Login from './pages/Login';

import CmsFrontpage from './cms/App';

const SiteContainer = styled.div`
  width: 100%;
  background: papayawhip;
  margin: auto;
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <SiteContainer></SiteContainer>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/read-more"
              render={(props) => <ReadMore {...props} />}
            />
            <AuthProvider>
              <Route
                exact
                path="/cms"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/cms/forside"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/siteinfo"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/header"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/selections"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/businessdeal"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/locations"
                render={(props) => <CmsFrontpage {...props} />}
              />
              <Route
                exact
                path="/cms/content/contact"
                render={(props) => <CmsFrontpage {...props} />}
              />
            </AuthProvider>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
