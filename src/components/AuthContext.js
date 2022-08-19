import React from 'react';
import { firebaseAuth } from '../firebase';
import { withRouter } from 'react-router-dom';

const AuthContext = React.createContext();

//ProviderComponent will provide data to other components
class AuthProvider extends React.Component {
  state = {
    user: {},
    authMessage: '',
  };

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: {
            id: user.uid,
            email: user.email,
          },
        });
      } else {
        this.setState({
          user: {},
        });
      }
    });
  }

  // signUp = async (email, password, e) => {
  //     try {
  //         e.preventDefault();
  //         await firebaseAuth.createUserWithEmailAndPassword(email, password);
  //         // Redirect on Login
  //         this.props.history.push(`/${this.state.user.id}/boards`);
  //     } catch (error) {
  //         this.setState({
  //             authMessage: error.message
  //         })
  //     }
  // }

  logIn = async (email, password, e) => {
    try {
      e.preventDefault();
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log('Logged in!');
      // Redirect on Login
      this.props.history.push(`/cms`);
    } catch (error) {
      this.setState({
        authMessage: error.message,
      });
    }
  };

  logOut = () => {
    try {
      firebaseAuth.signOut();
      this.setState({
        user: {},
      });
      this.props.history.push(`/`);
      console.log('Logged out!');
    } catch (error) {
      this.setState({
        authMessage: error.message,
      });
    }
  };

  render() {
    return (
      // AuthContext.Provider will allow other components to subscibe to any data-changes
      <AuthContext.Provider
        value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
          authMessage: this.state.authMessage,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

//ConsumerComponent will get data and be subscribed to any changes
const AuthConsumer = AuthContext.Consumer;

export default withRouter(AuthProvider);
export { AuthConsumer };
