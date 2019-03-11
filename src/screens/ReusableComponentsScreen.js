import React from "react";
import styled from "styled-components";
import { ScrollView, Alert, TouchableOpacity } from "react-native";

class ReusableComponentsScreen extends React.Component {
  onPressButton() {
    Alert.alert("Action made");
  }

  render() {
    return (
      <View>
        <Text>Color Palette:</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 30 }}
        >
          <TouchableOpacity>
            <Container style={{ backgroundColor: "#e4f96a" }}>
              <Name>YELLOW</Name>
              <Subtitle>#E4F96A</Subtitle>
            </Container>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container1>
              <Name1>BLACK</Name1>
              <Subtitle1>#13151A</Subtitle1>
            </Container1>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container style={{ backgroundColor: "#dddddd" }}>
              <Name>WHITE</Name>
              <Subtitle>#DDDDDD</Subtitle>
            </Container>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container style={{ backgroundColor: "#505050" }}>
              <Name1>DARKGRAY</Name1>
              <Subtitle1>#505050</Subtitle1>
            </Container>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container style={{ backgroundColor: "#aaaaaa" }}>
              <Name>GRAY</Name>
              <Subtitle>#AAAAAA</Subtitle>
            </Container>
          </TouchableOpacity>
        </ScrollView>
        <View2>
          <Text>Buttons:</Text>
          <TouchableOpacity onPress={this.onPressButton}>
            <Button style={{ backgroundColor: "#e4f96a" }}>
              <Action style={{ color: "#13151a" }}>ACTION1</Action>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressButton}>
            <Button style={{ marginTop: 21, backgroundColor: "#505050" }}>
              <Action style={{ color: "#dddddd" }}>ACTION2</Action>
            </Button>
          </TouchableOpacity>
        </View2>
      </View>
    );
  }
}

export default ReusableComponentsScreen;

const Action = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.View`
  width: 186px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
`;

const Name = styled.Text`
  font-size: 16px;
  color: #13151a;
  font-weight: bold;
  text-align: center;
`;

const Name1 = styled.Text`
  font-size: 16px;
  color: #dddddd;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 12px;
  color: #13151a;
  font-weight: 300;
  text-align: center;
`;

const Subtitle1 = styled.Text`
  font-size: 12px;
  color: #dddddd;
  font-weight: 300;
  text-align: center;
`;

const Container = styled.View`
  width: 130px;
  height: 60px;
  border-radius: 8px;
  margin-right: 21px;
  justify-content: center;
`;

const Container1 = styled.View`
  width: 130px;
  height: 60px;
  border-radius: 8px;
  margin-right: 21px;
  border-radius: 8px;
  border-color: #dddddd;
  border-width: 2px;
  justify-content: center;
`;

const View = styled.View`
  margin-top: 24px;
`;

const View2 = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: 24px;
  margin-bottom: 13px;
  margin-left: 24px;
  font-weight: bold;
  text-align: center;
`;
