import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from "../constants/Colors";

export const NightIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M10 2c-1.82 0-3.53.5-5 1.35C8 5.08 10 8.3 10 12s-2 6.92-5 8.65C6.47 21.5 8.18 22 10 22a10 10 0 0 0 10-10A10 10 0 0 0 10 2z" fill={Colors.primary} />
  </Svg>
)