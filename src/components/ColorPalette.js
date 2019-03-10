import React from "react";
import styled from "styled-components";

const ColorPalette = props => (
  <Container style={{ props }}>
    <Content>
      <Text>{props.text}</Text>
      <Subtitle>{props.subtitle}</Subtitle>
    </Content>
  </Container>
);

export default ColorPalette;

const Container = styled.View`
  border-color: white;
  border-width: 2px;
  width: 120px;
  height: 70px;
  border-radius: 10px;
  margin-right: 10px;
`;

const Content = styled.View`
  padding-top: 15px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

const Subtitle = styled.Text`
  font-size: 12px;
  color: white;
`;
