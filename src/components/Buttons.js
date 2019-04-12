import React from "react";
import styled from "styled-components";
import { Font } from "expo";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

class Buttons extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "RNSMiles-Black": require("../assets/fonts/RNSMiles-Black.otf"),
      "RNSMiles-XBold": require("../assets/fonts/RNSMiles-Bold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { title, onPress, textColor, backgroundColor } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <Button style={{ backgroundColor: backgroundColor }}>
          <Text style={{ fontFamily: "RNSMiles-XBold", color: textColor }}>{title}</Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

Buttons.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string
};

const Button = styled.View`
  width: 186px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 21px;
`;

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
`;

export default Buttons;
