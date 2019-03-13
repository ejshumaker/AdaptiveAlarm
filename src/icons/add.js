import React from "react";
import Svg, { Path } from "react-native-svg";
import Colors from "../constants/Colors";

export const AddIcon = props => (
  <Svg width={26} height={26} {...props}>
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={Colors.white} />
    <Path d="M0 0h24v24H0z" fill="none" />
  </Svg>
);
