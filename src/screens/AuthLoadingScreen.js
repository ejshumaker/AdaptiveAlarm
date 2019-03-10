import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import PropTypes from 'prop-types';

import { userSet } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation, setUser } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser({
          firstName: 'Eric',
          lastName: 'Schirtzinger',
          userName: 'eschirtz',
          email: 'eschirtzinger@gmail.com',
        });
        navigation.navigate('App');
      } else {
        // User is signed out.
        navigation.navigate('Auth');
      }
    });
  };

  // Render simple spinner,
  // this is usually so fast you won't see it
  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux dispatch
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => { dispatch(userSet(user)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
