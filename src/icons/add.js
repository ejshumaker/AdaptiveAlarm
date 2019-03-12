import React from "react";
import Svg, { Path } from "react-native-svg";

export const AddIcon = props => (
  <Svg width={26} height={26} {...props}>
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#dddddd" />
    <Path d="M0 0h24v24H0z" fill="none" />
  </Svg>
);
