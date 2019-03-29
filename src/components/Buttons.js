import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

class Buttons extends React.Component {
  render() {
    const { title, onPress, textColor, backgroundColor } = this.props;
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <Button style={{ backgroundColor: backgroundColor }}>
          <Text style={{ color: textColor }}>{title}</Text>
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
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

export default Buttons;
