/**
 * This is a template for a 'Smart' component,
 * A.K.A. a 'container', it is connected to the store, and
 * passes values down to it's children (dumb components) via props
 *
 * At the bottom of the document is where most of the Redux integration
 * lives, try to understand how each component is passed/imported
 *
 * @eschirtz 03-03-19
 */
import React, { Component } from "react";
import { View, Text, Button, StatusBar } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userSetName, userSetAge } from "../store/actions/userActions";
import { alarmCalculateTime } from "../store/actions/alarmActions";

import { Colors, GlobalStyles } from "../constants";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: "Home"
    };
  }

  render() {
    const { title } = this.state;
    const {
      navigation, // from react-navigation
      setName, // Redux actions
      calculateTime,
      userName, // Redux store
      alarmTime
    } = this.props;
    const { navigate } = navigation;

    /**
     * There are way more 'magic' numbers in the styling
     * than should be preffered, just tossed them in to make it passable.
     * All our components will be built custom or have a global style applied
     * @eschirtz 03-03-19
     */
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <StatusBar barStyle="light-content" />
        <Text style={[GlobalStyles.h2, GlobalStyles.margin]}>{title}</Text>
        <View
          style={{
            height: 80,
            margin: 8,
            width: "50%"
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-around"
            }}
          >
            <Button
              title="Sync"
              color={Colors.darkGray}
              onPress={() => setName("A New Name")}
            />
            <View style={{ height: 8, width: 8 }} />
            <Button
              title="Async"
              color={Colors.darkGray}
              onPress={() => calculateTime(Date.now())}
            />
          </View>
        </View>
        <View
          style={{
            textAlign: "left",
            width: "50%",
            margin: 16
          }}
        >
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Username</Text>
          <Text
            style={[
              GlobalStyles.paragraph,
              {
                color: Colors.primary,
                marginBottom: 8
              }
            ]}
          >
            {userName}
          </Text>
          <Text style={[GlobalStyles.h4, { marginBottom: 4 }]}>Alarm Time</Text>
          <Text
            style={[
              GlobalStyles.paragraph,
              {
                color: Colors.primary,
                marginBottom: 8
              }
            ]}
          >
            {alarmTime}
          </Text>
        </View>
        <Button
          title="Styles"
          color={Colors.darkGray}
          onPress={() => navigate("StyleDemo")}
        />
        <Button
          title="Components"
          color={Colors.darkGray}
          onPress={() => navigate("ReusableComponents")}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  // Redux state
  userName: PropTypes.string.isRequired,
  alarmTime: PropTypes.number.isRequired,
  // Redux dispatch
  setName: PropTypes.func.isRequired,
  calculateTime: PropTypes.func.isRequired
};

/**
 * Pull in only the fields you need from
 * the store. They are then accesible via 'props'
 * @eschirtz 03-03-19
 */
const mapStateToProps = state => ({
  userName: state.user.name,
  alarmTime: state.alarm.time
});

/**
 * Assign the action creators to props,
 * import actions at the top of the file
 * @eschirtz 03-03-19
 */
const mapDispatchToProps = dispatch => ({
  setName: name => {
    dispatch(userSetName(name));
  },
  setAge: age => {
    dispatch(userSetAge(age));
  },
  calculateTime: time => {
    dispatch(alarmCalculateTime(time));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
