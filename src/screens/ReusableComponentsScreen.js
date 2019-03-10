import React from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity, StatusBar, Button } from "react-native";
import { Colors } from "../constants";
import ColorPalette from "../components/ColorPalette";

class ReusableComponentsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Color Palette:</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 24 }}
        >
          {colors.map((color, index) => (
            <ColorPalette
              key={index}
              text={color.text}
              subtitle={color.subtitle}
            />
          ))}
        </ScrollView>
        <View2>
          <Wrapper>
            <Button title="ACTION1" />
          </Wrapper>
        </View2>
      </View>
    );
  }
}

export default ReusableComponentsScreen;

const Wrapper = styled.View`
  width: 186px;
  height: 40px;
  border-radius: 8px;

  background: #e4f96a;
`;

const View = styled.View`
  margin-top: 24px;
`;

const View2 = styled.View`
  align-items: center;
  margin-top: 100px;
`;

const Text = styled.Text`
  color: white;
  font-size: 30px;
  margin-bottom: 13px;
  margin-left: 24px;
`;

const colors = [
  {
    text: "white",
    subtitle: "#DDDDDD"
  },
  {
    text: "black",
    subtitle: "#13151A"
  },
  {
    text: "primary",
    subtitle: "#E4F96A"
  },
  {
    text: "gray",
    subtitle: "#AAAAAA"
  },
  {
    text: "darkGray",
    subtitle: "#505050"
  }
];
