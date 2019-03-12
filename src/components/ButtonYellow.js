import React from "react";
import styled from "styled-components";
import { Alert, TouchableOpacity } from "react-native";

class ButtonYellow extends React.Component {
  onPressButton() {
    Alert.alert("Action made");
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <Button>
          <Action>ACTION</Action>
        </Button>
      </TouchableOpacity>
    );
  }
}

const Button = styled.View`
  width: 186px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  background-color: #e4f96a;
`;

const Action = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #13151a;
`;

export default ButtonYellow;
