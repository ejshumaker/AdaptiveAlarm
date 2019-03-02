import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  /* Device & Screen */
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
