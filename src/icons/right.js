import React from "react";
import Svg, { Path } from "react-native-svg";

export const RightIcon = props => (
  <Svg
    width={24}
    height={24}
    {...props}
    style={{ transform: [{ rotateY: "180deg" }] }}
  >
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
      fill="#dddddd"
    />
  </Svg>
);
