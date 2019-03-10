import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import {
  Colors,
  // Layout,
  GlobalStyles
} from "../constants";

class StyleDemoScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <View
          style={[
            {
              backgroundColor: Colors.primary,
              width: 48,
              height: 48,
              borderRadius: 8
            },
            GlobalStyles.margin
          ]}
        />
        <Text style={[GlobalStyles.h1, GlobalStyles.margin]}>h1</Text>
        <Text style={[GlobalStyles.list, GlobalStyles.margin]}>list</Text>
        <Text
          style={[
            GlobalStyles.h2,
            GlobalStyles.margin,
            { color: Colors.primary }
          ]}
        >
          h2
        </Text>
        <Text style={[GlobalStyles.h3, GlobalStyles.margin]}>h3</Text>
        <Text style={[GlobalStyles.h4, GlobalStyles.margin]}>h4</Text>
        <Text style={[GlobalStyles.subtitle, GlobalStyles.margin]}>
          subtitle
        </Text>
        <Text style={[GlobalStyles.paragraph, GlobalStyles.margin]}>
          paragraph
        </Text>
      </View>
    );
  }
}

StyleDemoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default StyleDemoScreen;
