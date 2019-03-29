import React from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native";
import { CloseIcon } from "../icons/close";
import { LeftIcon } from "../icons/left";
import { RightIcon } from "../icons/right";
import { AddIcon } from "../icons/add";
import { PersonIcon } from "../icons/person";
import { MenuIcon } from "../icons/menu";
import { EmailIcon } from "../icons/email";
import { KeyIcon } from "../icons/key";
import { LocationIcon } from "../icons/location";
import { SearchIcon } from "../icons/search";
import Buttons from "../components/Buttons";
import Colors from "../constants/Colors";

class ReusableComponentsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ paddingTop: 21 }}>Color Palette</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}
        >
          <TouchableOpacity>
            <Container style={{ backgroundColor: Colors.primary }}>
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
            <Container style={{ backgroundColor: Colors.white }}>
              <Name>WHITE</Name>
              <Subtitle>#DDDDDD</Subtitle>
            </Container>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container style={{ backgroundColor: Colors.darkGray }}>
              <Name1>DARKGRAY</Name1>
              <Subtitle1>#505050</Subtitle1>
            </Container>
          </TouchableOpacity>
          <TouchableOpacity>
            <Container style={{ backgroundColor: Colors.gray }}>
              <Name>GRAY</Name>
              <Subtitle>#AAAAAA</Subtitle>
            </Container>
          </TouchableOpacity>
        </ScrollView>
        <View2>
          <Text style={{ paddingTop: 21 }}>Buttons</Text>
          <Buttons
            title="primary"
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={() => alert("This is an example of the primary button")}
          />
          <Buttons
            title="secondary"
            backgroundColor={Colors.darkGray}
            textColor={Colors.white}
            onPress={() => alert("This is an example of the secondary button")}
          />
        </View2>
        <Text style={{ paddingTop: 24 }}>Icons</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}
        >
          <Circle>
            <AddIcon />
          </Circle>
          <Circle>
            <LeftIcon />
          </Circle>
          <Circle>
            <RightIcon />
          </Circle>
          <Circle>
            <CloseIcon />
          </Circle>
          <Circle>
            <PersonIcon />
          </Circle>
          <Circle>
            <MenuIcon />
          </Circle>
          <Circle>
            <EmailIcon />
          </Circle>
          <Circle>
            <KeyIcon />
          </Circle>
          <Circle>
            <LocationIcon />
          </Circle>
          <Circle>
            <SearchIcon />
          </Circle>
        </ScrollView>
      </View>
    );
  }
}

export default ReusableComponentsScreen;

const Circle = styled.View`
  width: 35px;
  height: 40px;
  border-radius: 8px;
  background-color: #aaaaaa;
  justify-content: center;
  align-items: center;
  margin: 5px;
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
  font-weight: bold;
  text-align: center;
`;
