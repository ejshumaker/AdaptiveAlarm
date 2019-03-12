import React from "react";
import Svg, { Path } from "react-native-svg";

export const EmailIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill="#dddddd"
    />
    <Path d="M0 0h24v24H0z" fill="none" />
  </Svg>
);
