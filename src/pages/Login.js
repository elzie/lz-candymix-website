import React from 'react';
import styled from 'styled-components';
import CmsFrontpage from '../cms/App';
import { AuthConsumer } from '../components/AuthContext';

const GivePadding = styled.div`
  padding-top: 100px;
`;

const LoginContainer = styled.div`
  width: 500px;
  height: 250px;
  border: 2px solid #f4ced4;
  border-radius: 10px;
  margin: auto;
  h1 {
    margin: auto;
    text-align: center;
    text-transform: uppercase;
    color: #cc1433;
    font-size: 40px;
    font-family: 'Candal', sans-serif;
  }
  input {
    margin-left: 10%;
    width: 80%;
    padding: 12px;
    border: 1px solid #cc1433;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }
  input:focus,
  select:focus {
    background: #fae8eb;
    outline: none;
  }
  input:hover {
    background: #fae8eb;
    outline: none;
  }
`;
const LoginButton = styled.div`
  background: #fae8eb;
  text-align: center;
  margin: auto;
  font-size: 22px;
  cursor: pointer;
  width: 50%;
  padding: 8px;
  border: 1px solid #cc1433;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;
  :focus {
    outline: none;
  }
  :hover {
    background: rgba(204, 20, 51, 0.5);
  }
`;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  emailInput = React.createRef();
  passwordInput = React.createRef();

  render() {
    return (
      <AuthConsumer>
        {({ logOut, logIn, user, authMessage }) => (
          <React.Fragment>
            {!user.id ? (
              <GivePadding>
                <LoginContainer>
                  <h1>sm-Cms Login</h1>
                  <form className="sign-up-form">
                    <div>
                      <input
                        ref={this.emailInput}
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        ref={this.passwordInput}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                      <LoginButton
                        onClick={(e) =>
                          logIn(
                            this.emailInput.current.value,
                            this.passwordInput.current.value,
                            e
                          )
                        }
                      >
                        Login
                      </LoginButton>
                    </div>
                  </form>
                </LoginContainer>
              </GivePadding>
            ) : (
              <div>
                <CmsFrontpage />
              </div>
            )}
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

export default Login;
