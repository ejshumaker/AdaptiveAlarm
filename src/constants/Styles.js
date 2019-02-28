import { StyleSheet } from 'react-native';

/**
 * This is a global style sheet,
 * only heavily reused styles should live in here. Any styles
 * specific to a component should be local to that component
 */
export default StyleSheet.create({
  // Example of a possible global style
  centerChildren: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
