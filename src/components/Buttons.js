import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const Buttons = (props) => {
  const {
    title, onPress, textColor, backgroundColor,
  } = props;
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Button style={{ backgroundColor }}>
        <Text style={{ fontFamily: 'RNSMiles-XBold', color: textColor }}>{title.toUpperCase()}</Text>
      </Button>
    </TouchableOpacity>
  );
};

Buttons.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Buttons.defaultProps = {
  textColor: 'white',
  backgroundColor: 'black',
};

const Button = styled.View`
  width: 186px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
`;

export default Buttons;
