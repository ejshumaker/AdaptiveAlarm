import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../constants";

export const Number2Icon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8a2 2 0 0 1-2 2h-2v2h4v2H9v-4a2 2 0 0 1 2-2h2V9H9V7h4a2 2 0 0 1 2 2v2z"
      fill={Colors.gray}
    />
  </Svg>
);
