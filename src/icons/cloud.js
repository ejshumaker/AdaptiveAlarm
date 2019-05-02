import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from "../constants/Colors";

export const CloudIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M19.35 10.03A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97z" fill={Colors.white} />
  </Svg>
)

