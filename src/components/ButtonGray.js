import React from "react";
import styled from "styled-components";
import { Alert, TouchableOpacity } from "react-native";

class ButtonGray extends React.Component {
  onPressButton() {
    Alert.alert("Action made");
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPressButton}>
        <Button style={{ marginTop: 21 }}>
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
  background-color: #505050;
`;

const Action = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #dddddd;
`;

export default ButtonGray;
