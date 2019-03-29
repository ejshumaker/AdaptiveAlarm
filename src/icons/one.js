import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../constants";

export const Number1Icon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"
      fill={Colors.gray}
    />
  </Svg>
);
