import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import PropTypes from 'prop-types';

import { userFetch } from '../store/actions/userActions';
import { GlobalStyles, Colors } from '../constants';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation, fetchUser } = this.props;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        fetchUser(user.uid, navigation.navigate);
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
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchUser: (user, navigate) => { dispatch(userFetch(user, navigate)); },
});

export { AuthLoadingScreen };
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
