import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from '../constants/Colors';

export const DropdownIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M7 10l5 5 5-5z" fill={Colors.primary} />
    <Path d="M0 0h24v24H0z" fill="none" />
  </Svg>
);
