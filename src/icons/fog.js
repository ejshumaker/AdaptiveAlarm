import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Colors from "../constants/Colors";

export const FogIcon = props => (
  <Svg width={24} height={24} {...props}>
    <Path d="M3 15h10a1 1 0 0 1 1 1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 1 1 0 0 1 1-1m13 0h5a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1 1 1 0 0 1 1-1M1 12a5 5 0 0 1 5-5c1-2.35 3.3-4 6-4 3.43 0 6.24 2.66 6.5 6.03L19 9c2.19 0 3.97 1.76 4 4h-2a2 2 0 0 0-2-2h-2v-1a5 5 0 0 0-5-5C9.5 5 7.45 6.82 7.06 9.19 6.73 9.07 6.37 9 6 9a3 3 0 0 0-3 3 3 3 0 0 0 .17 1H1.1L1 12m2 7h2a1 1 0 0 1 1 1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 1 1 0 0 1 1-1m5 0h13a1 1 0 0 1 1 1 1 1 0 0 1-1 1H8a1 1 0 0 1-1-1 1 1 0 0 1 1-1z" fill={Colors.white} />
  </Svg>
)
