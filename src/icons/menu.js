import React from "react";
import Svg, { Path } from "react-native-svg";

export const MenuIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#dddddd" />
  </Svg>
);
