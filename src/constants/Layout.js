import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  /* Device & Screen */
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  /* Fonts & Typography */
  fontSize: {
    xs: 12,
    s: 20,
    m: 30,
    lg: 40,
    xl: 50,
  },
  /* Spacing */
  defaultMargin: 4,
};
